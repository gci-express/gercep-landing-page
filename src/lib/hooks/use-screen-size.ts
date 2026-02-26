import { useCallback, useEffect, useMemo, useState } from "react";

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

type ScreenSize = {
  width: number;
  height: number;
  breakpoint: Breakpoint | null;
  lessThan: (bp: Breakpoint) => boolean;
};

const getDimensions = () => {
  if (typeof window === "undefined") {
    return { width: 0, height: 0 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

const getBreakpoint = (width: number): Breakpoint | null => {
  const entries = Object.entries(BREAKPOINTS) as [Breakpoint, number][];
  let current: Breakpoint | null = null;

  for (const [bp, minWidth] of entries) {
    if (width >= minWidth) {
      current = bp;
    }
  }

  return current;
};

export function useScreenSize(): ScreenSize {
  const [{ width, height }, setDimensions] = useState(getDimensions);

  useEffect(() => {
    const handleResize = () => setDimensions(getDimensions());

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const breakpoint = useMemo(() => getBreakpoint(width), [width]);

  const lessThan = useCallback(
    (bp: Breakpoint) => {
      const bpValue = BREAKPOINTS[bp];
      if (bpValue === undefined) {
        return false;
      }
      return width < bpValue;
    },
    [width]
  );

  return {
    width,
    height,
    breakpoint,
    lessThan,
  };
}
