    import Image from "next/image";
    import Container from "@/components/layout/Container";
import AnimatedCounter from "./AnimatedCounter";
import FadeUp from "../motion/FadeUp";
import Stagger from "../motion/Stagger";
import Item from "../motion/Item";

    export default function AboutSection() {
    return (
        <section className=" pt-32 pb-20">
        <Container>

            {/* Heading */}
            <FadeUp>
            <div className="text-center max-w-3xl mx-auto">

            <p className="uppercase tracking-[0.35em] text-sm font-semibold text-[#D8A11C]">
                About Us
            </p>

            <h2 className="mt-2 text-4xl lg:text-[58px] font-bold text-[#12233D] leading-[1.15] tracking-[-0.03em]">
                Lifelong Connections.{" "}
                <span className="text-[#183B7A]">
                    Endless Possibilities.
                </span>
            </h2>

            <p className="mt-5 text-base lg:text-lg leading-7 text-slate-600">
                The Thamarai International School Alumni Network brings together
                graduates from every generation to celebrate achievements,
                strengthen relationships, and inspire future students through
                lifelong engagement.
            </p>

            </div>
            </FadeUp>

            {/* Vision + Logo */}
            <Stagger>
        
<div className="mt-10 grid lg:grid-cols-12 gap-12 items-center">
  {/* Left Text Column: Offset by 1 column on large screens, taking up 6 columns */}
  
  <div className="lg:col-span-6 lg:col-start-2"> 
    <h3 className="text-3xl font-bold text-[#183B7A] mb-6"> Our Vision </h3> 
    <p className="text-slate-600 leading-8"> 
      To cultivate a vibrant alumni community that continues to learn, lead, mentor and grow together while carrying forward the values of Thamarai International School. 
    </p> 
    <div className="mt-4 h-px bg-slate-200" /> 
    <h3 className="mt-6 text-3xl font-bold text-[#183B7A] mb-6"> Our Mission </h3> 
    <p className="text-slate-600 leading-8"> 
      Strengthening lifelong relationships through mentorship, networking, collaboration, reunions and opportunities that connect alumni with the school and each other. 
    </p> 
  </div> 

  {/* Right Image Column: Takes up 5 columns and pushes the content to the far right edge */} 
  <div className="lg:col-span-5 flex justify-center lg:justify-end"> 
    <div className="relative"> 
      <div className="absolute inset-0 rounded-full bg-[#D8A11C]/20 blur-3xl" /> 
      <div className="relative rounded-full bg-white border border-slate-100 shadow-2xl p-12"> 
        <Image src="/images/tis_logo.png" alt="School Logo" width={260} height={260} className="object-contain" /> 
      </div> 
    </div> 
  </div>
</div>
</Stagger>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-2">

            <div className="text-center">
                <h3 className="text-5xl font-bold text-[#183B7A]">
                    <AnimatedCounter value={4500} suffix="+" />
                </h3>
                <p className="mt-3 text-slate-500">Alumni</p>
            </div>

            <div className="text-center">
                <h3 className="text-5xl font-bold text-[#183B7A]">
                    <AnimatedCounter value={35} suffix="+" />
                </h3>
                <p className="mt-3 text-slate-500">Countries</p>
            </div>

            <div className="text-center">
                <h3 className="text-5xl font-bold text-[#183B7A]">
                    <AnimatedCounter value={120} suffix="+" />
                </h3>
                <p className="mt-3 text-slate-500">Events</p>
            </div>

            <div className="text-center">
                <h3 className="text-5xl font-bold text-[#183B7A]">
                    <AnimatedCounter value={100} suffix="%" />
                </h3>
                <p className="mt-3 text-slate-500">Connected</p>
            </div>

            </div>

        </Container>
        </section>
    );
    }