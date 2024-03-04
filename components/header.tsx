"use client";

import { motion } from "framer-motion";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <div className="py-4">
      <motion.h1
        className="lg:text-5xl text-3xl font-extrabold text-center md:text-5xl"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ duration: 0.2, type: "spring", stiffness: 90 }}
      >
        {title}
      </motion.h1>
    </div>
  );
}
