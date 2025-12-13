/**
 * Resizable Navbar
 * base on: https://ui.aceternity.com/components/resizable-navbar
 *
 */
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import React, { type ReactNode, useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type NavbarProps = {
  children: React.ReactNode;
  className?: string;
};

type NavBodyProps = {
  children: React.ReactNode;
  className?: string;
};

type NavItemsProps = {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
};

type MobileNavProps = {
  children: React.ReactNode;
  className?: string;
};

type MobileNavHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

type MobileNavMenuProps = {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
};

const NavbarVisibilityContext = React.createContext(false);

const useNavbarVisibility = () => useContext(NavbarVisibilityContext);

export const Navbar = ({ children, className }: NavbarProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 50);
    };

    handleScroll(); // Check initial state
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <NavbarVisibilityContext.Provider value={visible}>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className={cn("sticky inset-x-0 top-0 z-40 w-full", className)}
        initial={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </NavbarVisibilityContext.Provider>
  );
};

export const NavBody = ({ children, className }: NavBodyProps) => {
  const visible = useNavbarVisibility();

  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        opacity: 1,
        scale: 1,
        width: visible ? "75%" : "100%",
        y: visible ? 20 : 0,
      }}
      className={cn(
        "container relative z-50 mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full bg-transparent p-2 lg:flex",
        visible ? "bg-background/50" : "p-4",
        className
      )}
      initial={{ opacity: 0, y: -12, scale: 0.98 }}
      style={{
        minWidth: "800px",
      }}
      transition={{
        type: "spring",
        delay: 0.15,
        stiffness: 400,
        damping: 30,
      }}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const visible = useNavbarVisibility();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 font-medium text-sm uppercase transition duration-200 lg:flex lg:space-x-2",
        visible ? "text-foreground" : "text-white",
        className
      )}
      initial={{ opacity: 0, y: -8 }}
      onMouseLeave={() => setHovered(null)}
      transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {items.map((item, idx) => (
        <a
          className="group relative px-4 py-2"
          href={item.link}
          key={`link-${item.name}-${idx}`}
          onClick={onItemClick}
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
        >
          {hovered === idx && (
            <motion.div
              className={cn(
                "absolute inset-0 h-full w-full rounded-full",
                visible ? "bg-foreground" : "bg-white"
              )}
              layoutId="hovered"
            />
          )}
          <span
            className={cn(
              "relative z-20 transition-colors",
              visible ? "group-hover:text-white" : "group-hover:text-foreground"
            )}
          >
            {item.name}
          </span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className }: MobileNavProps) => {
  const visible = useNavbarVisibility();

  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        opacity: 1,
        scale: 1,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible ? "bg-background" : "",
        className
      )}
      initial={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{
        type: "spring",
        delay: 0.2,
        stiffness: 400,
        damping: 30,
      }}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => (
  <div
    className={cn(
      "flex w-full flex-row items-center justify-between px-4",
      className
    )}
  >
    {children}
  </div>
);

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose: _,
}: MobileNavMenuProps) => (
  <AnimatePresence>
    {isOpen ? (
      <motion.div
        animate={{ opacity: 1 }}
        className={cn(
          "absolute inset-x-0 top-14 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-b-lg bg-background p-4 shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]",
          className
        )}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    ) : null}
  </AnimatePresence>
);

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  const visible = useNavbarVisibility();

  if (isOpen) {
    return (
      <X
        className={cn(visible ? "text-primary" : "text-white")}
        onClick={onClick}
      />
    );
  }

  return (
    <Menu
      className={cn(visible ? "text-primary" : "text-white")}
      onClick={onClick}
    />
  );
};

export const NavbarLogo = ({
  className,
  logo,
  title = "Gercep",
}: {
  className?: string;
  logo?: ReactNode;
  title?: string;
}) => {
  const visible = useNavbarVisibility();

  return (
    <a
      className={cn(
        "group relative z-20 mr-4 flex items-center gap-3",
        className,
        visible ? "text-foreground" : "text-white"
      )}
      href="/"
    >
      {logo || (
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary-foreground/25 bg-primary">
          <span className="font-bold text-primary-foreground text-xl">G</span>
        </div>
      )}
      <span className="font-bold text-2xl uppercase">{title}</span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      className={cn(baseStyles, variantStyles[variant], className)}
      href={href || undefined}
      {...props}
    >
      {children}
    </Tag>
  );
};
