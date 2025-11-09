import { ShieldCheck, Calculator, Users } from 'lucide-react';

const ContentPreview = () => {
  const columns = [
    {
      icon: ShieldCheck,
      title: "Legal & Approval Checklists",
      description: "Step-by-step guides for Patta/Chitta verification, CMDA/DTCP approvals, RERA compliance, and obtaining building permits with exact document requirements."
    },
    {
      icon: Calculator,
      title: "Budget & Financing Templates",
      description: "Comprehensive cost breakdowns, home loan requirements, PMAY subsidy eligibility (₹1.5L for EWS), and 10-15% contingency planning strategies."
    },
    {
      icon: Users,
      title: "Professional Selection & Contracts",
      description: "How to choose qualified architects, structural engineers, and contractors—plus written contract templates with payment terms, defect liability, and dispute clauses."
    }
  ];

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-wide text-gray-500 mb-3">
            What You'll Get
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            A complete 7-step roadmap for Tamil Nadu homeowners
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            From land verification to move-in day, get detailed guidance on every stage of your home construction journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {columns.map((column, index) => (
            <div key={index} className="text-center">
              <column.icon
                className="mx-auto text-[#0074D9]"
                size={56}
                strokeWidth={2}
              />
              <h3 className="text-xl md:text-2xl font-bold mt-6 mb-3">
                {column.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {column.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentPreview;
