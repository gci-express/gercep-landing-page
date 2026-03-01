import { useStore } from "@nanostores/react";
import { motion } from "framer-motion";
import { SearchIcon } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  $awbInput,
  $isSearching,
  initializeFromUrl,
  searchAwb,
} from "./tracking-store";

export function TrackingSearchBar() {
  const awbInput = useStore($awbInput);
  const isSearching = useStore($isSearching);

  useEffect(() => {
    initializeFromUrl();
  }, []);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl shrink-0 lg:max-w-md xl:max-w-lg"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2, delay: 0.1 }}
    >
      <form
        className="relative"
        onSubmit={(e) => {
          e.preventDefault();
          searchAwb();
        }}
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="group relative flex-1">
            <SearchIcon className="-translate-y-1/2 absolute top-1/2 left-4 h-5 w-5 text-foreground/75 transition-colors group-focus-within:text-primary" />
            <Input
              className="h-14 rounded-xl border-2 border-border bg-input pl-12 font-medium text-base uppercase shadow-sm transition-all placeholder:text-foreground/60 placeholder:normal-case focus-visible:border-primary focus-visible:text-primary focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:placeholder:text-primary"
              id="awb-input"
              onChange={(e) => $awbInput.set(e.target.value.toUpperCase())}
              placeholder="Enter AWB number"
              type="text"
              value={awbInput}
            />
          </div>

          <Button
            className="hover:-translate-y-0.5 h-14 rounded-xl px-8 font-semibold text-base shadow-[0px_8px_16px_-4px] shadow-primary/40 transition-all hover:shadow-[0px_10px_20px_-4px] hover:shadow-primary/50 sm:w-auto"
            disabled={isSearching || !awbInput.trim()}
            id="track-button"
            size="lg"
            type="submit"
          >
            {isSearching ? (
              <motion.div
                animate={{ rotate: 360 }}
                className="h-5 w-5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"
                transition={{
                  duration: 0.8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            ) : (
              <span>Shipment Track</span>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
