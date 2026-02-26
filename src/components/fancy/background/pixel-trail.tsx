import { motion, useAnimationControls } from "motion/react";
import React, { useCallback, useMemo, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDimensions } from "@/lib/hooks/use-dimensions";
import { cn } from "@/lib/utils";

type PixelTrailProps = {
  pixelSize: number; // px
  fadeDuration?: number; // ms
  delay?: number; // ms
  className?: string;
  pixelClassName?: string;
};

const PixelTrail: React.FC<PixelTrailProps> = ({
  pixelSize = 20,
  fadeDuration = 500,
  delay = 0,
  className,
  pixelClassName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(containerRef);
  const trailId = useRef(uuidv4());

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / pixelSize);
      const y = Math.floor((e.clientY - rect.top) / pixelSize);

      const pixelElement = document.getElementById(
        `${trailId.current}-pixel-${x}-${y}`
      );
      if (pixelElement) {
        // biome-ignore lint/suspicious/noExplicitAny: -
        const animatePixel = (pixelElement as any).__animatePixel;
        if (animatePixel) {
          animatePixel();
        }
      }
    },
    [pixelSize]
  );

  const columns = useMemo(
    () => Math.ceil(dimensions.width / pixelSize),
    [dimensions.width, pixelSize]
  );
  const rows = useMemo(
    () => Math.ceil(dimensions.height / pixelSize),
    [dimensions.height, pixelSize]
  );

  return (
    // biome-ignore lint/a11y/noNoninteractiveElementInteractions: -
    // biome-ignore lint/a11y/noStaticElementInteractions: -
    <div
      className={cn(
        "pointer-events-auto absolute inset-0 h-full w-full",
        className
      )}
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div className="flex" key={String(rowIndex)}>
          {Array.from({ length: columns }).map((_col, colIndex) => (
            <PixelDot
              className={pixelClassName}
              delay={delay}
              fadeDuration={fadeDuration}
              id={`${trailId.current}-pixel-${colIndex}-${rowIndex}`}
              key={`${colIndex}-${String(rowIndex)}`}
              size={pixelSize}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PixelTrail;

type PixelDotProps = {
  id: string;
  size: number;
  fadeDuration: number;
  delay: number;
  className?: string;
};

const PixelDot: React.FC<PixelDotProps> = React.memo(
  ({ id, size, fadeDuration, delay, className }) => {
    const controls = useAnimationControls();

    const animatePixel = useCallback(() => {
      controls.start({
        opacity: [1, 0],
        transition: { duration: fadeDuration / 1000, delay: delay / 1000 },
      });
    }, [controls.start, delay, fadeDuration]);

    // Attach the animatePixel function to the DOM element
    const ref = useCallback(
      (node: HTMLDivElement | null) => {
        if (node) {
          // biome-ignore lint/suspicious/noExplicitAny: -
          (node as any).__animatePixel = animatePixel;
        }
      },
      [animatePixel]
    );

    return (
      <motion.div
        animate={controls}
        className={cn("cursor-pointer-none", className)}
        exit={{ opacity: 0 }}
        id={id}
        initial={{ opacity: 0 }}
        ref={ref}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    );
  }
);

PixelDot.displayName = "PixelDot";
