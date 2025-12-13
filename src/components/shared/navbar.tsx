import { useState } from "react";
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

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <ResizableNavbar className="fixed top-3 right-0 left-0 z-50 lg:top-0">
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={NAVIGATION_ITEMS} />
        <div className="z-10 flex items-center gap-4">
          <Button
            asChild
            className="rounded-full px-8 font-bold uppercase tracking-wide"
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
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {NAVIGATION_ITEMS.map((item, idx) => (
            <a
              className="w-full py-1 font-semibold text-2xl text-foreground/75 hover:text-foreground"
              href={item.link}
              key={`mobile-link-${item.name}-${idx}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="block">{item.name}</span>
            </a>
          ))}

          <div className="mt-2 flex w-full flex-col gap-3">
            <Button
              asChild
              className="w-full uppercase"
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
          </div>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
}
