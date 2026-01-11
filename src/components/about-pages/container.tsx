import { motion, useAnimation, useInView, type Variants } from "framer-motion";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import {
  OUR_PILLARS,
  VISION_MISSION,
  WHATSAPP_TEXT,
  WHATSAPP_URL,
} from "@/lib/constants";
import { Button } from "../ui/button";

const MotionPlusIcon = motion.create(PlusIcon);

const headerTextVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.15,
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
} satisfies Variants;

const visionListVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.18,
    },
  },
} satisfies Variants;

const visionColumnVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
} satisfies Variants;

const visionColumnChildren = {
  hidden: { opacity: 0, y: 16 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + index * 0.12,
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
} satisfies Variants;

const visionCardVariants = {
  hidden: { opacity: 0, y: 32, rotateX: 8, filter: "blur(6px)" },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      delay: index * 0.08,
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  hover: {
    y: -12,
    rotateX: 0,
    rotateY: 2,
    scale: 1.01,
    boxShadow: "0 25px 55px rgba(15, 23, 42, 0.15)",
  },
} satisfies Variants;

const cardShineVariants = {
  hidden: { opacity: 0, x: -25 },
  hover: {
    opacity: 0.55,
    x: 25,
    transition: { duration: 0.25, ease: [0.45, 0, 0.55, 1] },
  },
} satisfies Variants;

const pillarsListVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    rotateX: 18,
    rotateY: -10,
    scale: 0.9,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      delayChildren: 0.18,
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
} satisfies Variants;

