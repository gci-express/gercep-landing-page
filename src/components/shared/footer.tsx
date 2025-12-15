import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { FOOTER_LINKS, WHATSAPP_TEXT, WHATSAPP_URL } from "@/lib/constants";
import { Button } from "../ui/button";

export default function Footer() {
  const isShow = {
    mainSocials: false,
    bottomRight: "love" as "love" | "term_and_privacy",
  };

  return (
    <footer className="-mt-10 sticky bottom-0 overflow-hidden bg-primary pt-28 pb-8 text-primary-foreground/75">
      {/* Background image overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25!"
        style={{
          backgroundImage: `url("/bg-image-footer.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 gap-12 border-primary-foreground/50 border-b pb-12 md:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-full grid grid-cols-1 gap-6 md:grid-cols-12 lg:col-span-2 lg:grid-cols-1">
            <div className="col-span-full md:col-span-6 lg:col-span-full">
              {/* Brand Column */}
              <motion.a
                className="mb-4 inline-flex items-center gap-3"
                href="/"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  alt="Gercep logo"
                  className="h-16 w-auto opacity-75"
                  height="64"
                  src="/gercep_logo_full_white.webp"
                  width="192"
                />
              </motion.a>

              <p
                className="max-w-sm text-pretty leading-relaxed"
                id="footer-heading"
              >
                Modern logistics solutions ensuring fast, reliable, and
                customer-centric services. We deliver trust and smiles.
              </p>
            </div>

            <div className="col-span-full md:col-start-10 md:col-end-13 lg:col-span-full">
              <Button
                asChild
                className="w-full opacity-85! md:w-auto"
                size="lg"
                variant="outline"
              >
                <a
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_TEXT)}`}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  Book a Demo
                  <ArrowRightIcon />
                </a>
              </Button>

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
          </div>

          {/* Services */}
          <nav aria-labelledby="footer-services-heading">
            <h4 className="mb-6 font-semibold" id="footer-services-heading">
              Services
            </h4>
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
          </nav>

          {/* Company */}
          <nav aria-labelledby="footer-company-heading">
            <h4 className="mb-6 font-semibold" id="footer-company-heading">
              Company
            </h4>
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
          </nav>

          {/* Contact */}
          <address
            aria-labelledby="footer-contact-heading"
            className="not-italic"
          >
            <h4 className="mb-6 font-semibold" id="footer-contact-heading">
              Contact
            </h4>
            <ul className="space-y-5">
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
          </address>
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
