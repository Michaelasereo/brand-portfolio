"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FloatingNav } from "@/components/FloatingNav";
import { useLoader } from "@/context/LoaderContext";

const SESSION_KEY = "portfolio-loader-seen";
const ROW_HEIGHT = 120;

export function PageLoader() {
  const [progress, setProgress] = useState(50);
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"idle" | "showing" | "hiding" | "gone">("idle");

  const pathname = usePathname();
  const { setLoaderDone } = useLoader();

  useEffect(() => {
    setMounted(true);
    const isHome = pathname === "/";
    const forceShow = typeof window !== "undefined" && window.location.search.includes("show-loader");
    const seen = !isHome && !forceShow && typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY);
    if (seen) {
      setLoaderDone(true);
      return;
    }
    setPhase("showing");

    const duration = 2000;
    const steps = 50;
    const interval = duration / steps;
    let current = 50;

    const timer = setInterval(() => {
      current += 1;
      setProgress(Math.min(current, 100));
      if (current >= 100) {
        clearInterval(timer);
        if (!isHome && typeof window !== "undefined") {
          sessionStorage.setItem(SESSION_KEY, "1");
        }
        setPhase("hiding");
        setTimeout(() => {
          setPhase("gone");
          setLoaderDone(true);
          if (typeof window !== "undefined") {
            window.scrollTo(0, 0);
          }
        }, 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [pathname]);

  if (!mounted || phase === "idle" || phase === "gone") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "hiding" ? 0 : 1 }}
      transition={{ duration: 0.4 }}
    >
      <FloatingNav
        activeFilter="all"
        onFilterChange={() => {}}
        counts={{}}
      />
      <div
        className="relative overflow-hidden"
        style={{ height: ROW_HEIGHT, width: "10rem" }}
      >
        <motion.div
          className="flex flex-col"
          animate={{ y: -progress * ROW_HEIGHT }}
          transition={{ type: "tween", duration: 0.1 }}
          style={{
            fontFamily: 'var(--font-main, "Helvetica Neue", Helvetica, Arial, sans-serif)',
          }}
        >
          {Array.from({ length: 101 }, (_, i) => (
            <div
              key={i}
              className="flex h-[120px] w-40 shrink-0 items-center justify-center text-6xl font-bold tabular-nums text-white sm:text-7xl md:text-8xl"
            >
              {String(i).padStart(3, "0")}
            </div>
          ))}
        </motion.div>
      </div>

      <motion.p
        className="absolute bottom-12 left-8 text-sm font-medium tracking-widest text-white/70 sm:left-12"
        style={{ fontFamily: 'var(--font-main, "Helvetica Neue", Helvetica, Arial, sans-serif)' }}
      >
        LOADING...
      </motion.p>
    </motion.div>
  );
}
