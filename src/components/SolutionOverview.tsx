import BlueprintBuddy from "@/components/characters/BlueprintBuddy";
import StampStar from "@/components/characters/StampStar";
import HardhatHero from "@/components/characters/HardhatHero";
import ChecklistChampion from "@/components/characters/ChecklistChampion";
import HouseHappy from "@/components/characters/HouseHappy";

const SolutionOverview = () => {
  const stages = [
    { name: "Planning", Character: BlueprintBuddy },
    { name: "Permits", Character: StampStar },
    { name: "Construction", Character: HardhatHero },
    { name: "Quality Control", Character: ChecklistChampion },
    { name: "Completion", Character: HouseHappy },
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            One guideline for your entire home-building journey.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            From permits and approvals to contractor selection and quality checks—everything you need in one place.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-end gap-8 md:gap-12 lg:gap-16 max-w-6xl mx-auto">
          {stages.map((stage) => (
            <div
              key={stage.name}
              className="flex flex-col items-center gap-4 flex-shrink-0"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 flex items-center justify-center">
                <stage.Character />
              </div>
              <span className="text-sm md:text-base font-medium text-foreground">
                {stage.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionOverview;
