"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Container from "@/components/layout/Container";
import { leaders } from "@/data/leaders";

export default function LeaderMessages() {
  const [current, setCurrent] = useState(0);

  const previous =
    (current - 1 + leaders.length) % leaders.length;

  const next =
    (current + 1) % leaders.length;

  const currentLeader = leaders[current];

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

const goNext = () => {
  setCurrent((prev) => (prev + 1) % leaders.length);
};

const goPrevious = () => {
  setCurrent((prev) =>
    prev === 0 ? leaders.length - 1 : prev - 1
  );
};

const goTo = (index: number) => {
  setCurrent(index);
};

const startAutoPlay = () => {
  if (intervalRef.current) clearInterval(intervalRef.current);

  intervalRef.current = setInterval(() => {
    goNext();
  }, 6000);
};

const stopAutoPlay = () => {
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
  }
};

useEffect(() => {
  startAutoPlay();

  return () => stopAutoPlay();
}, []);

useEffect(() => {
  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") goNext();

    if (e.key === "ArrowLeft") goPrevious();
  };

  window.addEventListener("keydown", handleKey);

  return () =>
    window.removeEventListener("keydown", handleKey);
}, []);

  return (
    <section className="relative overflow-hidden bg-white py-36">
        <div
        className="
        absolute
        left-1/2
        top-32
        h-[700px]
        w-[700px]
        -translate-x-1/2
        rounded-full
        bg-[#183B7A]/[0.03]
        blur-[140px]
        "
        />

      {/* Background blobs */}

      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#183B7A]/5 blur-3xl" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#D8A11C]/10 blur-3xl" />

      <Container>

        {/* Heading */}

        <div className="text-center">

          <p className="uppercase tracking-[0.35em] text-sm font-semibold text-[#D8A11C]">
            Leadership
          </p>

          <h2 className="mt-4 text-5xl font-bold text-[#12233D]">
            Message from Our Leaders
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Visionary leadership has always guided our institution.
            Hear from the people shaping the future of
            Thamarai International School.
          </p>

        </div>

        {/* Carousel */}

        <div
        className="relative mt-24"
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
        >

          <div className="grid items-center gap-16 lg:grid-cols-[420px_1fr]">

            {/* LEFT */}

            <div className="relative h-[560px]">

              {/* Previous Preview */}

              <div className="absolute left-0 top-10 z-0 scale-90 opacity-25 blur-[2px]">

                <Image
                  src={leaders[previous].image}
                  alt=""
                  width={260}
                  height={340}
                  className="rounded-[30px]"
                />

              </div>

              {/* <div className="absolute right-0 top-10 z-0 scale-90 opacity-25 blur-[2px]">

                <Image
                    src={leaders[next].image}
                    alt=""
                    width={260}
                    height={340}
                    className="rounded-[30px]"
                />

                </div> */}

              {/* Current */}

              <AnimatePresence mode="wait">

                <motion.div
                key={currentLeader.id}
                initial={{ opacity: 0, x: 80, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -80, scale: 0.95 }}
                transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute left-12 top-0 z-20"
                >

                <div className="relative group">

                    {/* Gold outline */}

                    <div className="absolute -left-5 -top-5 h-full w-full rounded-[34px] border border-[#D8A11C]/40 transition-all duration-700 group-hover:-translate-x-2 group-hover:-translate-y-2" />

                    {/* Blue shadow card */}

                    <div className="absolute left-4 top-4 h-full w-full rounded-[34px] bg-[#183B7A]/8 blur-sm" />

                    {/* Image */}

                    <div className="relative h-[500px] w-[380px] overflow-hidden rounded-[34px]">

                    <Image
                        src={currentLeader.image}
                        alt={currentLeader.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="380px"
                    />

                    </div>

                    {/* Floating Card */}

                    <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: .25 }}
                    className="absolute -bottom-10 left-7 rounded-3xl bg-white/90 backdrop-blur-md px-7 py-6 shadow-[0_25px_60px_rgba(24,59,122,.15)]"
                    >

                    <h3 className="font-bold text-xl text-[#183B7A]">

                        {currentLeader.name}

                    </h3>

                    <p className="mt-1 text-slate-500">

                        {currentLeader.designation}

                    </p>

                    </motion.div>

                </div>

                </motion.div>

              </AnimatePresence>

            </div>

            {/* RIGHT */}

            <div className="relative">

              {/* Huge Quote */}

              <Quote
                size={150}
                strokeWidth={1}
                className="absolute -top-10 left-0 text-[#183B7A]/7"
              />

              <AnimatePresence mode="wait">

                <motion.div
                  key={currentLeader.id}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -30,
                  }}
                  transition={{
                    duration: .45,
                  }}
                >

                  <motion.blockquote
                        initial={{ opacity:0,y:20 }}
                        animate={{ opacity:1,y:0 }}
                        exit={{ opacity:0,y:-20 }}
                        transition={{
                            delay:.15,
                            duration:.55
                        }}
                    >

                    <p className="relative max-w-2xl text-[28px] leading-[2.6rem] text-slate-700">

                    <span className="absolute -left-6 -top-4 text-7xl text-[#D8A11C]/20 select-none">
                        “
                    </span>

                    {currentLeader.message}

                    </p>

                  </motion.blockquote>

                  <div className="mt-14 h-1 w-24 rounded-full bg-[#D8A11C]" />

                  <h3 className="mt-8 text-3xl font-bold text-[#183B7A]">

                    {currentLeader.name}

                  </h3>

                  <p className="mt-2 text-lg text-slate-500">

                    {currentLeader.designation}

                  </p>

                </motion.div>

              </AnimatePresence>

            </div>

          </div>

          {/* Navigation */}

          <div className="mt-16 flex items-center justify-center gap-6">

            <button
            onClick={() => {
                stopAutoPlay();
                goPrevious();
                startAutoPlay();
            }}
            className="flex h-12 w-12 items-center justify-center rounded-full border bg-white/90 backdrop-blur-md shadow transition hover:bg-[#183B7A] hover:text-white"
            >
              <ChevronLeft />
            </button>

            <div className="flex gap-3">

              {leaders.map((_, index) => (

                <button
                key={index}
                onClick={() => {
                    stopAutoPlay();
                    goTo(index);
                    startAutoPlay();
                }}
                className={`h-3 rounded-full transition-all duration-300 ${
                    current === index
                    ? "w-12 bg-gradient-to-r from-[#183B7A] to-[#2E56A6]"
                    : "w-3 bg-slate-300 hover:bg-slate-400"
                }`}
                />

              ))}

            </div>

            <button
            onClick={() => {
                stopAutoPlay();
                goNext();
                startAutoPlay();
            }}
            className="flex h-12 w-12 items-center justify-center rounded-full border bg-white/90 backdrop-blur-md shadow transition hover:bg-[#183B7A] hover:text-white"
            >
              <ChevronRight />
            </button>

          </div>

        </div>

      </Container>

    </section>
  );
}   