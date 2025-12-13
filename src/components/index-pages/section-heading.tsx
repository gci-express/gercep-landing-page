import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

type SectionHeadingProps = {
  title: string | ReactNode;
  badge?: string | ReactNode;
  description?: string | ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  title,
  badge,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignClasses =
    align === "center"
      ? "text-center mx-auto text-balance"
      : "text-left text-pretty";

  return (
    <motion.div
      className={cn("mb-16 text-center", alignClasses, className)}
      initial="hidden"
      variants={sectionVariants}
      viewport={{ once: false, amount: 0.4 }}
      whileInView="visible"
    >
      {badge ? (
        <span className="mb-2 block font-bold text-primary text-sm uppercase tracking-widest">
          {badge}
        </span>
      ) : null}

      <motion.h2
        className="font-bold font-heading text-4xl text-foreground uppercase leading-tight md:text-5xl"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: "easeOut", delay: 0.1 },
          },
        }}
        viewport={{ once: false }}
      >
        {title}
      </motion.h2>

      {description ? (
        <motion.p
          className="mt-6 text-lg text-muted-foreground leading-relaxed md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: false }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
