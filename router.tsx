import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

import LandingPage from "./components/LandingPage";
import Listings from "./pages/Listings";
import RoomDetails from "./components/RoomDetails";
import HelpCentre from "./components/HelpCentre";
import ContactUs from "./components/ContactUs";
import TermsOfService from "./components/TermsOfService";
import Saved from "./pages/Saved";

/**
 * Advanced Basename Detection
 * Specifically handles cases where environments like cloud previews or sandboxes
 * might include the full URL or protocol in the window.location.pathname.
 */
const getBasename = () => {
  try {
    let path = window.location.pathname;

    // Fix for environments that mistakenly put the full URL in the pathname
    if (path.includes('://')) {
      const parts = path.split('://');
      const afterProtocol = parts[1];
      const firstSlashIndex = afterProtocol.indexOf('/');
      path = firstSlashIndex !== -1 ? afterProtocol.substring(firstSlashIndex) : '/';
    }

    // Clean any double slashes and trailing slashes
    path = path.replace(/\/+/g, '/');

    const knownRoutes = ['/listings', '/details', '/saved', '/contact', '/help', '/terms', '/about'];
    
    let base = path;
    for (const route of knownRoutes) {
      const index = path.indexOf(route);
      if (index !== -1) {
        base = path.substring(0, index);
        break;
      }
    }
    
    // Ensure it starts with / and ends without it
    const cleanedBase = base.replace(/\/+$/, '');
    return cleanedBase || "/";
  } catch (e) {
    console.error("Basename detection failed, falling back to /", e);
    return "/";
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "listings",
        element: <Listings />,
      },
      {
        path: "details/:id",
        element: <RoomDetails />,
      },
      {
        path: "saved",
        element: <Saved />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "help",
        element: <HelpCentre />,
      },
      {
        path: "terms",
        element: <TermsOfService />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: getBasename(),
});

export default function Router() {
  return <RouterProvider router={router} />;
}