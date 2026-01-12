import {
  AwardIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  CpuIcon,
  DollarSignIcon,
  FacebookIcon,
  HandshakeIcon,
  InstagramIcon,
  LightbulbIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  RocketIcon,
  ShieldIcon,
  ShipIcon,
  SparklesIcon,
  TargetIcon,
  TrendingUpIcon,
  TruckIcon,
  TwitterIcon,
  UsersIcon,
  WarehouseIcon,
} from "lucide-react";

export const WHATSAPP_URL = "https://wa.me/628119898922";
export const WHATSAPP_TEXT =
  "Hi GERCEP, I'm interested in your logistics services and would appreciate a quote for my needs.";
export const MAILTO_URL = "mailto:kevin@gci-express.com";

export const NAVIGATION_ITEMS = [
  { name: "Our Clients", link: "#clients" },
  { name: "Services", link: "#services" },
  { name: "Team", link: "#team" },
  {
    name: "Company",
    link: "#",
    subItems: [
      { name: "Why Choose Us", link: "#our-values" },
      { name: "About Us", link: "/about" },
      { name: "Contact", link: "/contact" },
    ],
  },
];

export const OUR_CLIENTS = [
  {
    name: "SAP Express" as const,
    logo: "/sap-icon.webp" as string,
  },
  {
    name: "Morrison Express" as const,
    logo: "/morrison-icon.webp" as string,
  },
  {
    name: "Hyundai Elevator" as const,
    logo: "/hyundai-icon.webp" as string,
  },
  {
    name: "Watson" as const,
    logo: "/watsons-icon.webp" as string,
  },
  {
    name: "Agriku" as const,
    logo: "/agriku-icon.webp" as string,
  },
  {
    name: "Power Commerce Asia" as const,
    logo: "/pca-icon.webp" as string,
  },
  {
    name: "Jasa Marga" as const,
    logo: "/jasa-marga-icon.webp" as string,
  },
  {
    name: "Goday" as const,
    logo: "/goday-icon.webp" as string,
  },
] as const;

export const FOOTER_LINKS = {
  services: [
    { label: "Warehouse Management", href: "#" },
    { label: "Expedition", href: "#" },
    { label: "Freight Forwarding", href: "#" },
    { label: "Outsourcing", href: "#" },
    { label: "Logistics Consulting", href: "#" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "#services" },
    { label: "Our Clients", href: "#clients" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
  ],
  contacts: [
    { label: "Jakarta, Indonesia", href: "#", icon: MapPinIcon },
    { label: "+62 811 9898 922", href: WHATSAPP_URL, icon: PhoneIcon },
    { label: "kevin@gci-express.com", href: MAILTO_URL, icon: MailIcon },
  ],
  socials: [
    { icon: FacebookIcon, href: "#", label: "Facebook" },
    { icon: InstagramIcon, href: "#", label: "Instagram" },
    { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
    { icon: TwitterIcon, href: "#", label: "Twitter" },
  ],
};

export const TEAMS = [
  {
    name: "Kevin Lieanor",
    role: "CEO of Gercep",
    email: "kevin@gci-express.com",
    phone: "+62 811 9898 922",
    img: "/gercep-kevin.webp",
    bio: "Ex-Havi Logistics, Zalora, aCommerce, Lazada, Janio, Luwjistik and Ethix. Expert in supply chain management and business scalability.",
  },
  {
    name: "Rendi Joseph",
    role: "CCO of Gercep",
    email: "rendidewantoro@gci-express.com",
    phone: "+62 822 9705 0321",
    img: "/gercep-rendi.webp",
    bio: "Seasoned logistics leader (Lion Parcel, Paketku, Luwjistik and Ethix). Focus on operational excellence.",
  },
  // {
  //   name: "Dandi Napitupulu",
  //   role: "CFO of Gercep",
  //   email: "dandi@gci-express.com",
  //   phone: "+62 888 888 888",
  //   img: "/gercep-dandi.webp",
  //   bio: "Financial strategist with extensive risk management expertise across multiple industries.",
  // },
];

export const OUR_VALUES = [
  {
    title: "Proven Track Record",
    description:
      "Trusted by national and global clients with consistent delivery excellence.",
    icon: AwardIcon,
  },
  {
    title: "End-to-End Solutions",
    description:
      "Complete logistics solutions under one roof, from warehousing to last-mile.",
    icon: CheckCircleIcon,
  },
  {
    title: "Competitive Pricing",
    description:
      "Premium service quality at competitive rates that maximize your ROI.",
    icon: DollarSignIcon,
  },
  {
    title: "Skilled Workforce",
    description:
      "Trained professionals and strong fleet management for reliable operations.",
    icon: UsersIcon,
  },
  {
    title: "Technology Integration",
    description:
      "Real-time visibility and tracking powered by modern logistics technology.",
    icon: CpuIcon,
  },
  {
    title: "Business Growth",
    description:
      "We empower clients to grow by delivering value beyond cost savings.",
    icon: TrendingUpIcon,
  },
];

export const OUR_SERVICES = [
  {
    title: "Warehouse Management",
    desc: "Third-party storage and handling to keep inventory ready-to-ship.",
    image: "/business-warehouse-2.webp",
    icon: WarehouseIcon,
    colSpan: "md:col-span-2",
  },
  {
    title: "Expedition",
    desc: "Comprehensive road, rail, sea, and air transport for flexible distribution networks.",
    image: "/business-expedition-3.webp",
    icon: TruckIcon,
    colSpan: "md:col-span-1",
  },
  {
    title: "Freight Forwarding",
    desc: "Global shipping solutions including FTL, LTL, FCL, and LCL services.",
    image: "/business-freight-2.webp",
    icon: ShipIcon,
    colSpan: "md:col-span-1",
  },
  {
    title: "Outsourcing",
    desc: "Reliable workforce solutions for logistics and operational excellence.",
    image: null,
    icon: UsersIcon,
    colSpan: "md:col-span-1",
    bgClass: "bg-primary text-primary-foreground",
  },
  {
    title: "Logistics Consulting",
    desc: "Customized strategies to boost productivity and optimize your supply chain operations.",
    image: null,
    icon: BriefcaseIcon,
    colSpan: "md:col-span-1",
    bgClass: "bg-primary text-primary-foreground",
  },
];

export const VISION_MISSION = [
  {
    title: "Our Vision",
    description:
      "To become the most trusted logistics partner, delivering high productivity and innovative solutions that increase customer profitability.",
    icon: SparklesIcon,
  },
  {
    title: "Our Mission",
    description:
      "Provide integrated logistics solutions tailored to customer needs—ensuring timely, secure, and accurate deliveries that create smiles at every stage.",
    icon: TargetIcon,
  },
];

export const OUR_PILLARS = [
  {
    title: "Reliability",
    description:
      "Consistency in quality and performance—so you can plan every shipment with confidence.",
    icon: ShieldIcon,
  },
  {
    title: "Speed",
    description:
      "Quick response and on-time deliveries that keep your business moving.",
    icon: RocketIcon,
  },
  {
    title: "Innovation",
    description:
      "Technology-driven logistics for better visibility, control, and efficiency.",
    icon: LightbulbIcon,
  },
  {
    title: "Partnership",
    description:
      "Customer-first collaboration—we work as an extension of your team.",
    icon: HandshakeIcon,
  },
  {
    title: "Integrity",
    description:
      "Honest, transparent, and ethical service in everything we do.",
    icon: TargetIcon,
  },
] as const;
