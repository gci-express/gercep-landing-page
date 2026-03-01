import { motion } from "framer-motion";

export function TrackingHeader() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="text-center lg:text-left"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
    >
      <h1 className="mb-3 text-pretty font-extrabold text-4xl uppercase leading-tight md:text-5xl">
        Track and Trace <br />
        <span className="text-primary">Your Package</span>
      </h1>
      <p className="mx-auto w-full text-lg text-muted-foreground md:max-w-[40ch] lg:mx-0">
        Enter your Airway Bill (AWB) number to track your shipment status in
        real-time
      </p>
    </motion.div>
  );
}
