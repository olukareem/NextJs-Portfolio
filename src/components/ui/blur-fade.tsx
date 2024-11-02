"use client";

import { AnimatePresence, motion, useInView, Variants, UseInViewOptions } from "framer-motion";
import { useRef } from "react";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variants;
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: UseInViewOptions["margin"];  // Use framer-motion's own type
  blur?: string;
}

const BlurFade = ({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
}: BlurFadeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const inViewOptions: UseInViewOptions = {
    once: true,
    margin: inViewMargin
  };

  const inViewResult = useInView(ref, inViewOptions);
  
  const isInView = !inView || inViewResult;
  
  const defaultVariants: Variants = {
    hidden: { 
      y: yOffset, 
      opacity: 0, 
      filter: `blur(${blur})` 
    },
    visible: { 
      y: -yOffset, 
      opacity: 1, 
      filter: "blur(0px)" 
    },
  };

  const combinedVariants = variant || defaultVariants;

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: "easeOut",
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default BlurFade;