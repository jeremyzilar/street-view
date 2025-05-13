"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface MapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialCenter?: { lat: number; lng: number };
  initialCoordinates?: string;
  address?: string;
  geocodeCache?: string;
}

export function Map({
  onLocationSelect,
  initialCenter,
  initialCoordinates,
  address,
  geocodeCache,
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );
  const isInitializedRef = useRef(false);

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
            // Extract coordinates from Airtable's geocoding format
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
          // If not in cache or cache is expired, geocode the address
          const geocoder = new Geocoder();
          try {
            const result = await geocoder.geocode({ address });
            if (result.results[0]) {
              const location = result.results[0].geometry.location;
              center = {
                lat: location.lat(),
                lng: location.lng(),
              };
              // Notify parent to update the cache
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
          // Default to Santa Fe if geolocation fails
          center = { lat: 35.6869, lng: -105.9378 };
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

      isInitializedRef.current = true;

      // Cleanup function
      return () => {
        if (markerRef.current) {
          markerRef.current.map = null;
        }
        if (mapInstanceRef.current) {
          google.maps.event.clearInstanceListeners(mapInstanceRef.current);
        }
        isInitializedRef.current = false;
      };
    };

    initMap();
  }, [address, geocodeCache, initialCenter, onLocationSelect]);

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
