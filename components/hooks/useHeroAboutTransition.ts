"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useHeroAboutTransition() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-bg", {
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-overlay", {
        opacity: 0.75,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        ".about-section",
        {
          y: 40,
          opacity: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-section",
            start: "top 90%",
            end: "top 40%",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);
}