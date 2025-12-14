import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  NavbarLogo,
  NavItems,
  Navbar as ResizableNavbar,
} from "@/components/ui/aceternity-ui/resizable-navbar";
import { Button } from "@/components/ui/button";
import { NAVIGATION_ITEMS, WHATSAPP_TEXT, WHATSAPP_URL } from "@/lib/constants";

const whiteLogo = (
  <img
    alt="Gercep logo"
    className="h-10 w-auto"
    height="40"
    src="/gercep_logo_full_white.webp"
    width="160"
  />
);

const greenLogo = (
  <img
    alt="Gercep logo"
    className="h-10 w-auto"
    height="40"
    src="/gercep_logo_full_green.webp"
    width="160"
  />
);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    // Skip if running on server-side
    if (typeof document === "undefined") {
      return;
    }

    const html = document.documentElement;
    const body = document.body;

    // Store original overflow values to restore later
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    // Lock scroll when menu is open, restore when closed
    if (isMobileMenuOpen) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    }

    // Cleanup: restore original overflow values on unmount
    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [isMobileMenuOpen]);

  return (
    <ResizableNavbar className="fixed top-0 right-0 left-0 z-50">
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo logo={whiteLogo} logoScrolled={greenLogo} />
        <NavItems items={NAVIGATION_ITEMS} />
        <motion.div
          className="z-10 flex items-center gap-4"
          whileTap={{ scale: 0.95 }}
        >
          <Button
            asChild
            className="rounded-md px-8 font-bold uppercase tracking-wide"
            size="lg"
          >
            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_TEXT)}`}
              rel="noreferrer noopener"
              target="_blank"
            >
              Get a Quote
            </a>
          </Button>
        </motion.div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo logo={whiteLogo} logoScrolled={greenLogo} />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          className="gap-0"
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {NAVIGATION_ITEMS.map((item, idx) => (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
              initial={{ opacity: 0, y: -16 }}
              key={`mobile-section-${item.name}-${idx}`}
              transition={{
                delay: idx * 0.075,
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.a
                className="block w-full py-4 font-semibold text-2xl text-foreground/75 hover:text-foreground"
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                whileTap={{ scale: 0.98 }}
              >
                <span className="block text-lg">{item.name}</span>
              </motion.a>

              {item.subItems?.map((subItem, subIdx) => (
                <motion.a
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-1 block w-full py-3 pl-6 text-left font-medium text-base text-foreground/75 hover:text-foreground"
                  href={subItem.link}
                  initial={{ opacity: 0, x: -12 }}
                  key={`mobile-sublink-${subItem.name}-${subIdx}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  transition={{
                    delay: 0.075 * (idx + subIdx + 1),
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {subItem.name}
                </motion.a>
              ))}
            </motion.div>
          ))}

          <motion.div
            animate={{ opacity: 1 }}
            className="mt-6 flex w-full flex-col gap-3"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              asChild
              className="w-full rounded-md uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
              size="lg"
            >
              <a
                href={`${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_TEXT)}`}
                rel="noreferrer noopener"
                target="_blank"
              >
                Get a Quote
              </a>
            </Button>
          </motion.div>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
}
