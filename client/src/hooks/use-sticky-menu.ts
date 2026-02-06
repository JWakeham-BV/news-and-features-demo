import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Make the navigation bar sticky when the user scrolls down the page.
 */
export function useStickyMenu(scopeRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: scopeRef.current,
        start: "top top+=16",
        end: "max",
        pin: true,
        pinSpacing: false,
        onEnter: () => {
          if (!scopeRef.current) return;
          scopeRef.current.setAttribute("data-sticky", "");
        },
        onLeave: () => {
          if (!scopeRef.current) return;
          scopeRef.current.removeAttribute("data-sticky");
        }
      });
    },
    { scope: scopeRef }
  );
}
