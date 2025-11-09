import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SolutionOverview from "@/components/SolutionOverview";
import ChallengeCards from "@/components/ChallengeCards";
import ContentPreview from "@/components/ContentPreview";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <SolutionOverview />
      <ChallengeCards />
      <ContentPreview />
    </div>
  );
};

export default Index;
