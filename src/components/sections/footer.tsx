import { motion } from "framer-motion";
import { FOOTER_LINKS } from "@/lib/constants";

export default function Footer() {
  const isShow = {
    mainSocials: false,
    bottomRight: "love" as "love" | "term_and_privacy",
  };

  return (
    <footer className="-mt-10 sticky bottom-0 overflow-hidden bg-primary pt-28 pb-8 text-primary-foreground/75">
      {/* Background image overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("/bg-image-footer.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid gap-12 border-primary-foreground/50 border-b pb-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            {/* Brand Column */}
            <motion.a
              className="mb-6 inline-flex items-center gap-3"
              href="/"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/75">
                <span className="font-bold text-primary text-xl">G</span>
              </div>
              <span className="font-bold text-2xl">GERCEP</span>
            </motion.a>

            <p className="mb-6 max-w-sm text-pretty leading-relaxed">
              Modern logistics solutions ensuring fast, reliable, and
              customer-centric services. We deliver trust and smiles.
            </p>

            {/* Socials */}
            {isShow.mainSocials ? (
              <div className="flex gap-4">
                {FOOTER_LINKS.socials.map((social, i) => (
                  <a
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/25 text-secondary transition-colors hover:bg-primary-foreground hover:text-primary"
                    href={social.href}
                    key={String(i)}
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-6 font-semibold">Services</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.label}>
                  <a
                    className="text-sm transition hover:underline hover:underline-offset-8"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-6 font-semibold">Company</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <a
                    className="text-sm transition hover:underline hover:underline-offset-8"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-6 font-semibold">Contact</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.contacts.map((link) => (
                <li className="flex items-start gap-3" key={link.label}>
                  <link.icon className="h-5 w-5 shrink-0 text-inherit opacity-75" />
                  <a
                    className="text-sm transition hover:underline hover:underline-offset-8"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 font-medium text-sm md:flex-row">
          <p className="text-sm">
            © {new Date().getFullYear()} GERCEP. All rights reserved.
          </p>

          {isShow?.bottomRight === "term_and_privacy" ? (
            <div className="flex items-center gap-6">
              <a className="transition-colors hover:text-white" href="/">
                Privacy Policy
              </a>
              <a className="transition-colors hover:text-white" href="/">
                Terms of Service
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>With</span>
              <img
                alt="love"
                className="h-4 w-auto"
                height={16}
                src="https://framerusercontent.com/images/jMMOEIjCKDiKetvP45APTGxUnX4.png"
                width={16}
              />
              <span>from JKT</span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
