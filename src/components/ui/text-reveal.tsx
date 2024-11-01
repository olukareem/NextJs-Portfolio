"use client";

import { FC, ReactNode, useEffect, useRef } from "react";
import { motion, useAnimate, stagger } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
}

export const TextReveal: FC<TextRevealProps> = ({ text, className }) => {
  const [scope, animate] = useAnimate();
  const words = text.split(" ");

  useEffect(() => {
    animate("span", { opacity: 1 }, { duration: 1, delay: 1 });
  }, [animate]);

  return (
    <span ref={scope} className={className}>
      {words.map((word, i) => (
        <Word key={i}>{word}</Word>
      ))}
    </span>
  );
};

interface WordProps {
  children: ReactNode;
}

const Word: FC<WordProps> = ({ children }) => {
  return (
    <motion.span initial={{ opacity: 0 }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  );
};

export default TextReveal;
