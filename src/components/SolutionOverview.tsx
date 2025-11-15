const SolutionOverview = () => {
  const baseUrl = import.meta.env.BASE_URL;
  
  const stages = [
    {
      name: "Planning",
      image: `${baseUrl}Planning.png`
    },
    {
      name: "Permits",
      image: `${baseUrl}Permits.png`
    },
    {
      name: "Construction",
      image: `${baseUrl}Construction.png`
    },
    {
      name: "Quality Control",
      image: `${baseUrl}quality.png`
    },
    {
      name: "Completion",
      image: `${baseUrl}Completion.png`
    },
  ];

  return (
    <section id="solution" className="py-16 md:py-24 bg-veeduway-alt">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-veeduway-text mb-6">
            One guideline for your entire home-building journey.
          </h2>
          <p className="text-lg md:text-xl text-veeduway-muted max-w-3xl mx-auto">
            From permits and approvals to contractor selection and quality checks—everything you need in one place.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-end gap-8 md:gap-12 lg:gap-16 max-w-6xl mx-auto">
          {stages.map((stage) => (
            <div
              key={stage.name}
              className="flex flex-col items-center flex-shrink-0"
            >
              <div className="w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 flex items-center justify-center">
                <img
                  src={stage.image}
                  alt={stage.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm md:text-base font-medium text-veeduway-text -mt-2">
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
