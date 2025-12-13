import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CallToActionsSection() {
  return (
    <section className="-my-10 -z-10 relative overflow-hidden bg-primary py-32 text-center text-primary-foreground">
      {/* Background image overlay */}
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.03, 1] }}
        className="-z-20 pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("/bg-image-footer.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY }}
      />

      {/* Decorative gradients */}
      <div className="-z-20 pointer-events-none absolute inset-0">
        <motion.div
          animate={{ y: [-8, 8, -8], opacity: [0.4, 0.7, 0.4] }}
          className="-top-12 -translate-x-1/2 absolute left-1/2 h-64 w-64 rounded-full bg-background/10 blur-3xl"
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          className="absolute bottom-0 left-10 h-40 w-40 rounded-full bg-background/40 blur-3xl"
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          animate={{ x: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
          className="-right-10 absolute top-6 h-52 w-52 rounded-full bg-background/20 blur-3xl"
          transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      {/* Repeating square pattern */}
      <motion.div
        animate={{ backgroundPosition: ["0px 0px", "16px 16px", "0px 0px"] }}
        className="-z-10 pointer-events-none absolute inset-0 mx-auto max-w-7xl border border-white/15 opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY }}
      />

      <motion.div
        className="relative inline-flex flex-col items-center gap-8 border border-border/25 bg-primary p-8 text-primary-foreground shadow-none sm:flex-row"
        initial="hidden"
        transition={{ staggerChildren: 0.15 }}
        viewport={{ once: false, amount: 0.4 }}
        whileInView="show"
      >
        {/* Background image overlay */}
        <motion.div
          animate={{ opacity: [0.25, 0.45, 0.25] }}
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url("/bg-image-footer.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY }}
        />

        <motion.div
          className="text-center sm:text-left"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <h3 className="text-balance font-bold text-2xl leading-normal sm:text-pretty">
            Optimize your logistics, <br /> unlock higher profitability.
          </h3>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.5 },
            },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            className="rounded-full shadow-none"
            size="lg"
            variant="outline"
          >
            <span>Get a Quote</span>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
