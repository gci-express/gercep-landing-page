import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { useId } from "react";
import { OUR_SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { SectionHeading } from "../section-heading";

type ServiceItem = (typeof OUR_SERVICES)[number];

const serviceThemes = {
  media: {
    icon: "bg-white/25 text-white backdrop-blur-md",
    heading: "text-white",
    body: "text-white/80",
    arrow: "border-white/30 text-white",
  },
  default: {
    icon: "bg-white/25 text-white backdrop-blur-md",
    heading: "text-white",
    body: "text-white/80",
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
        duration: 0.5,
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
          service.image ? "" : "opacity-75"
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
          className={cn("mb-2 font-bold font-heading text-2xl", theme.heading)}
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

export default function ServicesSection() {
  const servicesHeadingId = "services-section-heading";

  return (
    <section
      aria-labelledby={servicesHeadingId}
      className="bg-background py-12 md:py-24"
    >
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
