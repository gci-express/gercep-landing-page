import { motion } from "framer-motion";
import TeamCard from "@/components/ui/aceternity-ui/team-card";
import { TEAMS } from "@/lib/constants";
import { SectionHeading } from "../section-heading";

const leadershipTestimonials = TEAMS.map((member) => ({
  quote: member.bio,
  name: member.name,
  designation: member.role,
  src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop",
  email: member.email,
  phone: member.phone,
}));

export default function TeamSection() {
  return (
    <section
      aria-labelledby="team-heading"
      className="relative overflow-hidden rounded-4xl bg-background py-12 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.5),0_-30px_60px_-40px_rgba(15,23,42,0.5)] md:py-24"
    >
      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-background"
        role="presentation"
      >
        <div className="grid-pattern absolute inset-0 z-10" />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          className="absolute bottom-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-secondary/75 blur-[150px]"
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Leadership"
          className="max-w-xl"
          title={
            <>
              Meet the <span className="text-primary">Board</span>
            </>
          }
          titleId="team-heading"
        />

        <TeamCard
          className="py-0 pt-12 md:py-12"
          testimonials={leadershipTestimonials}
        />
      </div>
    </section>
  );
}
