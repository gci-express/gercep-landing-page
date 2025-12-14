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
type Breakpoint = "md" | "lg";

const RESPONSIVE_GRID_CLASS_MAP: Record<
  Breakpoint,
  Record<GridClassKey, string>
> = {
  md: {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  },
  lg: {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
  },
};

const getGridTemplateClass = (
  count: number,
  breakpoint?: Breakpoint
): string => {
  const safeKey = Math.min(Math.max(count, 1), 4) as GridClassKey;
  const baseClass = GRID_CLASS_MAP[safeKey];
  return breakpoint
    ? RESPONSIVE_GRID_CLASS_MAP[breakpoint][safeKey]
    : baseClass;
};

const isDesktopFirstColumn = (index: number) =>
  index % GRID_COUNT_DESKTOP === 0;

const isDesktopFirstRow = (index: number) => index < GRID_COUNT_DESKTOP;

export default function OurValuesSection() {
  return (
    <section
      aria-labelledby="our-values-heading"
      className="relative overflow-hidden rounded-b-4xl py-12 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.5)] md:py-24"
    >
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
          titleId="our-values-heading"
        />

        <FeaturesGrid />
      </div>
    </section>
  );
}

// feature grid component
function FeaturesGrid() {
  return (
    <motion.ul
      aria-label="Gercep core values"
      className={cn(
        "relative z-10 mx-auto grid",
        getGridTemplateClass(GRID_COUNT_MOBILE),
        getGridTemplateClass(GRID_COUNT_TABLET, "md"),
        getGridTemplateClass(GRID_COUNT_DESKTOP, "lg")
      )}
      initial="hidden"
      role="list"
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            staggerChildren: 0.15,
            duration: 0.25,
            ease: "easeOut",
          },
        },
      }}
      viewport={{ once: false }}
      whileInView="show"
    >
      {OUR_VALUES.map((feature, index) => (
        <FeatureCard key={feature.title} {...feature} index={index} />
      ))}
    </motion.ul>
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
  <motion.li
    className={cn(
      "group/feature relative flex flex-col border-border border-b border-l py-6 backdrop-blur-md md:py-10 lg:border-r lg:border-b-0 lg:border-l-0",
      isDesktopFirstColumn(index) && "lg:border-l",
      isDesktopFirstRow(index) && "lg:border-b"
    )}
    variants={{
      hidden: { opacity: 0, y: 40 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.25, ease: "easeOut" },
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
      <Icon aria-hidden className="shrink-0 opacity-75" />
    </div>
    <div className="relative z-10 mb-2 px-10 font-bold text-lg">
      <motion.div
        className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-tr-full rounded-br-full bg-foreground/25 transition-all duration-200 group-hover/feature:bg-primary"
        layout
        transition={{ duration: 0.5 }}
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
  </motion.li>
);
