import { Button } from "@/components/ui/button";
import { useProblemModal } from "@/contexts/ProblemModalProvider";

const Hero = () => {
  const { open } = useProblemModal();
  return (
    <section id="top" className="pt-24 md:pt-32 pb-8 md:pb-8 bg-veeduway-base">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-[60%_40%] gap-8 md:gap-12 items-center animate-fade-in">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-veeduway-text leading-tight">
              Build your home without the stress, scams, or confusion.
            </h1>

            <p className="text-lg md:text-xl text-veeduway-muted leading-relaxed">
              Get a clear, step-by-step guide to navigate Tamil Nadu's home construction process — from permits to move-in, stress-free.
            </p>

            <div className="space-y-4">
              <Button
                size="lg"
                onClick={() => open()}
                className="text-lg px-8 py-6 font-semibold w-full md:w-auto min-h-[48px] bg-[#0074D9] hover:bg-[#005BB5] text-white"
              >
                Get Your Free Guideline
              </Button>
              <p className="text-sm text-veeduway-muted">
                No spam. Curated by experts.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center mt-8 md:mt-0 relative">
            <div className="relative w-full max-w-md md:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 via-amber-100/10 to-transparent rounded-2xl blur-3xl -z-10"></div>
              <img
                src="/Whisk_d6488dffa60ed5999b04cfed59946fd1dr.jpeg"
                alt="Happy Tamil Nadu family celebrating in front of their new home"
                className="w-full h-auto object-cover rounded-lg shadow-xl"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
