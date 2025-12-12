import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CallToActionsSection() {
  return (
    <motion.div
      className="mt-20 text-center"
      initial={{ opacity: 0, y: 40 }}
      transition={{ delay: 0.4 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="inline-flex flex-col items-center gap-4 rounded-2xl border border-dark-200 bg-linear-to-r from-primary-500/10 via-white to-secondary-500/10 p-8 shadow-sm sm:flex-row">
        <div className="text-center sm:text-left">
          <h3 className="mb-2 font-bold text-2xl text-dark-900">
            Ready to optimize your logistics?
          </h3>
          <p className="text-dark-600">
            Get a free consultation and quote for your business needs.
          </p>
        </div>
        <Button className="whitespace-nowrap" size="lg">
          Get Free Quote
        </Button>
      </div>
    </motion.div>
  );
}
