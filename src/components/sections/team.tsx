import { motion, type Variants } from "framer-motion";
import { AnimatedTestimonials } from "@/components/ui/aceternity-ui/animated-testimonials";
import { TEAMS } from "@/lib/constants";

const leadershipTestimonials = TEAMS.map((member) => ({
  quote: member.bio,
  name: member.name,
  designation: member.role,
  src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop",
}));

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export default function TeamSection() {
  return (
    <section
      className="relative overflow-hidden rounded-b-4xl bg-background py-32 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.25)]"
      id="team"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-background">
        <div className="grid-pattern absolute inset-0 z-10" />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          className="absolute bottom-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-secondary/75 blur-[150px]"
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.4 }}
          whileInView="visible"
        >
          <span className="mb-2 block font-bold text-primary text-sm uppercase tracking-widest">
            Leadership
          </span>
          <motion.h2
            className="font-bold font-heading text-4xl text-foreground uppercase md:text-5xl"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: "easeOut", delay: 0.1 },
              },
            }}
          >
            Meet the Board
          </motion.h2>
        </motion.div>

        <AnimatedTestimonials
          className="py-12"
          testimonials={leadershipTestimonials}
        />
      </div>
    </section>
  );
}
