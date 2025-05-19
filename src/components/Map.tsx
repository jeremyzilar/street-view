"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { getEncampmentsRecords, getPeopleRecords } from "@/lib/airtable";
import { EncampmentsRecord, PeopleRecord } from "@/types/airtable";

interface MapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialCenter?: { lat: number; lng: number };
  initialCoordinates?: string;
  address?: string;
  geocodeCache?: string;
  readOnly?: boolean;
}

export function Map({
  onLocationSelect,
  initialCenter,
  initialCoordinates,
  address,
  geocodeCache,
  readOnly = false,
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );
  const encampmentMarkersRef = useRef<
    google.maps.marker.AdvancedMarkerElement[]
  >([]);
  const isInitializedRef = useRef(false);

  // Function to create a marker for an encampment
  const createEncampmentMarker = (
    map: google.maps.Map,
    encampment: EncampmentsRecord,
    peopleCount: number
  ) => {
    if (!encampment.fields.coordinates) return null;

    const [lat, lng] = encampment.fields.coordinates.split(",").map(Number);
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: { lat, lng },
      map,
      title: encampment.fields.name,
    });

    // Add click listener to show encampment name
    marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: `<div class="p-2">
          <h3 class="font-bold">${encampment.fields.name}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">People: ${peopleCount}</p>
          ${
            encampment.fields.notes
              ? `<p class="text-sm mt-1">${encampment.fields.notes}</p>`
              : ""
          }
        </div>`,
      });
      infoWindow.open(map, marker);
    });

    return marker;
  };

  // Function to fetch and display encampments
  const fetchAndDisplayEncampments = async (map: google.maps.Map) => {
    try {
      const [encampments, people] = await Promise.all([
        getEncampmentsRecords(),
        getPeopleRecords(),
      ]);

      // Count people per encampment
      const peopleCountByEncampment = people.reduce((acc, person) => {
        const encampmentId = person.fields.encampment;
        if (encampmentId) {
          acc[encampmentId] = (acc[encampmentId] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      const activeEncampments = encampments.filter(
        (encampment) =>
          encampment.fields.active && encampment.fields.coordinates
      );

      // Clear existing encampment markers
      encampmentMarkersRef.current.forEach((marker) => {
        marker.map = null;
      });
      encampmentMarkersRef.current = [];

      // Create new markers for active encampments
      activeEncampments.forEach((encampment) => {
        const peopleCount = peopleCountByEncampment[encampment.id] || 0;
        const marker = createEncampmentMarker(map, encampment, peopleCount);
        if (marker) {
          encampmentMarkersRef.current.push(marker);
        }
      });
    } catch (error) {
      console.error("Failed to fetch encampments or people:", error);
    }
  };

  useEffect(() => {
    const initMap = async () => {
      if (isInitializedRef.current) return;

      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: "weekly",
        libraries: ["maps", "marker", "geocoding"],
      });

      const { Map } = await loader.importLibrary("maps");
      const { AdvancedMarkerElement } = await loader.importLibrary("marker");
      const { Geocoder } = await loader.importLibrary("geocoding");

      // Get user's current location or use initial coordinates
      let center = initialCenter;
      if (!center && initialCoordinates) {
        const [lat, lng] = initialCoordinates.split(",").map(Number);
        center = { lat, lng };
      }
      if (!center && address) {
        // Check if we have a valid cached geocode
        if (geocodeCache) {
          try {
            const match = geocodeCache.match(/eyJpIjoi([\d.-]+),\s*([\d.-]+)/);
            if (match) {
              const [_, lat, lng] = match;
              center = {
                lat: parseFloat(lat),
                lng: parseFloat(lng),
              };
            }
          } catch (error) {
            console.error("Failed to parse geocode cache:", error);
          }
        }
        if (!center) {
          const geocoder = new Geocoder();
          try {
            const result = await geocoder.geocode({ address });
            if (result.results[0]) {
              const location = result.results[0].geometry.location;
              center = {
                lat: location.lat(),
                lng: location.lng(),
              };
              onLocationSelect(location.lat(), location.lng());
            }
          } catch (error) {
            console.error("Geocoding failed:", error);
          }
        }
      }
      if (!center) {
        try {
          const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            }
          );
          center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        } catch (error) {
          center = { lat: 35.6869, lng: -105.9378 }; // Default to Santa Fe
        }
      }

      // Initialize the map
      const mapInstance = new Map(mapRef.current!, {
        center,
        zoom: 14,
        mapId: "street_view_map",
        mapTypeControl: false,
        streetViewControl: false,
      });

      mapInstanceRef.current = mapInstance;

      // Fetch and display encampments
      await fetchAndDisplayEncampments(mapInstance);

      // If we have initial coordinates, create a marker
      if (initialCoordinates) {
        const [lat, lng] = initialCoordinates.split(",").map(Number);
        const newMarker = new AdvancedMarkerElement({
          position: { lat, lng },
          map: mapInstance,
          gmpDraggable: true,
        });

        newMarker.addListener("dragend", () => {
          const position = newMarker.position;
          if (position) {
            const lat =
              typeof position.lat === "function"
                ? position.lat()
                : position.lat;
            const lng =
              typeof position.lng === "function"
                ? position.lng()
                : position.lng;
            onLocationSelect(lat, lng);
          }
        });

        markerRef.current = newMarker;
      }

      // Add click listener to drop pin
      if (!readOnly) {
        mapInstance.addListener("click", (e: google.maps.MapMouseEvent) => {
          if (!e.latLng) return;

          // Remove existing marker if any
          if (markerRef.current) {
            markerRef.current.map = null;
          }

          // Create new marker
          const newMarker = new AdvancedMarkerElement({
            position: e.latLng,
            map: mapInstance,
            gmpDraggable: true,
          });

          // Update coordinates when marker is dragged
          newMarker.addListener("dragend", () => {
            const position = newMarker.position;
            if (position) {
              const lat =
                typeof position.lat === "function"
                  ? position.lat()
                  : position.lat;
              const lng =
                typeof position.lng === "function"
                  ? position.lng()
                  : position.lng;
              onLocationSelect(lat, lng);
            }
          });

          // Update coordinates on initial placement
          onLocationSelect(e.latLng.lat(), e.latLng.lng());

          // Store the marker reference
          markerRef.current = newMarker;
        });
      }

      isInitializedRef.current = true;

      // Cleanup function
      return () => {
        if (markerRef.current) {
          markerRef.current.map = null;
        }
        encampmentMarkersRef.current.forEach((marker) => {
          marker.map = null;
        });
        if (mapInstanceRef.current) {
          google.maps.event.clearInstanceListeners(mapInstanceRef.current);
        }
        isInitializedRef.current = false;
      };
    };

    initMap();
  }, [address, geocodeCache, initialCenter, onLocationSelect, readOnly]);

  // Update marker position when initialCoordinates changes
  useEffect(() => {
    if (!mapInstanceRef.current || !initialCoordinates) return;

    const [lat, lng] = initialCoordinates.split(",").map(Number);

    if (markerRef.current) {
      markerRef.current.position = { lat, lng };
    } else {
      const { AdvancedMarkerElement } = google.maps.marker;
      const newMarker = new AdvancedMarkerElement({
        position: { lat, lng },
        map: mapInstanceRef.current,
        gmpDraggable: true,
      });

      newMarker.addListener("dragend", () => {
        const position = newMarker.position;
        if (position) {
          const lat =
            typeof position.lat === "function" ? position.lat() : position.lat;
          const lng =
            typeof position.lng === "function" ? position.lng() : position.lng;
          onLocationSelect(lat, lng);
        }
      });

      markerRef.current = newMarker;
    }
  }, [initialCoordinates, onLocationSelect]);

  return (
    <div
      ref={mapRef}
      className="w-full h-[400px] rounded-lg border border-gray-300 dark:border-gray-600"
    />
  );
}
