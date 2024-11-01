import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import BlurFade from "@/components/ui/blur-fade";

interface CardProps {
  name: string;
  imageUrl: string;
}

const StackCard: React.FC<CardProps> = ({ name, imageUrl }) => {
  return (
    <motion.div
      className="relative overflow-hidden h-[50px] min-w-[50px] rounded-xl flex justify-center items-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Image src={imageUrl} alt={name} fill style={{ objectFit: "contain" }} />
    </motion.div>
  );
};

export default StackCard;
