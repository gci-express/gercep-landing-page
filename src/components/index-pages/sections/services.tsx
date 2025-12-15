import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { useId } from "react";
import { OUR_SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { SectionHeading } from "../section-heading";

export default function ServicesSection() {
  const servicesHeadingId = "services-section-heading";

  return (
    <section
      aria-labelledby={servicesHeadingId}
      className="relative overflow-hidden py-12 md:py-24"
    >
      <div
        aria-hidden
        className="-z-10 pointer-events-none absolute inset-0 bg-background"
        role="presentation"
      >
        <motion.svg
          animate={{ opacity: [0.25, 0.4, 0.25], rotate: [0, 0.5, 0] }}
          aria-hidden="true"
          className="-translate-x-1/2 absolute top-0 left-1/2 h-[140%] w-[140%] text-foreground/25"
          preserveAspectRatio="none"
          role="presentation"
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY }}
          viewBox="0 0 1000 1000"
        >
          <path
            d="M-20 120 C 80 60, 220 60, 320 120 S 520 180, 620 120 820 60, 920 120 1120 180, 1220 120"
            fill="none"
            stroke="currentColor"
            strokeDasharray="14 22"
            strokeLinecap="round"
            strokeWidth="3"
          />
          <path
            d="M-40 380 C 110 340, 240 420, 360 360 S 560 300, 700 380 930 440, 1080 360"
            fill="none"
            stroke="currentColor"
            strokeDasharray="10 28"
            strokeLinecap="round"
            strokeOpacity="0.7"
            strokeWidth="4"
          />
          <path
            d="M-80 650 C 40 560, 220 720, 360 640 S 560 520, 720 640 980 700, 1120 620"
            fill="none"
            stroke="currentColor"
            strokeDasharray="6 18"
            strokeLinecap="round"
            strokeOpacity="0.5"
            strokeWidth="5"
          />
        </motion.svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          badge="Our Business"
          className="max-w-xl"
          description="Tailored strategies to make your business operations simpler, more efficient, and more profitable."
          title={
            <>
              <span className="text-primary">End-to-End</span>
              <br />
              Logistics Solutions
            </>
          }
          titleId={servicesHeadingId}
        />

        <ul className="grid auto-rows-[300px] grid-cols-1 gap-6 md:grid-cols-3">
          {OUR_SERVICES.map((service, idx) => (
            <li
              className={cn("list-none", service.colSpan)}
              key={service.title ?? idx}
            >
              <ServiceCard idx={idx} service={service} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

type ServiceItem = (typeof OUR_SERVICES)[number];

const serviceThemes = {
  media: {
    icon: "bg-white/25 text-white backdrop-blur-md",
    heading: "text-white",
    body: "text-white",
    arrow: "border-white/30 text-white",
  },
  default: {
    icon: "bg-white/25 text-white backdrop-blur-md",
    heading: "text-white",
    body: "text-white",
    arrow: "border-white/30 text-white",
  },
} as const;

function ServiceCard({ service, idx }: { service: ServiceItem; idx: number }) {
  const generatedId = useId();
  const headingId = `service-card-title-${generatedId}`;
  const descriptionId = `service-card-description-${generatedId}`;
  const themedBackground = Boolean(service.image || service.bgClass);
  const theme = themedBackground ? serviceThemes.media : serviceThemes.default;
  const Icon = service.icon;

  return (
    <motion.article
      aria-describedby={descriptionId}
      aria-labelledby={headingId}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl",
        service.bgClass || "bg-card"
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      transition={{
        delay: idx * 0.15,
        duration: 0.25,
      }}
      viewport={{ once: false }}
      whileInView={{ opacity: 1, scale: 1 }}
    >
      {/* Background image overlay */}
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.03, 1] }}
        aria-hidden
        className="pointer-events-none absolute inset-0"
        role="presentation"
        style={{
          backgroundImage: `url("/bg-image-footer.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY }}
      />

      {service?.image ? (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10 bg-linear-to-t from-black/80 via-black/35 to-transparent" />
          <img
            alt={service.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            height="400"
            src={service.image}
            width="600"
          />
        </div>
      ) : null}

      <div
        className={cn(
          "relative z-20 flex h-full flex-col justify-center p-8",
          service.image ? "" : "opacity-80"
        )}
      >
        <div
          className={cn(
            "mb-4 flex h-12 w-12 items-center justify-center rounded-lg opacity-75",
            theme.icon
          )}
        >
          <Icon className="h-6 w-6" />
        </div>

        <h3
          className={cn("mb-2 font-bold text-2xl", theme.heading)}
          id={headingId}
        >
          {service.title}
        </h3>

        <p
          className={cn(
            "max-w-md text-pretty text-sm leading-relaxed",
            theme.body
          )}
          id={descriptionId}
        >
          {service.desc}
        </p>

        <div
          className={cn(
            "mt-6 flex h-8 w-8 items-center justify-center rounded-full border opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100",
            theme.arrow
          )}
        >
          <ArrowRightIcon aria-hidden className="size-4 shrink-0 opacity-75" />
        </div>
      </div>
    </motion.article>
  );
}
