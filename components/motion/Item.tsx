"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Item({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 50,
          filter: "blur(8px)",
        },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        },
      }}
      transition={{
        duration: .7,
        ease: [0.22,1,0.36,1],
      }}
    >
      {children}
    </motion.div>
  );
}