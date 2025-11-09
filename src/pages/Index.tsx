import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SolutionOverview from "@/components/SolutionOverview";
import ContentPreview from "@/components/ContentPreview";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <SolutionOverview />
      <ContentPreview />
    </div>
  );
};

export default Index;
