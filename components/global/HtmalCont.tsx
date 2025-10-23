"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface HTMLContentProps {
  Cont?: number | bigint;
}

export default function HTMLContent({ Cont = 0 }: HTMLContentProps) {
  const [isMounted, setIsMounted] = useState(false); // client-only mount
  const count = useMotionValue(0);
  const formatted = useTransform(count, (value) =>
    Math.round(value).toLocaleString()
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return; // only animate on client
    const duration = Math.min(Math.max(Number(Cont) / 5000, 1), 10);
    const controls = animate(count, Number(Cont), { duration });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cont, isMounted]);

  const text = {
    fontSize: "2rem",
    fontWeight: "bold",
  };

  if (!isMounted) return null; // prevent SSR render
  return <motion.pre style={text}>{formatted}</motion.pre>;
}
