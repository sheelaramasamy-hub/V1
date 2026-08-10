import { Route, Routes } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { HomePage } from "../pages/HomePage";
import { AllTracksPage } from "../pages/AllTracksPage";
import { TrackDetailPage } from "../pages/TrackDetailPage";
import { ResourcesPage } from "../pages/ResourcesPage";
import { LeaderboardPage } from "../pages/LeaderboardPage";
import { WorkshopsPage } from "../pages/WorkshopsPage";
import { FeedbackPage } from "../pages/FeedbackPage";
import { SupportPage } from "../pages/SupportPage";
import { FaqPage } from "../pages/FaqPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/tracks" element={<AllTracksPage />} />
        <Route path="/tracks/:id" element={<TrackDetailPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/workshop" element={<WorkshopsPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/faq" element={<FaqPage />} />
      </Route>
    </Routes>
  );
}
