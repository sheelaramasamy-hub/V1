import { WelcomeBanner } from "../components/banner/WelcomeBanner";
import { StatsRow } from "../components/stats/StatsRow";
import { AboutHackathonSection } from "../components/about/AboutHackathonSection";
import { WorkshopsSection } from "../components/workshops/WorkshopsSection";
import { RecommendedForYouSection } from "../components/recommendations/RecommendedForYouSection";
import { contentService } from "../services/contentService";

export function HomePage() {
  const workshops = contentService.getWorkshops();

  return (
    <>
      <WelcomeBanner />
      <StatsRow />
      <AboutHackathonSection />
      <WorkshopsSection workshops={workshops} />
      <RecommendedForYouSection />
    </>
  );
}
