import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { DATA } from "@/data/resume";
import StackCard from "./stack-card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const CarouselSection: React.FC<{ title: string; data: any[] }> = ({
  title,
  data,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const inView = useInView(carouselRef, { once: false });
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  useEffect(() => {
    const checkScrollNeeded = () => {
      if (carouselRef.current) {
        const { scrollWidth, clientWidth } = carouselRef.current;
        setShouldScroll(scrollWidth > clientWidth);
      }
    };

    checkScrollNeeded();
    window.addEventListener("resize", checkScrollNeeded);

    return () => {
      window.removeEventListener("resize", checkScrollNeeded);
    };
  }, [data]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!shouldScroll) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current!.offsetLeft);
    setScrollLeft(carouselRef.current!.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !shouldScroll) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current!.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="py-2">
      <h3 className="text-sm font-bold">{title}</h3>
      <div
        className={`py-2 overflow-x-auto ${
          shouldScroll ? "cursor-grab active:cursor-grabbing" : ""
        }`}
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <motion.div
          className="flex gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {data.map((stack, index) => (
            <motion.div
              key={`${stack.name}-${index}`}
              variants={itemVariants}
              className="flex-shrink-0"
            >
              <HoverCard>
                <HoverCardTrigger>
                  <StackCard name={stack.name} imageUrl={stack.imageUrl} />
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">{stack.name}</h4>
                      <p className="text-sm">{stack.description}</p>
                    </div>
                    <img
                      src={stack.imageUrl}
                      alt={stack.name}
                      className="rounded-full h-12 w-12"
                    />
                  </div>
                </HoverCardContent>
              </HoverCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const StackCarousel: React.FC = () => {
  const sections = [
    { title: "Languages", data: DATA.languages },
    { title: "Frameworks", data: DATA.frameworks },
    { title: "Developer Tools", data: DATA.devTools },
    { title: "Business Tools", data: DATA.businessTools },
    // { title: "Media Tools", data: DATA.mediaTools },
  ];

  return (
    <>
      {sections.map((section, index) => (
        <CarouselSection
          key={index}
          title={section.title}
          data={section.data}
        />
      ))}
    </>
  );
};

export default StackCarousel;
