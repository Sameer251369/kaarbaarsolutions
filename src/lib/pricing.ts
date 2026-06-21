export type ServicePackage = {
  id: string;
  title: string;
  priceInr: number;
  shortCode: string;
  description: string;
  features: string[];
  deliveryTime: string;
  category: string;
  color: string;
};

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'growth-strategy',
    title: 'Growth Strategy',
    priceInr: 14999,
    shortCode: 'GS',
    description: 'Social growth plan, content direction, and weekly execution rhythm for local brands.',
    deliveryTime: '5-7 days',
    category: 'Marketing',
    color: 'from-orange-400 to-red-500',
    features: ['12 content ideas', 'Reels strategy', 'Engagement plan'],
  },
  {
    id: 'ad-campaigns',
    title: 'Ad Campaigns',
    priceInr: 24999,
    shortCode: 'AD',
    description: 'Meta or Google ad setup with conversion tracking and campaign reporting.',
    deliveryTime: '3 days setup',
    category: 'Performance',
    color: 'from-indigo-500 to-purple-500',
    features: ['Campaign setup', 'Pixel guidance', 'Weekly reporting'],
  },
  {
    id: 'search-authority',
    title: 'Search Authority',
    priceInr: 19999,
    shortCode: 'SEO',
    description: 'Technical SEO, keyword map, and content structure for stronger search visibility.',
    deliveryTime: '10 days',
    category: 'SEO',
    color: 'from-cyan-400 to-blue-500',
    features: ['Keyword research', 'Technical audit', 'Content plan'],
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    priceInr: 39999,
    shortCode: 'BR',
    description: 'Logo direction, visual system, and essential brand assets for a polished launch.',
    deliveryTime: '14 days',
    category: 'Design',
    color: 'from-green-400 to-emerald-500',
    features: ['Logo suite', 'Style guide', 'Launch assets'],
  },
  {
    id: 'website-build',
    title: 'Website Build',
    priceInr: 59999,
    shortCode: 'WEB',
    description: 'Conversion-focused website build with responsive UI and deployment support.',
    deliveryTime: '21 days',
    category: 'Development',
    color: 'from-purple-400 to-indigo-500',
    features: ['Responsive pages', 'Lead forms', 'Deployment support'],
  },
  {
    id: 'commerce-setup',
    title: 'Commerce Setup',
    priceInr: 74999,
    shortCode: 'EC',
    description: 'Store setup, product structure, payment readiness, and launch checklist.',
    deliveryTime: '24 days',
    category: 'E-Commerce',
    color: 'from-pink-400 to-rose-500',
    features: ['Store setup', 'Product catalog', 'Payment readiness'],
  },
];

export const PACKAGES = [
  {
    name: 'Starter Pack',
    priceInr: 14999,
    period: '/mo',
    features: ['Social media management', 'Basic web presence', 'Monthly analytics'],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Business Pack',
    priceInr: 29999,
    period: '/mo',
    features: ['Full digital marketing', 'Landing page support', 'Video direction', 'Priority support'],
    cta: 'Most Popular',
    highlight: true,
  },
  {
    name: 'Enterprise Pack',
    priceInr: 0,
    period: '',
    features: ['Custom development', 'E-commerce suite', 'Dedicated manager', 'Premium support'],
    cta: 'Contact Sales',
    highlight: false,
  },
];

export function formatInr(amount: number) {
  if (!amount) return 'Custom';
  return `Rs. ${new Intl.NumberFormat('en-IN').format(amount)}`;
}
