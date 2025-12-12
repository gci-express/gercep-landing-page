/**
 * from component Animated Testimonials
 * base on: https://ui.aceternity.com/components/animated-testimonials
 *
 */
"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MailIcon,
  PhoneCallIcon,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { WHATSAPP_TEXT } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  className?: string;
  email: string;
  phone: string;
};

const TeamCard = ({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { amount: 0.3 });

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (!autoplay) {
      return;
    }

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const baseRotations = useMemo(
    () =>
      testimonials.map((_, index) => {
        const angle = (index * 13) % 21; // deterministic but varied
        return angle - 10; // shift to range [-10, 10]
      }),
    [testimonials]
  );

  const getHiddenCardAnimation = (index: number) => ({
    opacity: 0,
    scale: 0.9,
    z: -100,
    rotate: baseRotations[index],
    zIndex: 0,
    y: 0,
  });

  const getVisibleCardAnimation = (index: number) => {
    if (!inView) {
      return getHiddenCardAnimation(index);
    }

    if (isActive(index)) {
      return {
        opacity: 1,
        scale: 1,
        z: 0,
        rotate: 0,
        zIndex: 40,
        y: [0, -80, 0],
      };
    }

    return {
      opacity: 0.7,
      scale: 0.95,
      z: -100,
      rotate: baseRotations[index],
      zIndex: testimonials.length + 2 - index,
      y: 0,
    };
  };

  return (
    <motion.div
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      className={cn(
        "mx-auto max-w-sm font-sans antialiased md:max-w-4xl",
        className
      )}
      initial={{ opacity: 0, y: 40 }}
      ref={containerRef}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="group relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  animate={getVisibleCardAnimation(index)}
                  className="absolute inset-0 origin-bottom"
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: baseRotations[index],
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: baseRotations[index],
                  }}
                  key={testimonial.name}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                >
                  <img
                    alt={testimonial.name}
                    className="h-full w-full rounded-3xl object-cover object-center grayscale transition-all duration-300 hover:grayscale-0 group-hover:grayscale-0"
                    draggable={false}
                    height={500}
                    src={testimonial.src}
                    width={500}
                  />
                  <div className="absolute inset-0 flex items-end justify-center rounded-3xl bg-linear-to-t from-background/50 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex w-full max-w-[90%] flex-wrap justify-center gap-3 pb-4">
                      <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 8 }}
                        transition={{
                          duration: 0.25,
                          ease: "easeOut",
                          delay: 0.05,
                        }}
                      >
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              asChild
                              className="rounded-full shadow-none backdrop-blur-md"
                              size="icon"
                              variant="secondary"
                            >
                              <a href={`mailto:${testimonial.email}`}>
                                <MailIcon className="h-4 w-4 shrink-0" />
                              </a>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <p>Mail us</p>
                          </TooltipContent>
                        </Tooltip>
                      </motion.div>
                      <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 8 }}
                        transition={{
                          duration: 0.25,
                          ease: "easeOut",
                          delay: 0.1,
                        }}
                      >
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              asChild
                              className="rounded-full shadow-none backdrop-blur-md"
                              size="icon"
                              variant="secondary"
                            >
                              <a
                                href={`https://wa.me/${testimonial.phone}?text=${encodeURIComponent(WHATSAPP_TEXT)}`}
                                rel="noreferrer"
                                target="_blank"
                              >
                                <PhoneCallIcon className="h-4 w-4 shrink-0" />
                              </a>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <p>Whatsapp us</p>
                          </TooltipContent>
                        </Tooltip>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <motion.div
            animate={
              inView
                ? {
                    y: 0,
                    opacity: 1,
                  }
                : {
                    y: 20,
                    opacity: 0,
                  }
            }
            exit={{
              y: -20,
              opacity: 0,
            }}
            initial={{
              y: 20,
              opacity: 0,
            }}
            key={active}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="font-bold text-2xl text-foreground">
              {testimonials[active].name}
            </h3>
            <p className="text-muted-foreground text-sm">
              {testimonials[active].designation}
            </p>
            <motion.p className="mt-8 text-pretty text-lg text-muted-foreground">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  className="inline-block"
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 0,
                  }}
                  key={`${testimonials[active].name}-${index}-${word}`}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                >
                  {word}
                  &nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <motion.div
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            className="flex gap-4 pt-12 md:pt-0"
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="group/button size-10 rounded-full border border-primary/25 text-primary"
                onClick={handlePrev}
                size="icon-lg"
                variant="secondary"
              >
                <ArrowLeftIcon className="h-5 w-5 transition-transform duration-300 group-hover/button:rotate-12" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="group/button size-10 rounded-full border border-primary/25 text-primary"
                onClick={handleNext}
                size="icon-lg"
                variant="secondary"
              >
                <ArrowRightIcon className="group-hover/button:-rotate-12 h-5 w-5 transition-transform duration-300" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamCard;
