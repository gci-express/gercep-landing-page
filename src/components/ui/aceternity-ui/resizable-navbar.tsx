/**
 * Resizable Navbar
 * base on: https://ui.aceternity.com/components/resizable-navbar
 *
 */
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import React, { type ReactNode, useContext, useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

type NavbarProps = {
  children: React.ReactNode;
  className?: string;
};

type NavBodyProps = {
  children: React.ReactNode;
  className?: string;
};

type NavItem = {
  name: string;
  link: string;
  subItems?: { name: string; link: string }[];
};

type NavItemsProps = {
  items: NavItem[];
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
        className={cn(
          "select-none! sticky inset-x-0 top-0 z-50 w-full",
          className
        )}
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
        "container relative z-50 mx-auto hidden w-full flex-row items-center justify-between self-start rounded-2xl bg-transparent p-2 lg:flex",
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

const NavItemWithDropdown = ({
  item,
  idx,
  hovered,
  setHovered,
  visible,
  onItemClick,
}: {
  item: NavItem;
  idx: number;
  hovered: number | null;
  setHovered: (idx: number | null) => void;
  visible: boolean;
  onItemClick?: () => void;
}) => {
  const isHovered = hovered === idx;

  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem
          className="relative"
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
        >
          {isHovered ? (
            <motion.div
              className={cn("absolute inset-0 h-full w-full rounded-md")}
              layoutId="hovered"
            />
          ) : null}

          <NavigationMenuTrigger
            className={cn(
              "relative z-20 cursor-pointer rounded-md bg-transparent px-4 py-2 font-medium text-sm uppercase transition-colors hover:bg-transparent focus:bg-transparent",
              visible
                ? "text-foreground! hover:bg-primary! hover:text-primary-foreground! focus:bg-primary! focus:text-primary-foreground! data-[state=open]:bg-primary! data-[state=open]:text-primary-foreground!"
                : "text-white! hover:bg-accent! hover:text-accent-foreground! focus:bg-accent! focus:text-accent-foreground! data-[state=open]:bg-accent! data-[state=open]:text-accent-foreground!"
            )}
          >
            {item.name}
          </NavigationMenuTrigger>

          <NavigationMenuContent className="min-w-48">
            {item.subItems?.map((subItem, subIdx) => (
              <NavigationMenuLink
                asChild
                key={`sublink-${subItem.name}-${subIdx}`}
              >
                <a
                  className="block rounded-md px-4 py-2 text-sm uppercase hover:bg-accent"
                  href={subItem.link}
                  onClick={onItemClick}
                >
                  {subItem.name}
                </a>
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const NavItemLink = ({
  item,
  idx,
  hovered,
  setHovered,
  visible,
  onItemClick,
}: {
  item: NavItem;
  idx: number;
  hovered: number | null;
  setHovered: (idx: number | null) => void;
  visible: boolean;
  onItemClick?: () => void;
}) => (
  <a
    className="group relative px-4 py-2"
    href={item.link}
    onClick={onItemClick}
    onMouseEnter={() => setHovered(idx)}
    onMouseLeave={() => setHovered(null)}
  >
    {hovered === idx ? (
      <motion.div
        className={cn(
          "absolute inset-0 h-full w-full rounded-md",
          visible
            ? "bg-primary text-primary-foreground"
            : "bg-accent text-accent-foreground"
        )}
        layoutId="hovered"
      />
    ) : null}
    <span
      className={cn(
        "relative z-20 transition-colors",
        visible
          ? "group-hover:text-primary-foreground"
          : "group-hover:text-accent-foreground"
      )}
    >
      {item.name}
    </span>
  </a>
);

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
      {items.map((item, idx) => {
        const hasSubItems = Boolean(item.subItems?.length);

        if (hasSubItems) {
          return (
            <NavItemWithDropdown
              hovered={hovered}
              idx={idx}
              item={item}
              key={`nav-${item.name}-${idx}`}
              onItemClick={onItemClick}
              setHovered={setHovered}
              visible={visible}
            />
          );
        }

        return (
          <NavItemLink
            hovered={hovered}
            idx={idx}
            item={item}
            key={`link-${item.name}-${idx}`}
            onItemClick={onItemClick}
            setHovered={setHovered}
            visible={visible}
          />
        );
      })}
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
        y: 0,
      }}
      className={cn(
        "relative z-40 mx-auto flex w-full flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible ? "bg-background" : "",
        className
      )}
      initial={{ opacity: 0, y: -60, scale: 0.98 }}
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
      "z-40 flex w-full flex-row items-center justify-between px-4",
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
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "absolute inset-x-0 top-14 z-50 flex h-dvh w-full flex-col items-start justify-start gap-4 rounded-b-lg bg-background p-4 shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]",
          className
        )}
        exit={{ opacity: 0, y: -60 }}
        initial={{ opacity: 0, y: -60 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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

  return (
    <motion.button
      animate={{ scale: 1 }}
      className="relative flex items-center justify-center rounded-md p-2 transition-colors hover:bg-foreground/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      initial={{ scale: 0.95 }}
      onClick={onClick}
      type="button"
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence initial={false} mode="wait">
        {isOpen ? (
          <motion.span
            animate={{ rotate: 0, opacity: 1 }}
            className="flex"
            exit={{ rotate: 45, opacity: 0 }}
            initial={{ rotate: -45, opacity: 0 }}
            key="close-icon"
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <X
              className={cn("size-7", visible ? "text-primary" : "text-white")}
            />
          </motion.span>
        ) : (
          <motion.span
            animate={{ rotate: 0, opacity: 1 }}
            className="flex"
            exit={{ rotate: -45, opacity: 0 }}
            initial={{ rotate: 45, opacity: 0 }}
            key="menu-icon"
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Menu
              className={cn("size-7", visible ? "text-primary" : "text-white")}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export const NavbarLogo = ({
  className,
  logo,
  logoScrolled,
  title = "Gercep",
}: {
  className?: string;
  logo?: ReactNode;
  logoScrolled?: ReactNode;
  title?: string;
}) => {
  const visible = useNavbarVisibility();
  const logoContent = visible ? (logoScrolled ?? logo) : logo;

  return (
    <a
      className={cn(
        "group relative z-20 mr-4 flex items-center gap-3",
        className,
        visible ? "text-foreground" : "text-white"
      )}
      href="/"
    >
      {logoContent || (
        <>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary-foreground/25 bg-primary">
            <span className="font-bold text-primary-foreground text-xl">G</span>
          </div>

          <span className="font-bold text-2xl uppercase">{title}</span>
        </>
      )}
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
