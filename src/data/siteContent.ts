export interface NavLink {
  id: string;
  label: string;
}

export interface Mentor {
  rank: string;
  name: string;
  state: string;
  speciality: string;
}

export interface StatHighlight {
  value: string;
  label: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  duration: string;
  features: string[];
  badge?: string;
  featured?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactDetail {
  icon: string;
  label: string;
  value: string;
}

export const navLinks: NavLink[] = [
  { id: 'home', label: 'Home' },
  { id: 'problems', label: 'The Problem' },
  { id: 'mentor-panel', label: 'Mentors' },
  { id: 'about', label: 'About' },
  { id: 'enroll', label: 'Enroll' },
];

export const mentors: Mentor[] = [
  { rank: 'AIR 17', name: 'Dr. Priya Sharma', state: 'Karnataka', speciality: 'Physics & Strategy' },
  { rank: 'AIR 80', name: 'Dr. Arjun Reddy', state: 'Andhra Pradesh', speciality: 'Chemistry Expert' },
  { rank: 'AIR 159', name: 'Dr. Meera Krishnan', state: 'Tamil Nadu', speciality: 'Biology Master' },
  { rank: 'AIR 214', name: 'Dr. Rohit Kumar', state: 'Karnataka', speciality: 'Problem Solving' },
  { rank: 'AIR 256', name: 'Dr. Ananya Iyer', state: 'Tamil Nadu', speciality: 'Time Management' },
  { rank: 'AIR 342', name: 'Dr. Vikram Singh', state: 'Andhra Pradesh', speciality: 'Mock Test Expert' },
];

export const stats: StatHighlight[] = [
  { value: '92%', label: 'Success Rate' },
  { value: '50+', label: 'Expert Mentors' },
  { value: '1.5hr', label: 'Daily Classes' },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: '1 Month Intensive',
    price: '₹2,599',
    duration: 'Perfect for quick revision',
    features: [
      'Daily 1.5-hour live classes',
      'Access to recorded sessions',
      'Weekly doubt clearing sessions',
      'Study materials & notes',
      'Basic mentor support',
    ],
  },
  {
    name: '6 Month Complete',
    price: '₹13,999',
    duration: 'Comprehensive preparation',
    badge: 'Most Popular',
    featured: true,
    features: [
      'Everything in 1 Month plan',
      'Personal mentor assignment',
      'Weekly mock tests',
      'Performance analytics',
      '1-on-1 strategy sessions',
      'Priority doubt resolution',
    ],
  },
  {
    name: '16 Month Elite',
    price: '₹34,999',
    duration: 'Complete NEET journey',
    features: [
      'Everything in 6 Month plan',
      'Full syllabus coverage',
      'Daily mock tests & analysis',
      'Personalized study plan',
      'Monthly progress reviews',
      'Exam day strategy coaching',
      'Lifetime mentor support',
    ],
  },
];

export const faqs: FAQItem[] = [
  {
    question: 'What makes Shreyas Academy different from other coaching institutes?',
    answer:
      "Shreyas Academy is mentored by current MBBS students who are NEET toppers with exceptional AIRs. Unlike traditional coaching, you learn directly from those who've recently cracked the exam, ensuring up-to-date strategies, relatable guidance, and proven success methods.",
  },
  {
    question: 'Are the classes live or recorded?',
    answer:
      "We conduct daily 1.5-hour live interactive classes where you can ask questions in real-time. All sessions are recorded and available for review, ensuring you never miss important content even if you can't attend live.",
  },
  {
    question: 'How does personal mentorship work?',
    answer:
      'In our 6-month and 16-month plans, each student is assigned a dedicated mentor based on their learning style and needs. You will have regular 1-on-1 sessions for strategy planning, performance review, and personalized guidance throughout your NEET journey.',
  },
  {
    question: 'What study materials are provided?',
    answer:
      'All students receive comprehensive digital study materials including topic-wise notes, practice questions, previous year papers, and exclusive topper strategies. Premium plan students also receive printed materials and additional reference books.',
  },
  {
    question: 'Can I switch plans or upgrade later?',
    answer:
      "Yes! You can upgrade your plan at any time. The difference in fees will be adjusted, and you'll immediately get access to all features of your new plan. Contact our support team for seamless plan transitions.",
  },
  {
    question: 'What is your refund policy?',
    answer:
      "We offer a 7-day money-back guarantee. If you're not satisfied within the first week, we'll provide a full refund, no questions asked. After 7 days, refunds are processed on a case-by-case basis.",
  },
];

export const contactDetails: ContactDetail[] = [
  { icon: '📧', label: 'Email', value: 'support@shreyasacademy.com' },
  { icon: '📞', label: 'Phone', value: '+91 98765 43210' },
];

export const supportHours = 'Mon-Sat: 9AM - 8PM IST';

