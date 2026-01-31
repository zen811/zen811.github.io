import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

import LandingPage from "./components/LandingPage";
import Listings from "./pages/Listings";
import RoomDetails from "./components/RoomDetails";
import HelpCentre from "./components/HelpCentre";
import ContactUs from "./components/ContactUs";
import TermsOfService from "./components/TermsOfService";
import Saved from "./pages/Saved";

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/details/:id" element={<RoomDetails />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/help" element={<HelpCentre />} />
          <Route path="/terms" element={<TermsOfService />} />
          {/* Catch-all route to redirect back home if path is invalid */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}