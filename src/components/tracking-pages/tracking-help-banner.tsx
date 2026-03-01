import { ArrowRightCircleIcon, HeadsetIcon } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";
import { Button } from "../ui/button";

export function TrackingHelpBanner() {
  return (
    <a
      className="group mx-auto flex w-full max-w-sm items-center gap-4 rounded-3xl border border-primary/25 bg-primary/10 p-3 px-4 shadow-xs transition-all hover:bg-primary/15 hover:shadow active:scale-[0.98]"
      href={WHATSAPP_URL}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-background transition-transform group-hover:scale-105">
        <HeadsetIcon className="h-6 w-6 text-primary" />
      </div>

      <div className="flex flex-col">
        <span className="font-bold text-foreground text-sm leading-tight">
          Need help?
        </span>
        <span className="text-pretty text-foreground/75 text-sm leading-snug">
          Contact our support line for assistance.
        </span>
      </div>

      <div className="ml-auto">
        <Button className="rounded-full" size="icon-lg" variant="ghost">
          <ArrowRightCircleIcon className="size-6 text-primary" />
        </Button>
      </div>
    </a>
  );
}
