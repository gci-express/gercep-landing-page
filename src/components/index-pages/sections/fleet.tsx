import { motion } from "framer-motion";
import { SectionHeading } from "../section-heading";

const fleetVehicles = [
  {
    name: "Tronton",
    capacity: "20-25 Ton",
    description: "Heavy-duty trucks for large-scale cargo transport",
    image: "🚛",
  },
  {
    name: "Fuso",
    capacity: "8-10 Ton",
    description: "Medium trucks for versatile distribution needs",
    image: "🚚",
  },
  {
    name: "CDD",
    capacity: "4-6 Ton",
    description: "Colt Diesel Double for urban and regional delivery",
    image: "🚛",
  },
  {
    name: "CDE",
    capacity: "2-3 Ton",
    description: "Colt Diesel Engkel for last-mile delivery",
    image: "🚚",
  },
  {
    name: "Blind Van",
    capacity: "1-2 Ton",
    description: "Enclosed vans for secure cargo transport",
    image: "🚐",
  },
];

export function Fleet() {
  return (
    <section className="relative overflow-hidden py-32" id="fleet">
      {/* Background */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute top-0 right-0 left-0 h-px bg-linear-to-r from-transparent via-dark-200 to-transparent" />
        <motion.div
          animate={{ x: [0, -30, 0] }}
          className="absolute top-1/3 right-0 h-[500px] w-[500px] rounded-full bg-primary-500/15 blur-[150px]"
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Our Fleet"
          description="A wide range of vehicles to handle diverse shipment volumes and customer requirements."
          title={
            <>
              Diverse Fleet for{" "}
              <span className="gradient-text">Every Need</span>
            </>
          }
        />

        {/* Fleet Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {fleetVehicles.map((vehicle, index) => (
            <motion.div
              className="group relative overflow-hidden rounded-2xl border border-dark-200 bg-white p-6 text-center shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              key={vehicle.name}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {/* Vehicle Icon */}
              <motion.div
                className="mb-4 text-6xl"
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              >
                {vehicle.image}
              </motion.div>

              <h3 className="mb-1 font-semibold text-dark-900 text-lg">
                {vehicle.name}
              </h3>
              <p className="mb-2 font-medium text-primary-400 text-sm">
                {vehicle.capacity}
              </p>
              <p className="text-dark-600 text-sm">{vehicle.description}</p>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-linear-to-t from-primary-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>

        {/* Fleet Stats */}
        <motion.div
          className="mt-16 rounded-2xl border border-dark-200 bg-linear-to-r from-white to-dark-50 p-8 shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="grid gap-8 text-center md:grid-cols-4">
            {[
              { value: "50+", label: "Total Vehicles" },
              { value: "24/7", label: "Fleet Availability" },
              { value: "GPS", label: "Real-Time Tracking" },
              { value: "100%", label: "Maintained Fleet" },
            ].map((stat, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                key={stat.label}
                transition={{ delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, scale: 1 }}
              >
                <div className="mb-2 font-bold text-3xl text-primary-400">
                  {stat.value}
                </div>
                <div className="text-dark-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
