import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { OUR_CONTACTS } from "@/lib/constants";
import { useDetectBrowser } from "@/lib/hooks/use-detect-browser";
import { useScreenSize } from "@/lib/hooks/use-screen-size";
import SnowfallCanvas from "../shared/snowfall-canvas";
import GooeySvgFilter from "../ui/fancy-components/gooey-svg-filter";
import PixelTrail from "../ui/fancy-components/pxiel-trail";

const leftContentVariants = {
  hidden: { opacity: 0, x: -48, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      delayChildren: 0.15,
      staggerChildren: 0.12,
    },
  },
} satisfies Variants;

const leftChildVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.12,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
} satisfies Variants;

const rightContentVariants = {
  hidden: { opacity: 0, x: 48, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      delayChildren: 0.25,
      staggerChildren: 0.1,
    },
  },
} satisfies Variants;

const contactCardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: index * 0.08,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
} satisfies Variants;

const HEAVY_MOUNT_DELAY_MS = 800;

export function ContactContainer() {
  const screenSize = useScreenSize();
  const browserName = useDetectBrowser();
  const isSafari = browserName === "Safari";
  const [isHeavyMounted, setIsHeavyMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(
      () => setIsHeavyMounted(true),
      HEAVY_MOUNT_DELAY_MS
    );
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative z-10 flex min-h-[50dvh] w-full flex-col overflow-hidden text-pretty border-border/35 border-b-3 border-dashed bg-primary pt-30 text-primary-foreground lg:min-h-[calc(100dvh-26rem)] lg:pt-0">
      {/* Background image overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-25!"
        style={{
          backgroundImage: `url("/bg-image-footer.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Ice / snow background layers */}
      {/* <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/80" /> */}
      {/* <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.3)_0%,_transparent_70%)] opacity-30" /> */}

      {/* Heavy background components — delayed mount so motion animations play first */}
      {isHeavyMounted ? (
        <>
          {/* Snowfall animation */}
          <SnowfallCanvas
            className="z-10"
            color="rgba(255, 255, 255,"
            opacityRange={[0.15, 0.7]}
            particleCount={screenSize.lessThan("md") ? 60 : 120}
            sizeRange={[1, 5]}
            speedRange={[0.3, 1.8]}
            windStrength={0.9}
          />

          {/* Secondary layer — smaller, slower, more transparent for depth */}
          <SnowfallCanvas
            className="z-[11]"
            color="rgba(255, 255, 255,"
            opacityRange={[0.05, 0.25]}
            particleCount={screenSize.lessThan("md") ? 25 : 50}
            sizeRange={[2, 7]}
            speedRange={[0.15, 0.6]}
            windStrength={0.4}
          />

          <GooeySvgFilter id="gooey-filter-pixel-trail" strength={5} />

          <div
            className="absolute inset-0 z-20"
            style={{
              filter: isSafari ? "none" : "url(#gooey-filter-pixel-trail)",
            }}
          >
            <PixelTrail
              delay={500}
              fadeDuration={0}
              pixelClassName="bg-white"
              pixelSize={screenSize.lessThan("md") ? 24 : 32}
            />
          </div>
        </>
      ) : null}

      {/* Get in touch section */}
      <div className="container relative mx-auto w-full px-4 pb-48 md:mt-auto md:px-6 md:pb-32 lg:px-8">
        <div className="flex flex-col items-center gap-20 text-center md:gap-24 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:text-left">
          {/* Left — heading & description */}
          <motion.div
            className="z-30 w-full max-w-lg md:w-auto"
            initial="hidden"
            variants={leftContentVariants}
            viewport={{ once: true, amount: 0.4 }}
            whileInView="visible"
          >
            <motion.h2
              className="mb-8 font-bold text-5xl text-primary-foreground/90 md:text-6xl lg:mb-10 lg:text-7xl"
              custom={0}
              variants={leftChildVariants}
            >
              Get in touch
            </motion.h2>
            <motion.p
              className="mx-auto w-full text-primary-foreground/75 text-xl leading-relaxed md:max-w-[35ch] lg:max-w-none lg:text-2xl"
              custom={1}
              variants={leftChildVariants}
            >
              Have questions or need assistance? Our team at GERCEP is here to
              help. Give us a call or send an email, and let&apos;s start!
            </motion.p>
          </motion.div>

          {/* Right — contact info cards */}
          <motion.div
            className="z-30 flex w-full flex-col gap-3 md:w-auto md:min-w-[450px]"
            initial="hidden"
            variants={rightContentVariants}
            viewport={{ once: true, amount: 0.3 }}
            whileInView="visible"
          >
            {OUR_CONTACTS.map((item, index) => (
              <motion.a
                className="flex items-center gap-3 rounded-lg bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-all hover:scale-[1.02] hover:bg-white hover:shadow-md lg:gap-4"
                custom={index}
                href={item.href}
                key={item.label}
                rel="noreferrer noopener"
                target="_blank"
                variants={contactCardVariants}
              >
                <item.icon className="h-5 w-5 shrink-0 text-primary" />
                <span className="font-medium text-base text-foreground lg:text-lg">
                  {item.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
