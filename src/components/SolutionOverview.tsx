const SolutionOverview = () => {
  const stages = [
    {
      name: "Planning",
      image: "/Whisk_2fd49894c56c7878cd34890078db69e6eg.png"
    },
    {
      name: "Permits",
      image: "/Whisk_ea72fefa8a79714a37c49fec6581a45beg.png"
    },
    {
      name: "Construction",
      image: "/Whisk_bafb2f77b308ac692324440ca3f19873eg.png"
    },
    {
      name: "Quality Control",
      image: "/Whisk_8a3b640e05d715ea1b84f70d5fc86e5ceg.png"
    },
    {
      name: "Completion",
      image: "/Whisk_ea72fefa8a79714a37c49fec6581a45beg.png"
    },
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
              className="flex flex-col items-center gap-2 flex-shrink-0"
            >
              <div className="w-44 h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 flex items-center justify-center">
                <img
                  src={stage.image}
                  alt={stage.name}
                  className="w-full h-full object-contain"
                />
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
