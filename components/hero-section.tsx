"use client";

import React from "react";
import Container from "./container";
import { motion } from "framer-motion";

import Image from "next/image";

export default function HeroSection() {
  return (
    <Container className="flex flex-col items-center bg-[#f2eddc] flex-grow">
      <div className="flex justify-center flex-col items-center relative space-y-4">
        <div className="py-8 space-y-2">
          <motion.h1
            className="lg:text-6xl text-3xl font-extrabold text-center md:text-5xl"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 90 }}
          >
            Savor the Moment,
          </motion.h1>
          <motion.h1
            className="lg:text-6xl text-3xl font-extrabold text-center md:text-5xl"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 90,
              delay: 0.5,
            }}
          >
            Taste the <span className="text-primary">Perfection.</span>
          </motion.h1>
        </div>
        {/* 
        <Button size="lg">Order Now</Button> */}

        {/* <motion.div
        // animate={{ rotate: 180 }}
        // transition={{
        //   duration: 10,
        //   ease: "linear",
        //   repeat: Infinity,
        // }}
        > */}
        <Image
          src="/img/pizza.png"
          width={400}
          height={400}
          className="w-fit h-fit rounded-full shadow-[0px_0px_20px_6px_#00000024] shadow-primary"
          alt="hero-image"
          priority
        />
        {/* </motion.div> */}

        {/* <Image
          src="/img/leaf.png"
          width={500}
          height={500}
          className="w-fit h-fit bg-red absolute top-2 left-1    rotate-180"
          alt="leaf"
          priority
        /> */}
        {/* <div className="lg:block hidden">
          <Image
            src="/img/leaf.png"
            width={500}
            height={500}
            className="w-fit h-fit bg-red absolute  bottom-3 right-0 -z"
            alt="leaf"
            priority
          />
        </div> */}
        {/* <div className="">
          <Image
            src="/img/leaf.png"
            width={500}
            height={500}
            className="w-fit h-fit absolute  -bottom-20 -right-3 "
            alt="leaf"
            priority
          />
        </div> */}
      </div>
    </Container>
  );
}
