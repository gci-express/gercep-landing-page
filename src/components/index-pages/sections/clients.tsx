/**
 * from component Trusted Brands Grid Layout
 * base on: https://prebuiltui.com/components/trusted-brand#trusted-brands-grid-layout-6887
 *
 */
import { motion } from "framer-motion";
import { OUR_CLIENTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const CLIENT_BORDER_CLASS: string[] = [
  "border-t-0 border-x-0 md:border-r",
  "border-t-0 border-r-0 md:border-r md:border-l-0",
  "border-t-0 border-x-0 lg:border-r",
  "border-t-0 border-r-0 md:border-l-0 md:border-r lg:border-r-0",
  "border-t-0 border-x-0 md:border-r lg:border-b-0",
  "border-t-0 border-t-0 border-r-0 md:border-l-0 lg:border-r lg:border-b-0",
  "border-y-0 border-y-0 border-x-0 md:border-r",
  "border-y-0 border-y-0 border-r-0 md:border-l-0 md:border-r lg:border-r-0",
];

const cardStagger = {
  hidden: { opacity: 0, y: 24 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.025, delay: index * 0.1 },
  }),
};

export default function ClientsSection() {
  return (
    <section
      aria-labelledby="clients-heading"
      className="-mt-5 relative overflow-hidden rounded-t-2xl bg-background py-12 md:py-24"
    >
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          viewport={{ once: false }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <p className="font-bold text-primary text-sm uppercase tracking-widest">
            Trusted Partners
          </p>
          <motion.h2
            className="mt-3 font-medium text-lg text-muted-foreground/75 leading-relaxed"
            id="clients-heading"
            layout="position"
          >
            Proudly serving leading companies across various industries
          </motion.h2>
        </motion.header>

        <div className="mx-auto mt-16 w-max">
          <motion.ul
            aria-label="List of Gercep enterprise clients"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            initial="hidden"
            role="list"
            viewport={{ once: false, amount: 0.4 }}
            whileInView="show"
          >
            {OUR_CLIENTS.map((company, index) => (
              <motion.li
                className={cn(
                  "group flex h-20 w-44 items-center justify-center border backdrop-blur md:h-24 md:w-60",
                  CLIENT_BORDER_CLASS[index] ?? "border"
                )}
                custom={index}
                key={company.name}
                variants={cardStagger}
                viewport={{ once: false }}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(0, 0, 0, 0.05)",
                }}
              >
                <span className="sr-only">{company.name}</span>
                <img
                  alt=""
                  aria-hidden
                  className={cn(
                    "h-auto max-h-14 w-auto max-w-30 object-contain opacity-75 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 max-sm:scale-75"
                  )}
                  draggable={false}
                  height={32}
                  src={company.logo}
                  width={120}
                />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
