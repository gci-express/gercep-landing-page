import { useStore } from "@nanostores/react";
import { format, parse } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  InfoIcon,
  LightbulbIcon,
  MapPinIcon,
  Package2Icon,
  PackageXIcon,
  RocketIcon,
  SearchIcon,
  TargetIcon,
  TruckIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import type {
  OrderData,
  TrackingEvent,
} from "@/lib/tracking-pages/tracking-data";
import { cn } from "@/lib/utils";
import { $events, $isSearching, $order, $searched } from "./tracking-store";

export function TrackingResults() {
  const searched = useStore($searched);
  const isSearching = useStore($isSearching);
  const order = useStore($order);
  const events = useStore($events);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const renderContent = () => {
    if (!isMounted) {
      return <InitialState key="initial" />;
    }

    if (isSearching) {
      return (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex h-64 w-full items-center justify-center"
          exit={{ opacity: 0, y: -10 }}
          initial={{ opacity: 0, y: 20 }}
          key="loading"
          transition={{ duration: 0.2 }}
        >
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </motion.div>
      );
    }

    if (!searched) {
      return <InitialState key="initial" />;
    }

    if (order) {
      return <TrackingResult events={events} key="result" order={order} />;
    }

    return <NotFoundState key="not-found" />;
  };

  return <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>;
}

