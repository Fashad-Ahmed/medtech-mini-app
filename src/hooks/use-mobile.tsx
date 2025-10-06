import * as React from "react";

/**
 * Mobile breakpoint in pixels for responsive design
 * Matches the md breakpoint from Tailwind CSS
 */
const MOBILE_BREAKPOINT = 768;

/**
 * Custom hook that detects if the current viewport is mobile-sized.
 * Uses window.matchMedia to listen for viewport width changes.
 * @returns {boolean} True if viewport width is less than MOBILE_BREAKPOINT
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
