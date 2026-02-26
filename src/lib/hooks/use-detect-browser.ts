import { useEffect, useState } from "react";

type BrowserName =
  | "Chrome"
  | "Edge"
  | "Firefox"
  | "Opera"
  | "Safari"
  | "IE"
  | "Unknown";

const EDGE_REGEX = /edg/i;
const CHROME_REGEX = /chrome|crios/i;
const CHROME_EXCLUDE_REGEX = /edg|opr|opera/i;
const FIREFOX_REGEX = /firefox|fxios/i;
const OPERA_REGEX = /opr|opera/i;
const SAFARI_REGEX = /safari/i;
const SAFARI_EXCLUDE_REGEX = /chrome|crios|android/i;
const IE_REGEX = /msie|trident/i;

const detectBrowser = (userAgent: string): BrowserName => {
  if (EDGE_REGEX.test(userAgent)) {
    return "Edge";
  }
  if (CHROME_REGEX.test(userAgent) && !CHROME_EXCLUDE_REGEX.test(userAgent)) {
    return "Chrome";
  }
  if (FIREFOX_REGEX.test(userAgent)) {
    return "Firefox";
  }
  if (OPERA_REGEX.test(userAgent)) {
    return "Opera";
  }
  if (SAFARI_REGEX.test(userAgent) && !SAFARI_EXCLUDE_REGEX.test(userAgent)) {
    return "Safari";
  }
  if (IE_REGEX.test(userAgent)) {
    return "IE";
  }
  return "Unknown";
};

export function useDetectBrowser(): BrowserName {
  const [browser, setBrowser] = useState<BrowserName>("Unknown");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setBrowser(detectBrowser(window.navigator.userAgent));
  }, []);

  return browser;
}
