import { useState } from 'react';
import { FileCheck, ClipboardCheck, Calculator, Users, ShieldCheck, BadgeCheck, ArrowRight, X, Loader2, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { supabase } from '@/lib/supabase';

interface Challenge {
  id: string;
  icon: React.ElementType;
  color: string;
  text: string;
  name: string;
}

interface FormData {
  email: string;
  sub_problem: string;
  note: string;
  consent_interview: boolean;
}

interface FormErrors {
  email?: string;
  sub_problem?: string;
}

const ChallengeCards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    sub_problem: '',
    note: '',
    consent_interview: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  const subProblemOptions = [
    'Finding reliable information',
    'Understanding the process',
    'Cost and budget concerns',
    'Finding trustworthy professionals',
    'Time management',
    'Legal and compliance issues',
    'Quality and safety concerns',
    'Other'
  ];

  const handleCardClick = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setIsModalOpen(true);
    setShowSuccessMessage(false);
    setFormData({
      email: '',
      sub_problem: '',
      note: '',
      consent_interview: false,
    });
    setErrors({});
    setSubmitError(null);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.sub_problem) {
      newErrors.sub_problem = 'Please select a specific issue';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        email: formData.email.trim(),
        challenge_id: selectedChallenge?.id || '',
        challenge_name: selectedChallenge?.name || '',
        sub_problem: formData.sub_problem,
        note: formData.note.trim() || null,
        consent_interview: formData.consent_interview,
      };

      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([submissionData]);

      if (dbError) {
        console.error('Error saving submission to database:', dbError);
      }

      const web3FormsPayload = {
        access_key: 'bc0256e5-2b39-4ce9-840b-b87eb29a99b5',
        email: formData.email.trim(),
        problem_type: selectedChallenge?.id || '',
        sub_problem: formData.sub_problem,
        note: formData.note.trim(),
        consent_interview: formData.consent_interview,
        redirect: false,
        botcheck: '',
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(web3FormsPayload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Submission failed');
      }

      setShowSuccessMessage(true);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('Failed to submit your request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadClick = () => {
    setTimeout(() => {
      setIsModalOpen(false);
      setTimeout(() => {
        setShowSuccessMessage(false);
        setFormData({
          email: '',
          sub_problem: '',
          note: '',
          consent_interview: false,
        });
      }, 300);
    }, 1800);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setShowSuccessMessage(false);
      setFormData({
        email: '',
        sub_problem: '',
        note: '',
        consent_interview: false,
      });
      setErrors({});
      setSubmitError(null);
    }, 300);
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

      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-md">
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#0074D9] focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>

          {!showSuccessMessage ? (
            <div className="py-6">
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">
                Get Your Free Construction Guideline
              </h3>
              <p className="text-gray-600 text-sm md:text-base mb-6">
                Tell us a bit more so we can improve our resources for you
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="sub_problem" className="block text-sm font-medium text-gray-700 mb-1">
                    What specific issue are you facing?*
                  </label>
                  <select
                    id="sub_problem"
                    value={formData.sub_problem}
                    onChange={(e) => setFormData({ ...formData, sub_problem: e.target.value })}
                    aria-invalid={!!errors.sub_problem}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0074D9] focus:border-[#0074D9] outline-none transition ${
                      errors.sub_problem ? 'border-red-600' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select an issue...</option>
                    {subProblemOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.sub_problem && (
                    <p className="text-red-600 text-sm mt-1">{errors.sub_problem}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email or WhatsApp*
                  </label>
                  <input
                    type="text"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com or WhatsApp number"
                    aria-invalid={!!errors.email}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0074D9] focus:border-[#0074D9] outline-none transition ${
                      errors.email ? 'border-red-600' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional note (optional)
                  </label>
                  <input
                    type="text"
                    id="note"
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    placeholder="Any specific concerns? (one line)"
                    maxLength={200}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0074D9] focus:border-[#0074D9] outline-none transition"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent_interview"
                    checked={formData.consent_interview}
                    onChange={(e) => setFormData({ ...formData, consent_interview: e.target.checked })}
                    className="mt-1 w-4 h-4 text-[#0074D9] border-gray-300 rounded focus:ring-2 focus:ring-[#0074D9] focus:ring-offset-0"
                  />
                  <label htmlFor="consent_interview" className="text-sm text-gray-700 cursor-pointer">
                    I'm open to a quick interview to help VeeduWay understand homeowner challenges better
                  </label>
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0074D9] hover:bg-[#0062b8] text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#0074D9] focus:ring-offset-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Submitting...
                    </>
                  ) : (
                    'Submit & Get Guideline'
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center">
              <div className="mb-4 flex justify-center">
                <CheckCircle2 className="text-green-600" size={64} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Thanks! We've got your details.
              </h3>
              <p className="text-gray-600 mb-6">
                You can download your free guideline now. We'll also use your input to improve our micro-apps.
              </p>

              <a
                href="https://drive.google.com/uc?export=download&id=1rfUZWEGZyFXMgxD74NatntGSQGIZC6UG"
                download
                onClick={handleDownloadClick}
                className="inline-block w-full bg-[#0074D9] hover:bg-[#0062b8] text-white font-semibold py-3 px-6 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-[#0074D9] focus:ring-offset-2"
              >
                Download the PDF
              </a>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChallengeCards;
