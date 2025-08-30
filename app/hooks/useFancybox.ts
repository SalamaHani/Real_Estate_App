"use client";

import { useEffect, useCallback } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export default function useFancybox() {
  const ref = useCallback((node: HTMLElement | null) => {
    if (node) {
      Fancybox.bind(node, "[data-fancybox]");
    }
  }, []);

  useEffect(() => {
    return () => {
      Fancybox.destroy();
    };
  }, []);

  return [ref] as const;
}
