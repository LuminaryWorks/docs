import { useEffect } from "react";

/**
 * Ensure absolute http(s) links open in a new tab, including raw HTML anchors
 * that bypass the MDX Link component.
 */
export default function ExternalLinkGuard() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (!(href.startsWith("http://") || href.startsWith("https://"))) return;

      // Keep same-origin navigations in-tab (relative site routes already use /path).
      try {
        const url = new URL(href, window.location.href);
        if (url.origin === window.location.origin) return;
      } catch {
        return;
      }

      if (anchor.target !== "_blank") {
        anchor.target = "_blank";
      }
      const rel = new Set((anchor.rel || "").split(/\s+/).filter(Boolean));
      rel.add("noopener");
      rel.add("noreferrer");
      anchor.rel = [...rel].join(" ");
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
