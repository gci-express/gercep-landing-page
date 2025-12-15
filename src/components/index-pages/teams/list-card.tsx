import { motion, type Variants } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import { TEAMS } from "@/lib/constants";

const cardsWrapper: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -8 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

export default function ListCard() {
  return (
    <motion.div
      className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3"
      initial="hidden"
      variants={cardsWrapper}
      viewport={{ once: true, amount: 0.3 }}
      whileInView="visible"
    >
      {TEAMS.map((member, idx) => (
        <motion.div
          className="group"
          key={String(idx)}
          variants={cardVariants}
          whileHover={{ y: -12 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="relative mb-6 aspect-square overflow-hidden rounded-xl bg-muted">
            <img
              alt={member.name}
              className="h-full w-full object-cover grayscale filter transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0"
              height={512}
              // src={member.img}
              width={512}
            />
            <div className="absolute inset-0 flex items-center justify-center gap-4 bg-primary/80 opacity-0 transition-opacity duration-300 group-hover:opacity-90">
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary transition-colors hover:bg-black hover:text-white"
                type="button"
              >
                <Linkedin size={20} />
              </button>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary transition-colors hover:bg-black hover:text-white"
                type="button"
              >
                <Mail size={20} />
              </button>
            </div>
          </div>
          <h3 className="mb-1 font-bold text-2xl">{member.name}</h3>
          <p className="mb-3 font-medium text-primary text-sm uppercase tracking-wider">
            {member.role}
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {member.bio}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