function InitialState() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto w-full max-w-5xl px-4 text-center md:flex md:items-center md:gap-12 md:px-6 md:text-left lg:px-8"
      exit={{ opacity: 0, y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.15, delay: 0.2 }}
    >
      <div className="shrink-0 md:w-1/2">
        {/* Custom Animated Tracking Illustration */}
        <div className="relative mx-auto mb-14 flex h-56 w-full max-w-lg items-center justify-center md:mb-0 lg:max-w-lg">
          {/* Fading Grid Background */}
          <div
            className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_24px]"
            style={{
              maskImage:
                "radial-gradient(ellipse 60% 60% at 50% 50%, #000 40%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 60% 60% at 50% 50%, #000 40%, transparent 100%)",
            }}
          />

          {/* Main Connection Line Background */}
          <div className="-translate-y-1/2 absolute top-1/2 right-10 left-10 z-0 h-0.5 overflow-hidden rounded-full bg-border/40">
            <motion.div
              animate={{ x: ["-100%", "300%"] }}
              className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </div>

          {/* Origin Node Left */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0px 0px 0px 0px rgba(var(--primary), 0)",
                "0px 0px 20px 0px rgba(var(--primary), 0.1)",
                "0px 0px 0px 0px rgba(var(--primary), 0)",
              ],
            }}
            className="absolute left-6 z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-primary/10 bg-background shadow-md backdrop-blur-sm md:left-10"
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Package2Icon className="h-7 w-7 text-muted-foreground/70" />
          </motion.div>

          {/* Destination Node Right */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0px 0px 0px 0px rgba(var(--primary), 0)",
                "0px 0px 20px 0px rgba(var(--primary), 0.1)",
                "0px 0px 0px 0px rgba(var(--primary), 0)",
              ],
            }}
            className="absolute right-6 z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-primary/10 bg-background shadow-md backdrop-blur-sm md:right-10"
            transition={{
              duration: 3,
              delay: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <MapPinIcon className="h-7 w-7 text-muted-foreground/70" />
          </motion.div>

          {/* Center Moving Package */}
          <motion.div
            animate={{ x: ["-35%", "35%"], y: [0, -15, 0] }}
            className="relative z-20 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-primary/30 bg-background shadow-xl backdrop-blur-md"
            transition={{
              duration: 3.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          >
            <div className="absolute inset-0 bg-primary/5" />
            <RocketIcon className="relative z-10 h-11 w-11 text-primary" />

            {/* Scanning Laser Line */}
            <motion.div
              animate={{ top: ["-10%", "110%", "-10%"] }}
              className="absolute right-0 left-0 z-20 h-[1px] w-full text-primary"
              style={{
                backgroundColor: "currentColor",
                boxShadow: "0 0 15px 1px currentColor",
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Floating Accent 1 */}
          <motion.div
            animate={{ y: [-8, 8] }}
            className="absolute top-4 left-1/3 flex h-10 w-10 items-center justify-center rounded-full border border-primary/10 bg-primary/5 backdrop-blur-md"
            transition={{
              duration: 2.2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          >
            <LightbulbIcon className="h-4 w-4 text-primary/70" />
          </motion.div>

          {/* Floating Accent 2 */}
          <motion.div
            animate={{ y: [8, -8] }}
            className="absolute right-1/3 bottom-4 flex h-12 w-12 items-center justify-center rounded-full border border-primary/10 bg-primary/5 backdrop-blur-md"
            transition={{
              duration: 2.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          >
            <TargetIcon className="h-5 w-5 text-primary/70" />
          </motion.div>
        </div>
      </div>

      <div className="lg:w-1/2">
        <h2 className="mb-3 font-extrabold text-3xl text-foreground tracking-tight md:text-4xl">
          Ready to Track?
        </h2>
        <p className="max-w-50ch] mx-auto mb-10 text-base text-muted-foreground leading-relaxed">
          Enter your AWB number above to instantly view real-time shipping
          updates, live exact locations, and delivery estimations.
        </p>
      </div>
    </motion.div>
  );
}

const NOT_FOUND_TIPS = [
  "Double-check the AWB number for typos",
  "Recent shipments might take up to 24 hours to appear in the system",
  "Contact support if the issue persists",
];

function NotFoundState() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto w-full max-w-5xl px-4 text-center md:flex md:items-center md:gap-12 md:px-6 md:text-left lg:px-8"
      exit={{ opacity: 0, y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.15 }}
    >
      <div className="shrink-0 md:w-1/2">
        {/* Custom Animated Not Found Illustration - Radar Ping */}
        <div className="relative mx-auto mb-14 flex h-56 w-full items-center justify-center overflow-hidden md:mb-0 lg:max-w-lg">
          {/* Fading Grid Background with destructive hue */}
          <div
            className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ef444415_1px,transparent_1px),linear-gradient(to_bottom,#ef444415_1px,transparent_1px)] bg-[size:24px_24px]"
            style={{
              maskImage:
                "radial-gradient(ellipse 60% 60% at 50% 50%, #000 40%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 60% 60% at 50% 50%, #000 40%, transparent 100%)",
            }}
          />

          {/* Radar Ping Rings */}
          <motion.div
            animate={{ scale: [1, 6], opacity: [0.6, 0] }}
            className="absolute z-10 h-24 w-24 rounded-full border-2 border-destructive/20"
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
            }}
          />
          <motion.div
            animate={{ scale: [1, 6], opacity: [0.6, 0] }}
            className="absolute z-10 h-24 w-24 rounded-full border-2 border-destructive/20"
            transition={{
              duration: 3,
              delay: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
            }}
          />

          {/* Floating Accent 1 (Search Failed) */}
          <motion.div
            animate={{ y: [-15, 15], x: [-10, 10], rotate: [-10, 10] }}
            className="absolute top-10 left-8 z-20 flex h-12 w-12 items-center justify-center rounded-2xl border border-destructive/10 bg-destructive/5 backdrop-blur-md md:left-16"
            transition={{
              duration: 3.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          >
            <SearchIcon className="h-5 w-5 text-destructive/60" />
          </motion.div>

          {/* Floating Accent 2 (Lost Pin) */}
          <motion.div
            animate={{ y: [15, -15], x: [10, -10], rotate: [10, -10] }}
            className="absolute right-8 bottom-10 z-20 flex h-10 w-10 items-center justify-center rounded-2xl border border-destructive/10 bg-destructive/5 backdrop-blur-md md:right-16"
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          >
            <MapPinIcon className="h-5 w-5 text-destructive/60" />
          </motion.div>

          {/* Center Missing Package / Error Node */}
          <motion.div
            animate={{ y: [-4, 4] }}
            className="relative z-30 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-destructive/30 bg-background shadow-[0_0_30px_-5px_rgba(239,68,68,0.2)] backdrop-blur-md"
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          >
            <div className="absolute inset-0 bg-destructive/5" />
            <PackageXIcon className="relative z-10 h-11 w-11 text-destructive" />
          </motion.div>
        </div>
      </div>

      <div className="lg:w-1/2">
        <h2 className="mb-3 font-extrabold text-2xl text-foreground tracking-tight md:text-3xl">
          Package Not Found
        </h2>

        <p className="mx-auto mb-10 max-w-[50ch] text-base text-muted-foreground leading-relaxed lg:mx-0">
          We couldn&apos;t find any shipment matching the AWB you entered.
          Please double check the AWB number and try again.
        </p>

        {/* Tips */}
        <div className="rounded-xl border border-border/50 bg-card/50 p-4 text-left">
          <p className="mb-3 font-semibold text-foreground text-xs uppercase tracking-wider">
            Helpful Tips
          </p>
          <ul className="space-y-2">
            {NOT_FOUND_TIPS.map((tip, index) => (
              <motion.li
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-2 text-muted-foreground text-sm"
                initial={{ opacity: 0, x: -5 }}
                key={tip}
                transition={{ duration: 0.25, delay: 0.2 + index * 0.08 }}
              >
                <InfoIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                <span>{tip}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function TrackingResult({
  order,
  events,
}: {
  order: OrderData;
  events: TrackingEvent[];
}) {
  const isLastExist = events.some((e) => e.isLastStatus);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8"
      exit={{ opacity: 0, y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.15 }}
    >
      <div className="grid grid-cols-1 items-start gap-4 md:gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Left Side: Order Info & Actions (Sticky on Desktop) */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:col-span-5">
          {/* Main Info Card */}
          <div className="overflow-hidden rounded-[2rem] border border-border/50 bg-card p-4 py-6 shadow-xs md:p-6 lg:p-8">
            <div className="flex flex-col items-center text-center">
              <span className="mb-2 font-semibold text-muted-foreground/75 text-xs uppercase tracking-widest">
                Airway Bill
              </span>
              <h2 className="mb-4 font-extrabold text-2xl text-foreground tracking-tight md:text-3xl">
                {order.awb}
              </h2>

              <div className="mb-8 flex flex-wrap items-center justify-center gap-3 text-foreground/80 text-sm">
                <span>
                  Order ID:{" "}
                  <span className="font-bold text-foreground">
                    #{order.orderId || ""}
                  </span>
                </span>
                <span className="h-3 w-px bg-border" />
                <span>
                  Vendor:{" "}
                  <span className="font-bold text-foreground">
                    {order.vendorName}
                  </span>
                </span>
              </div>

              {/* Origin & Destination */}
              <div className="flex w-full items-center justify-between gap-2">
                <div className="flex flex-col text-left">
                  <span className="mb-1 font-semibold text-[10px] text-muted-foreground/75 uppercase tracking-widest">
                    Origin
                  </span>
                  <span className="font-bold text-foreground text-sm">
                    {order.origin.split(",")[0]}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {order.origin.split(",")[1] || "Indonesia"}
                  </span>
                </div>

                <div className="relative mx-2 flex-1">
                  <div className="flex h-[2px] w-full items-center">
                    <div className="h-[2px] w-1/2 bg-primary" />
                    <div
                      className={cn(
                        "h-[2px] w-1/2",
                        isLastExist ? "bg-primary" : "bg-border"
                      )}
                    />
                  </div>
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 bg-card px-2">
                    <TruckIcon className="h-5 w-5 text-primary" />
                  </div>
                </div>

                <div className="flex flex-col text-right">
                  <span className="mb-1 font-semibold text-[10px] text-muted-foreground/75 uppercase tracking-widest">
                    Destination
                  </span>
                  <span className="font-bold text-foreground text-sm">
                    {order.destination.split(",")[0]}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {order.destination.split(",")[1] || "Indonesia"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Timeline */}
        <div className="lg:col-span-7">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-[2rem] border border-border/50 bg-card p-4 py-6 shadow-xs shadow-xs md:p-6 lg:p-8"
            initial={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15, delay: 0.2 }}
          >
            <div className="pb-8">
              <h3 className="font-bold text-muted-foreground/75 text-sm uppercase tracking-widest">
                Tracking Timeline
              </h3>
            </div>

            <div>
              {events.length > 0 ? (
                <div className="relative">
                  {events.map((event, index) => (
                    <TimelineEventRow
                      event={event}
                      index={index}
                      isLast={index === events.length - 1}
                      isLatest={index === 0}
                      key={`${event.orderId}-${event.dateTime}`}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  No shipment history available for this package.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function getTimelineStyles(isLatest: boolean) {
  if (isLatest) {
    return {
      circle: "bg-primary shadow-primary/30 shadow-sm ring-4 ring-primary/10",
      line: "bg-primary/20",
      date: "text-primary",
      time: "text-primary/80",
    };
  }
  return {
    circle: "border-2 border-primary/20 bg-muted ring-4 ring-muted",
    line: "bg-border/50",
    date: "text-muted-foreground",
    time: "text-muted-foreground/80",
  };
}

function TimelineEventRow({
  event,
  index,
  isLatest,
  isLast,
}: {
  event: TrackingEvent;
  index: number;
  isLatest: boolean;
  isLast: boolean;
}) {
  const styles = getTimelineStyles(isLatest);

  // Formatted date and time strings
  const dateStr = format(
    parse(event.dateTime, "dd/MM/yyyy HH:mm:ss", new Date()),
    "PP"
  );
  const timeStr = format(
    parse(event.dateTime, "dd/MM/yyyy HH:mm:ss", new Date()),
    "hh:mm a"
  );

  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      className="relative flex gap-6"
      initial={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2, delay: 0.1 * (index + 1) }}
    >
      {/* Timeline connector */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full",
            styles.circle
          )}
        />
        {isLast ? null : (
          <div
            className={cn("my-1 h-full w-[2px] rounded-full", styles.line)}
          />
        )}
      </div>

      {/* Event content */}
      <div
        className={cn("flex-1", {
          "pb-0": isLast,
          "pb-6 md:pb-8": !isLast,
        })}
      >
        <div className="pt-1.5">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "font-semibold text-xs tracking-wide md:text-sm",
                styles.date
              )}
            >
              {dateStr}
            </span>
            <span className="text-muted-foreground/50">&bull;</span>
            <span
              className={cn(
                "font-medium text-xs tracking-wide md:text-sm",
                styles.time
              )}
            >
              {timeStr}
            </span>
          </div>
          <p
            className={cn(
              "text-balance text-pretty text-sm leading-relaxed md:text-base",
              isLatest ? "font-medium text-foreground" : "text-muted-foreground"
            )}
          >
            {event.status}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