const pillarCardVariants = {
  hidden: (index = 0) => ({
    opacity: 0,
    y: 60,
    rotateX: -18,
    rotateY: index % 2 === 0 ? -12 : 12,
    rotateZ: index % 2 === 0 ? -3 : 3,
    skewY: index % 2 === 0 ? 4 : -4,
    scale: 0.82,
    filter: "blur(14px)",
  }),
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    skewY: 0,
    scale: [0.92, 1.04, 1],
    filter: "blur(0px)",
    transition: {
      delay: 0.15 + index * 0.07,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  hover: {
    y: -18,
    rotateX: 16,
    rotateY: 12,
    scale: 1.05,
    boxShadow: "0 35px 65px rgba(15, 23, 42, 0.10)",
  },
} satisfies Variants;

export function Header() {
  return (
    <div className="mx-0 lg:mx-8">
      <div className="container relative mx-auto mt-24 mb-4 flex w-full flex-col justify-between gap-y-6 bg-background px-4 py-0 text-foreground sm:px-6 lg:mt-32 lg:border-primary/25 lg:border-x-2 lg:border-dashed lg:px-8 lg:py-8">
        <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 hidden w-screen lg:block lg:border-2 lg:border-primary/25 lg:border-t lg:border-dashed" />

        <motion.section
          animate="visible"
          aria-labelledby="about-heading"
          className="grid items-end gap-6 lg:grid-cols-12 lg:gap-8"
          initial="hidden"
          role="group"
        >
          <header className="col-span-full lg:col-span-8 xl:col-span-6">
            <motion.p
              className="mb-2 font-bold text-primary text-sm uppercase tracking-widest"
              custom={0}
              id="about-kicker"
              variants={headerTextVariants}
            >
              About Us
            </motion.p>
            <motion.h1
              aria-describedby="about-kicker"
              className="text-pretty font-extrabold text-4xl uppercase leading-tight md:text-5xl"
              custom={1}
              id="about-heading"
              variants={headerTextVariants}
            >
              The Most <span className="text-primary">Trusted</span> Logistics{" "}
              <span className="text-primary">Partner</span> for Your Business
            </motion.h1>
          </header>

          <section
            aria-labelledby="about-pillars-heading"
            className="col-span-full lg:col-span-4 lg:col-end-13"
          >
            <h2 className="sr-only" id="about-pillars-heading">
              What drives GERCEP
            </h2>
            <motion.p
              className="text-pretty text-lg leading-relaxed tracking-tight opacity-75"
              custom={2}
              variants={headerTextVariants}
            >
              Reliability, Speed, Innovation, Partnership, and Integrity—five
              pillars that guide every delivery and every customer relationship.
            </motion.p>
          </section>
        </motion.section>

        <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 hidden w-screen lg:block lg:border-2 lg:border-primary/25 lg:border-b lg:border-dashed" />
      </div>
    </div>
  );
}

export function Vision() {
  const listRef = useRef<HTMLUListElement>(null);
  const listControls = useAnimation();
  const listInView = useInView(listRef, {
    once: true,
    margin: "-10% 0px",
  });

  useEffect(() => {
    if (listInView) {
      listControls.start("visible");
    }
  }, [listControls, listInView]);

  return (
    <section
      aria-labelledby="vision-section-heading"
      className="container mx-auto grid gap-8 px-4 pt-4 pb-8 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pb-16 xl:pb-24"
    >
      <h2 className="sr-only" id="vision-section-heading">
        Vision and mission
      </h2>
      <motion.div
        className="col-span-full flex flex-col items-stretch space-y-6 lg:col-span-6"
        initial="hidden"
        variants={visionColumnVariants}
        viewport={{ once: true, amount: 0.55 }}
        whileInView="visible"
      >
        <motion.section
          aria-labelledby="vision-description-heading"
          className="flex-1"
          variants={visionColumnChildren}
        >
          <h3 className="sr-only" id="vision-description-heading">
            Customer promise
          </h3>
          <motion.p
            className="mb-10 text-pretty font-medium text-2xl text-foreground leading-relaxed tracking-tight"
            custom={0}
            variants={visionColumnChildren}
          >
            Our focus is simple: increase customer productivity through
            innovative logistics and consistent execution—so your business runs
            smoother and more profitable.
          </motion.p>

          <motion.div custom={1} variants={visionColumnChildren}>
            <Button asChild className="px-8!" size="lg">
              <a
                aria-label="Request a logistics quote via WhatsApp"
                href={`${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_TEXT)}`}
                rel="noreferrer noopener"
                target="_blank"
              >
                Get a Quote
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </motion.section>

        <motion.p
          className="mt-auto hidden text-pretty font-semibold text-muted-foreground/75 text-sm uppercase tracking-[0.4em] lg:block"
          custom={2}
          variants={visionColumnChildren}
        >
          Based in Jakarta, ID
        </motion.p>
      </motion.div>

      <section
        aria-labelledby="vision-mission-list-heading"
        className="col-span-full space-y-6 lg:col-span-5 lg:col-end-13"
      >
        <h3 className="sr-only" id="vision-mission-list-heading">
          Vision and mission cards
        </h3>

        <motion.ul
          animate={listControls}
          className="space-y-6"
          initial="hidden"
          ref={listRef}
          variants={visionListVariants}
        >
          {VISION_MISSION.map((card, index) => (
            <li key={card.title}>
              <motion.article
                aria-labelledby={`card-${card.title}-heading`}
                className="relative mx-auto flex flex-col items-start rounded-none border-2 border-primary/50 border-dashed bg-muted shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                custom={index}
                style={{ transformStyle: "preserve-3d" }}
                tabIndex={0}
                variants={visionCardVariants}
                whileFocus="hover"
                whileHover="hover"
              >
                <MotionPlusIcon
                  animate={{
                    opacity: [0.4, 0.85, 0.4],
                    scale: [0.95, 1.1, 0.95],
                    rotate: [0, 90, 0],
                  }}
                  aria-hidden="true"
                  className="-top-3 -left-3 absolute h-6 w-6 text-primary"
                  transition={{
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
                <MotionPlusIcon
                  animate={{
                    opacity: [0.4, 0.85, 0.4],
                    scale: [0.95, 1.1, 0.95],
                    rotate: [0, -90, 0],
                  }}
                  aria-hidden="true"
                  className="-bottom-3 -left-3 absolute h-6 w-6 text-primary"
                  transition={{
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 0.4,
                  }}
                />
                <MotionPlusIcon
                  animate={{
                    opacity: [0.4, 0.85, 0.4],
                    scale: [0.95, 1.1, 0.95],
                    rotate: [0, -90, 0],
                  }}
                  aria-hidden="true"
                  className="-top-3 -right-3 absolute h-6 w-6 text-primary"
                  transition={{
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 0.8,
                  }}
                />
                <MotionPlusIcon
                  animate={{
                    opacity: [0.4, 0.85, 0.4],
                    scale: [0.95, 1.1, 0.95],
                    rotate: [0, 90, 0],
                  }}
                  aria-hidden="true"
                  className="-bottom-3 -right-3 absolute h-6 w-6 text-primary"
                  transition={{
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 1.2,
                  }}
                />

                <div className="relative m-2 overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground/75">
                  {/* Background image overlay */}
                  <motion.div
                    animate={{
                      opacity: [0.15, 0.3, 0.15],
                      scale: [1, 1.03, 1],
                    }}
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-50!"
                    role="presentation"
                    style={{
                      backgroundImage: `url("/bg-image-footer.png")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    transition={{
                      duration: 16,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-1 rounded-2xl bg-linear-to-tr from-white/15 via-transparent to-transparent blur-sm"
                    variants={cardShineVariants}
                  />

                  <div className="mb-4 flex items-center justify-between">
                    <h4
                      className="font-semibold text-xl"
                      id={`card-${card.title}-heading`}
                    >
                      {card.title}
                    </h4>

                    <div className="inline-flex shrink-0 items-center rounded-sm border border-primary-foreground/15 bg-primary-foreground/15 p-2">
                      {card.icon ? <card.icon className="opacity-100" /> : null}
                    </div>
                  </div>

                  <p className="text-pretty leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.article>
            </li>
          ))}
        </motion.ul>
      </section>
    </section>
  );
}

export function OurPilars() {
  return (
    <section
      aria-labelledby="our-pillars-heading"
      className="container mx-auto grid gap-10 px-4 py-8 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-12 xl:py-24"
    >
      <motion.header
        className="col-span-full lg:order-2 lg:col-span-4 lg:col-start-9"
        initial="hidden"
        viewport={{ once: true, amount: 0.6 }}
        whileInView="visible"
      >
        <motion.p
          className="mb-2 font-bold text-primary text-sm uppercase tracking-widest"
          custom={0}
          variants={headerTextVariants}
        >
          The Core
        </motion.p>
        <motion.h2
          className="text-pretty font-extrabold text-3xl text-foreground uppercase leading-tight md:text-4xl"
          custom={1}
          id="our-pillars-heading"
          variants={headerTextVariants}
        >
          Our <span className="text-primary">5 Pillars</span> of Excellence
        </motion.h2>
        <motion.p
          className="mt-6 text-pretty text-lg text-muted-foreground leading-relaxed tracking-tight opacity-75 md:text-xl"
          custom={2}
          variants={headerTextVariants}
        >
          We are built on a foundation of trust and efficiency. These core
          values drive every delivery we make.
        </motion.p>
      </motion.header>

      <motion.ul
        aria-label="Gercep five core pillars"
        className="md: col-span-full grid gap-2 sm:grid-cols-2 md:gap-4 lg:order-1 lg:col-span-8 lg:grid-cols-6"
        initial="hidden"
        role="list"
        variants={pillarsListVariants}
        viewport={{ once: true, amount: 0.35 }}
        whileInView="visible"
      >
        {OUR_PILLARS.map((pillar, index) => {
          const total = OUR_PILLARS.length;
          const isLastOddItem = total % 2 === 1 && index === total - 1;
          const isLastRowPair =
            total % 3 === 2 && index >= total - 2 && total >= 3;

          let pairAlignmentClass = "";
          if (isLastRowPair) {
            pairAlignmentClass =
              index === total - 2 ? "lg:col-start-2" : "lg:col-start-4";
          }

          const itemClassName = [
            "h-full",
            "lg:col-span-2",
            pairAlignmentClass,
            isLastOddItem ? "sm:col-span-2 lg:col-start-auto" : "",
          ]
            .filter(Boolean)
            .join(" ");

          const cardClassName = [
            "group relative flex h-full flex-col rounded-2xl border border-primary/20 bg-card p-6 shadow-[0_18px_50px_-35px_rgba(15,23,42,0.1)] backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
            isLastOddItem ? "sm:mx-auto sm:max-w-sm" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <li className={itemClassName} key={pillar.title}>
              <motion.article
                aria-labelledby={`pillar-${pillar.title}-heading`}
                className={cardClassName}
                tabIndex={0}
                variants={pillarCardVariants}
                whileFocus="hover"
                whileHover="hover"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-tr from-primary/15 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                <div className="relative z-10">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <h3
                      className="font-semibold text-xl uppercase"
                      id={`pillar-${pillar.title}-heading`}
                    >
                      {pillar.title}
                    </h3>

                    <div className="inline-flex shrink-0 items-center rounded-sm border border-border/40 bg-secondary/20 p-2 text-primary shadow-xs">
                      <pillar.icon
                        aria-hidden="true"
                        className="h-5 w-5 opacity-80"
                      />
                    </div>
                  </div>

                  <p className="text-pretty text-muted-foreground text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.article>
            </li>
          );
        })}
      </motion.ul>
    </section>
  );
}

export function RunningText() {
  return (
    <div className="relative flex py-24 text-center md:py-32">
      {/* Background image overlay */}
      <motion.div
        animate={{
          opacity: [0.15, 0.3, 0.15],
          scale: [1, 1.03, 1],
        }}
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25!"
        role="presentation"
        style={{
          backgroundImage: `url("/bg-image-footer.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        transition={{
          duration: 16,
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      <p className="sr-only">
        Reliability, Speed, Innovation, Partnership, and Integrity—five pillars
        that guide every delivery and every customer relationship.
      </p>

      <div aria-hidden="true" className="overflow-hidden whitespace-nowrap">
        <div className="running-text inline-flex items-center gap-12">
          <span>
            Reliability • Speed • Innovation • Partnership • Integrity •
          </span>
          <span aria-hidden="true">
            Reliability • Speed • Innovation • Partnership • Integrity •
          </span>
        </div>
      </div>
    </div>
  );
}
