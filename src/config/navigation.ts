/**
 * Navigation Configuration for Many Paths SF
 * This file defines all navigation links used throughout the site
 */

export interface NavLink {
  label: string;
  path: string;
  description: string;
  color?: string;
}

export interface NavigationConfig {
  primary: NavLink[];
  nav: NavLink[];
  documentation: NavLink[];
  actions: NavLink[];
  footer?: NavLink[];
}

export const navigation: NavigationConfig = {
  // Primary navigation links (shown in header)
  primary: [
    {
      label: "All people",
      path: "/people",
      description: "View and manage all people in the system",
    },
    {
      label: "All encampments",
      path: "/encampments",
      description: "View and manage all encampments",
    },
  ],

  // Documentation links
  nav: [
    {
      label: "About",
      path: "/about",
      description: "Building public infrastructure for coordinated homeless services",
    },
    {
      label: "Who We Are",
      path: "/who-we-are",
      description: "Meet the people and organizations behind Many Paths SF",
    },
    {
      label: "Mission",
      path: "/mission",
      description: "Our purpose, values, and commitment to the community",
    },
    {
      label: "Providers",
      path: "/providers",
      description: "The providers in Santa Fe who are part of Many Paths SF",
    },
    {
      label: "Donations",
      path: "/donations",
      description: "See what items our providers urgently need",
    },
  ],

  // Documentation links
  documentation: [
    {
      label: "Who We Are",
      path: "/who-we-are",
      description: "Meet the people and organizations behind Many Paths SF",
    },
    {
      label: "Mission",
      path: "/mission",
      description: "Our purpose, values, and commitment to the community",
    },
    {
      label: "Manual",
      path: "/manual",
      description: "Operations manual for collective care coordination",
    },
  ],

  // Quick action links (used on homepage)
  actions: [
    {
      label: "Add a Person",
      path: "/add/person",
      description: "Add a new person to the system",
      color: "blue",
    },
    {
      label: "Add an Encampment",
      path: "/add/encampment",
      description: "Add a new encampment location",
      color: "green",
    },
  ],

  // Footer links (optional - for future use)
  footer: [
    {
      label: "Privacy Policy",
      path: "/privacy",
      description: "Our data privacy and security practices",
    },
    {
      label: "Contact",
      path: "/contact",
      description: "Get in touch with Many Paths SF",
    },
  ],
};

// Helper function to get all navigation links
export const getAllNavLinks = (): NavLink[] => {
  return [...navigation.nav];
};

// Helper function to get navigation by section
export const getNavSection = (section: keyof NavigationConfig): NavLink[] => {
  return navigation[section] || [];
};
