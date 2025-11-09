import { useState } from 'react';
import { FileCheck, ClipboardCheck, Calculator, Users, ShieldCheck, BadgeCheck, ArrowRight, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface Challenge {
  id: string;
  icon: React.ElementType;
  color: string;
  text: string;
  name: string;
}

const ChallengeCards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const challenges: Challenge[] = [
    {
      id: 'land_legal',
      icon: FileCheck,
      color: '#0074D9',
      text: 'Confused about land verification and legal checks?',
      name: 'Land & Legal'
    },
    {
      id: 'permits_approvals',
      icon: ClipboardCheck,
      color: '#EA580C',
      text: 'Struggling with permits and government approvals?',
      name: 'Permits & Approvals'
    },
    {
      id: 'budget_financing',
      icon: Calculator,
      color: '#16A34A',
      text: 'Worried about budget planning and cost overruns?',
      name: 'Budget & Financing'
    },
    {
      id: 'contractor_selection',
      icon: Users,
      color: '#9333EA',
      text: "Don't know which contractors and professionals to trust?",
      name: 'Contractor Selection'
    },
    {
      id: 'construction_quality',
      icon: ShieldCheck,
      color: '#DC2626',
      text: 'Concerned about construction quality and safety?',
      name: 'Construction Quality'
    },
    {
      id: 'final_approvals',
      icon: BadgeCheck,
      color: '#0891B2',
      text: 'Need help with occupancy certificate and handover?',
      name: 'Final Approvals & Handover'
    }
  ];

  const handleCardClick = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="bg-orange-50">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-wide text-gray-600 mb-4">
              Find What You Need
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold">
              What construction challenge are you facing?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {challenges.map((challenge) => {
              const IconComponent = challenge.icon;
              return (
                <div
                  key={challenge.id}
                  onClick={() => handleCardClick(challenge)}
                  className="bg-white rounded-full shadow-md hover:shadow-lg p-6 md:p-8 flex items-center justify-between gap-4 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${challenge.color}15` }}
                    >
                      <IconComponent
                        size={24}
                        style={{ color: challenge.color }}
                      />
                    </div>
                    <span className="text-base md:text-lg font-semibold text-gray-800">
                      {challenge.text}
                    </span>
                  </div>
                  <ArrowRight className="text-gray-400 flex-shrink-0" size={20} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>

          <div className="py-6">
            <h3 className="text-2xl font-bold mb-4">
              You selected: {selectedChallenge?.name}
            </h3>
            <p className="text-gray-600">
              We're building a detailed questionnaire for this challenge. Coming soon!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChallengeCards;
