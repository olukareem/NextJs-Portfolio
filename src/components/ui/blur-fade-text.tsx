"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useMemo, ReactNode } from "react";

interface BlurFadeTextProps {
  text: string | ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  characterDelay?: number;
  delay?: number;
  yOffset?: number;
  animateByCharacter?: boolean;
  renderAsChild?: boolean;
}

const BlurFadeText = ({
  text,
  className,
  variant,
  characterDelay = 0.03,
  delay = 0,
  yOffset = 8,
  animateByCharacter = false,
  renderAsChild = false,
}: BlurFadeTextProps) => {
  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: "blur(8px)" },
    visible: { y: -yOffset, opacity: 1, filter: "blur(0px)" },
  };
  const combinedVariants = variant || defaultVariants;
  const characters = useMemo(() => typeof text === 'string' ? Array.from(text) : [], [text]);

  if (renderAsChild) {
    return (
      <motion.span
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={combinedVariants}
        transition={{
          yoyo: Infinity,
          delay,
          ease: "easeOut",
        }}
        className={cn("inline-block", className)}
      >
        {text}
      </motion.span>
    );
  }

  if (animateByCharacter && typeof text === 'string') {
    return (
      <>
        <AnimatePresence>
          {characters.map((char, i) => (
            <motion.span
              key={i}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={combinedVariants}
              transition={{
                yoyo: Infinity,
                delay: delay + i * characterDelay,
                ease: "easeOut",
              }}
              className={cn("inline-block", className)}
              style={{ width: char.trim() === "" ? "0.2em" : "auto" }}
            >
              {char}
            </motion.span>
          ))}
        </AnimatePresence>
      </>
    );
  }

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={combinedVariants}
      transition={{
        yoyo: Infinity,
        delay,
        ease: "easeOut",
      }}
      className={cn("inline-block", className)}
    >
      {text}
    </motion.span>
  );
};

export default BlurFadeText;