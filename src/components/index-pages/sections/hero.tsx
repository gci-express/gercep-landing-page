import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_TEXT, WHATSAPP_URL } from "@/lib/constants";

const HEROBG = "/bg-hero-gercep-express-port-2.webp";
const heroTextVariants = {
  hidden: { opacity: 0, y: 24, skewY: 2, filter: "blur(24px)" },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    filter: "blur(0px)",
    transition: {
      delay: index * 0.01,
      duration: 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
} satisfies Variants;
const heroButtonVariant = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.25,
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
} satisfies Variants;
const HERO_HEADING_WORDS = [
  { id: "heading-deliver", text: "Deliver" },
  { id: "heading-smiles", text: "Smiles", highlight: true, breakAfter: true },
  { id: "heading-to", text: "To" },
  { id: "heading-every", text: "Every" },
  { id: "heading-destination", text: "Destination" },
];
const HERO_DESCRIPTION_TEXT =
  "We don't just deliver goods, we deliver trust, efficiency, and smiles at every destination. Experience the modern standard of logistics.";
const HERO_DESCRIPTION_WORDS = HERO_DESCRIPTION_TEXT.split(" ").map(
  (word, index) => ({
    id: `hero-description-word-${index}`,
    text: word,
  })
);
const HERO_WORD_OFFSET = HERO_HEADING_WORDS.length;
const DESCRIPTION_WORD_OFFSET =
  HERO_WORD_OFFSET + HERO_DESCRIPTION_WORDS.length;

export default function HeroSection() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], ["0%", "50%"]);

  return (
    <section
      aria-describedby="hero-description"
      aria-labelledby="hero-heading"
      className="relative flex h-screen flex-col items-center justify-evenly gap-24 overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div aria-hidden className="absolute inset-0 z-0" role="presentation">
        <div className="absolute inset-0 z-10 bg-linear-to-t from-black/85 via-black/50 to-black/25" />
        <motion.img
          alt="Logistics Hub"
          animate={{ scale: 1 }}
          className="h-full w-full object-cover object-center"
          height={1080}
          initial={{ scale: 1.1 }}
          src={HEROBG}
          style={{ y: parallaxY }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "linear",
          }}
          width={1920}
        />
      </div>

      <div className="container relative z-20 mx-auto px-4 pt-20">
        <div className="space-y-10 text-left">
          <motion.header
            animate="visible"
            className="space-y-6"
            initial="hidden"
            role="group"
          >
            <motion.p
              aria-label="Offering end-to-end logistics solutions"
              className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/25 bg-accent/75 px-3 py-1 font-bold text-accent-foreground text-xs uppercase tracking-widest backdrop-blur-sm"
              custom={0}
              variants={heroTextVariants}
            >
              End-to-End Logistics Solutions
            </motion.p>

            <motion.h1
              className="text-pretty font-black text-5xl text-primary-foreground uppercase italic leading-[0.9] md:text-7xl lg:text-8xl"
              id="hero-heading"
            >
              {HERO_HEADING_WORDS.map(
                ({ id, text, highlight, breakAfter }, index) => (
                  <Fragment key={id}>
                    <motion.span
                      className="inline-block uppercase leading-tight"
                      custom={HERO_WORD_OFFSET + index}
                      variants={heroTextVariants}
                    >
                      {highlight ? (
                        <span className="bg-linear-to-r from-primary to-primary/75 bg-clip-text text-outline-white text-transparent">
                          {text}
                        </span>
                      ) : (
                        text
                      )}
                    </motion.span>
                    {breakAfter ? (
                      <br />
                    ) : (
                      <span aria-hidden className="inline-block w-2" />
                    )}
                  </Fragment>
                )
              )}
            </motion.h1>

            <motion.p
              className="max-w-2xl text-pretty font-light text-lg text-primary-foreground/75 leading-relaxed md:text-xl"
              id="hero-description"
            >
              {HERO_DESCRIPTION_WORDS.map(({ id, text }, index) => (
                <Fragment key={id}>
                  <motion.span
                    className="mr-1 inline-block text-left last:mr-0"
                    custom={DESCRIPTION_WORD_OFFSET + index}
                    variants={heroTextVariants}
                  >
                    {text}
                  </motion.span>
                  {index < HERO_DESCRIPTION_WORDS.length - 1 ? (
                    <span aria-hidden> </span>
                  ) : null}
                </Fragment>
              ))}
            </motion.p>
          </motion.header>

          <motion.div
            animate="visible"
            initial="hidden"
            role="group"
            variants={heroButtonVariant}
          >
            <Button
              asChild
              className="h-12 w-full px-8! font-bold text-base uppercase tracking-widest md:h-14 md:w-auto lg:px-10!"
              size="lg"
            >
              <a
                aria-label="Request a logistics quote via WhatsApp"
                href={`${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_TEXT)}`}
                rel="noreferrer noopener"
                target="_blank"
              >
                Request a Quote <ArrowRightIcon className="ml-1 size-4.5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        aria-hidden
        className="-translate-x-1/2 absolute bottom-10 left-1/2 mb-4 flex flex-col items-center gap-2 text-white/30"
        role="presentation"
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="h-12 w-px bg-linear-to-b from-white/0 via-white/50 to-white/0" />
      </motion.div>
    </section>
  );
}
