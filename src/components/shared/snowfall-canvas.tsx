import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Snowflake = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wind: number;
  opacity: number;
  wobbleAmplitude: number;
  wobbleSpeed: number;
  wobbleOffset: number;
};

type SnowfallCanvasProps = {
  particleCount?: number;
  className?: string;
  color?: string;
  windStrength?: number;
  speedRange?: [number, number];
  sizeRange?: [number, number];
  opacityRange?: [number, number];
};

const SnowfallCanvas = ({
  particleCount = 120,
  className,
  color = "rgba(255, 255, 255,",
  windStrength = 0.8,
  speedRange = [0.3, 1.5],
  sizeRange = [1, 4],
  opacityRange = [0.2, 0.8],
}: SnowfallCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snowflakesRef = useRef<Snowflake[]>([]);
  const animationRef = useRef<number>(0);

  const createSnowflake = useCallback(
    (
      canvasWidth: number,
      canvasHeight: number,
      startAtTop = false
    ): Snowflake => {
      const radius =
        sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);

      return {
        x: Math.random() * canvasWidth,
        y: startAtTop ? -radius * 2 : Math.random() * canvasHeight,
        radius,
        speed: speedRange[0] + Math.random() * (speedRange[1] - speedRange[0]),
        wind:
          (Math.random() * 0.5 + 0.5) *
          windStrength *
          (Math.random() > 0.1 ? 1 : -0.3),
        opacity:
          opacityRange[0] + Math.random() * (opacityRange[1] - opacityRange[0]),
        wobbleAmplitude: Math.random() * 1.5 + 0.5,
        wobbleSpeed: Math.random() * 0.02 + 0.01,
        wobbleOffset: Math.random() * Math.PI * 2,
      };
    },
    [sizeRange, speedRange, windStrength, opacityRange]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resizeCanvas();

    // Initialize snowflakes
    snowflakesRef.current = Array.from({ length: particleCount }, () =>
      createSnowflake(canvas.width, canvas.height, false)
    );

    let time = 0;

    const animate = () => {
      if (!(ctx && canvas)) {
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      for (const flake of snowflakesRef.current) {
        // Wobble effect for natural wind movement
        const wobble =
          Math.sin(time * flake.wobbleSpeed + flake.wobbleOffset) *
          flake.wobbleAmplitude;

        flake.x += flake.wind + wobble * 0.3;
        flake.y += flake.speed;

        // Reset snowflake when it goes off-screen
        if (
          flake.y > canvas.height + flake.radius * 2 ||
          flake.x > canvas.width + 50 ||
          flake.x < -50
        ) {
          flake.y = -flake.radius * 2;
          flake.x = Math.random() * (canvas.width + 100) - 50;
        }

        // Draw snowflake with radial gradient for soft glow
        const gradient = ctx.createRadialGradient(
          flake.x,
          flake.y,
          0,
          flake.x,
          flake.y,
          flake.radius
        );
        gradient.addColorStop(0, `${color} ${flake.opacity})`);
        gradient.addColorStop(1, `${color} 0)`);

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    resizeObserver.observe(canvas.parentElement ?? canvas);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [particleCount, color, createSnowflake]);

  return (
    <canvas
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className
      )}
      ref={canvasRef}
    />
  );
};

export default SnowfallCanvas;
