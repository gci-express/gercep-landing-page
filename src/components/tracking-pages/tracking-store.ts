import { atom } from "nanostores";
import {
  fetchTrackingData,
  type OrderData,
  type TrackingEvent,
} from "@/lib/tracking-pages/tracking-data";

const TRACKING_PATH_REGEX = /^\/tracking\/(.+)$/;
const isBrowser = typeof window !== "undefined";

export const $awbInput = atom("");
export const $order = atom<OrderData | null>(null);
export const $events = atom<TrackingEvent[]>([]);
export const $searched = atom(false);
export const $isSearching = atom(false);

export async function searchAwb(simulateDelay = true) {
  const awb = $awbInput.get().trim();
  if (!awb) {
    return;
  }

  $isSearching.set(true);

  const performSearch = async () => {
    const { order, events } = await fetchTrackingData(awb);

    $order.set(order);
    $events.set(events);
    $searched.set(true);
    $isSearching.set(false);

    // Update URL to reflect the searched AWB
    if (isBrowser) {
      const targetPath = `/tracking/${encodeURIComponent(awb)}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState(null, "", targetPath);
      }
    }
  };

  if (simulateDelay) {
    // Add artificial delay for UX
    // combined with the actual fetch time, or just setTimeout before fetch.
    setTimeout(performSearch, 250);
  } else {
    // We already have network latency, so no need for extra delay on initial load
    await performSearch();
  }
}

/** Read AWB from URL path on mount and auto-search if present */
export function initializeFromUrl() {
  if (!isBrowser) {
    return;
  }
  const match = window.location.pathname.match(TRACKING_PATH_REGEX);
  if (match) {
    const awb = decodeURIComponent(match[1]);
    if ($awbInput.get() !== awb || !$searched.get()) {
      $awbInput.set(awb);
      searchAwb(false);
    }
  }
}
