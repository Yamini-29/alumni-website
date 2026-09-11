"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Stagger({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <motion.div
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.12,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
    >
      {children}
    </motion.div>
  );
}