/**
 * from component Features Section Demo 2
 * base on: https://ui.aceternity.com/components/feature-sections
 *
 */
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/index-pages/section-heading";
import { OUR_VALUES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const GRID_COUNT_MOBILE = 1;
const GRID_COUNT_TABLET = 2;
const GRID_COUNT_DESKTOP = 3;
const GRID_CLASS_MAP = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
} as const;

type GridClassKey = keyof typeof GRID_CLASS_MAP;

const getGridTemplateClass = (
  count: number,
  breakpoint?: "md" | "lg"
): string => {
  const safeKey = Math.min(Math.max(count, 1), 4) as GridClassKey;
  const baseClass = GRID_CLASS_MAP[safeKey];
  return breakpoint ? `${breakpoint}:${baseClass}` : baseClass;
};

const isDesktopFirstColumn = (index: number) =>
  index % GRID_COUNT_DESKTOP === 0;

const isDesktopFirstRow = (index: number) => index < GRID_COUNT_DESKTOP;

export default function OurValuesSection() {
  return (
    <section className="relative overflow-hidden py-24" id="our-values">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-background">
        <div
          aria-hidden
          className="absolute inset-0 bg-[url('/bg-image-geometric.svg')] bg-size-[800px] bg-top-left bg-no-repeat opacity-25"
        />
        <div
          aria-hidden
          className="-bottom-80 absolute right-0 h-[800px] w-[800px] rotate-150 bg-[url('/bg-image-geometric.svg')] bg-center bg-size-[800px] bg-no-repeat opacity-25"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-[1000px] w-[1000px] rounded-full bg-linear-to-t from-secondary/80 via-transparent to-transparent"
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Why Choose Us"
          className="max-w-xl"
          description="We are built on a foundation of trust and efficiency. These core values drive every delivery we make."
          title={
            <>
              Delivering <span className="text-primary">Value Beyond</span> Cost
              Savings
            </>
          }
        />

        <FeaturesGrid />
      </div>
    </section>
  );
}

// feature grid component
function FeaturesGrid() {
  return (
    <motion.div
      className={cn(
        "relative z-10 mx-auto grid pb-12",
        getGridTemplateClass(GRID_COUNT_MOBILE),
        getGridTemplateClass(GRID_COUNT_TABLET, "md"),
        getGridTemplateClass(GRID_COUNT_DESKTOP, "lg")
      )}
      initial="hidden"
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: {
          opacity: 1,
          y: 0,
          transition: { staggerChildren: 0.12, duration: 0.6, ease: "easeOut" },
        },
      }}
      viewport={{ once: false }}
      whileInView="show"
    >
      {OUR_VALUES.map((feature, index) => (
        <FeatureCard key={feature.title} {...feature} index={index} />
      ))}
    </motion.div>
  );
}

// feature card component
const FeatureCard = ({
  title,
  description,
  icon: Icon,
  index,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}) => (
  <motion.div
    className={cn(
      "group/feature relative flex flex-col border py-10 backdrop-blur-md lg:border-0 lg:border-r",
      isDesktopFirstColumn(index) && "lg:border-l",
      isDesktopFirstRow(index) && "lg:border-b"
    )}
    variants={{
      hidden: { opacity: 0, y: 40 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      },
    }}
    viewport={{ once: false }}
    whileHover={{ y: -6 }}
  >
    {isDesktopFirstRow(index) && (
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-linear-to-t from-secondary to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
    )}
    {!isDesktopFirstRow(index) && (
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-linear-to-b from-secondary to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
    )}
    <div className="relative z-10 mb-4 px-10 text-foreground group-hover/feature:text-primary">
      <Icon className="shrink-0" />
    </div>
    <div className="relative z-10 mb-2 px-10 font-bold text-lg">
      <motion.div
        className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-tr-full rounded-br-full bg-foreground/25 transition-all duration-200 group-hover/feature:bg-primary"
        layout
        transition={{ duration: 0.3 }}
        viewport={{ once: false }}
        whileInView={{ height: "2.25rem" }}
      />
      <span className="inline-block text-foreground transition duration-200 group-hover/feature:translate-x-2">
        {title}
      </span>
    </div>
    <p className="relative z-10 text-pretty px-10 text-muted-foreground text-sm">
      {description}
    </p>
  </motion.div>
);
