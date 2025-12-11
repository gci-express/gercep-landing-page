"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../button";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  className?: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);

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

  return (
    <div
      className={cn(
        "mx-auto max-w-sm font-sans antialiased md:max-w-4xl",
        className
      )}
    >
      <div className="group relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : baseRotations[index],
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
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
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <motion.div
            animate={{
              y: 0,
              opacity: 1,
            }}
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
          <div className="flex gap-4 pt-12 md:pt-0">
            <Button
              className="group/button size-10 rounded-full border border-primary/25 text-primary"
              onClick={handlePrev}
              size="icon-lg"
              variant="secondary"
            >
              <ArrowLeftIcon className="h-5 w-5 transition-transform duration-300 group-hover/button:rotate-12" />
            </Button>
            <Button
              className="group/button size-10 rounded-full border border-primary/25 text-primary"
              onClick={handleNext}
              size="icon-lg"
              variant="secondary"
            >
              <ArrowRightIcon className="group-hover/button:-rotate-12 h-5 w-5 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
