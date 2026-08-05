import { Route, Routes } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { HomePage } from "../pages/HomePage";
import { AllTracksPage } from "../pages/AllTracksPage";
import { TrackDetailPage } from "../pages/TrackDetailPage";
import { PlaceholderPage } from "../pages/PlaceholderPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/tracks" element={<AllTracksPage />} />
        <Route path="/tracks/:id" element={<TrackDetailPage />} />
        <Route path="/resources" element={<PlaceholderPage title="Resources" />} />
        <Route path="/leaderboard" element={<PlaceholderPage title="Leaderboard" />} />
        <Route path="/workshop" element={<PlaceholderPage title="Workshop" />} />
        <Route path="/feedback" element={<PlaceholderPage title="Feedback" />} />
        <Route path="/support" element={<PlaceholderPage title="Support" />} />
        <Route path="/faq" element={<PlaceholderPage title="FAQ" />} />
      </Route>
    </Routes>
  );
}
