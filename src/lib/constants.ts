import {
  AwardIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  CpuIcon,
  DollarSignIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ShipIcon,
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
  { name: "About Us", link: "#about" },
  { name: "Team", link: "#team" },
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
    { label: "Outsourcing", href: "#" },
    { label: "Logistics Consulting", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Our Clients", href: "#clients" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#footer" },
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
    // img: ceoImg,
    bio: "Ex-Lazada, Maersk, Zalora. Expert in supply chain management and business scalability.",
  },
  {
    name: "Rendi Joseph",
    role: "CCO of Gercep",
    email: "rendidewantoro@gci-express.com",
    phone: "+62 822 9705 0321",
    // img: ccoImg,
    bio: "Seasoned logistics leader (Lion Parcel, PCP Express). Focus on operational excellence.",
  },
  {
    name: "Dandi Napitupulu",
    role: "CFO of Gercep",
    email: "dandi@gci-express.com",
    phone: "+62 888 888 888",
    // img: cfoImg,
    bio: "Financial strategist with extensive risk management expertise across multiple industries.",
  },
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
    desc: "Third-party storage and handling solutions with advanced inventory tracking.",
    image: "/business-warehouse.webp",
    icon: WarehouseIcon,
    colSpan: "md:col-span-2",
  },
  {
    title: "Expedition",
    desc: "Comprehensive road, rail, sea, and air transport for flexible distribution networks.",
    image: "/business-expedition.webp",
    icon: TruckIcon,
    colSpan: "md:col-span-1",
  },
  {
    title: "Freight Forwarding",
    desc: "Global shipping solutions including FTL, LTL, FCL, and LCL services.",
    image: "/business-freight.webp",
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
