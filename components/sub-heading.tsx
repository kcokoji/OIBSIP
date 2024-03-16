import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  title: string;
}

export default function SubHeading({ title }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref}>
      <motion.h2
        className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        exit={{ y: "100%", opacity: 0 }}
        transition={{
          duration: 0.2,
          type: "spring",
          stiffness: 90,
          delay: 0.3,
        }}
      >
        {title}
      </motion.h2>
    </div>
  );
}
