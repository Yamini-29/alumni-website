    import Image from "next/image";
    import Container from "@/components/layout/Container";

    export default function AboutSection() {
    return (
        <section className="py-16 lg:py-20">
        <Container>

            {/* Heading */}
            <div className="text-center max-w-3xl mx-auto">

            <p className="uppercase tracking-[0.35em] text-sm font-semibold text-[#D8A11C]">
                About Us
            </p>

            <h2 className="mt-5 text-5xl font-bold text-[#12233D] leading-tight">
                Lifelong Connections.
                Endless Possibilities.
            </h2>

            <p className="mt-5 text-base lg:text-lg leading-7 text-slate-600">
                The Thamarai International School Alumni Network brings together
                graduates from every generation to celebrate achievements,
                strengthen relationships, and inspire future students through
                lifelong engagement.
            </p>

            </div>

            {/* Vision + Logo */}
            <div className="mt-14 grid lg:grid-cols-2 gap-20 items-center">

            {/* Left */}
            <div>

                <h3 className="text-3xl font-bold text-[#183B7A] mb-6">
                Our Vision
                </h3>

                <p className="text-slate-600 leading-8">
                To cultivate a vibrant alumni community that continues to learn,
                lead, mentor and grow together while carrying forward the values
                of Thamarai International School.
                </p>

                <div className="mt-10 h-px bg-slate-200" />

                <h3 className="mt-10 text-3xl font-bold text-[#183B7A] mb-6">
                Our Mission
                </h3>

                <p className="text-slate-600 leading-8">
                Strengthening lifelong relationships through mentorship,
                networking, collaboration, reunions and opportunities that
                connect alumni with the school and each other.
                </p>

            </div>

            {/* Right */}
            <div className="flex justify-center">

                <div className="relative">

                <div className="absolute inset-0 rounded-full bg-[#D8A11C]/20 blur-3xl" />

                <div className="relative rounded-full bg-white border border-slate-100 shadow-2xl p-12">

                    <Image
                    src="/images/tis_logo.png"
                    alt="School Logo"
                    width={260}
                    height={260}
                    className="object-contain"
                    />

                </div>

                </div>

            </div>

            </div>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-10">

            <div className="text-center">
                <h3 className="text-5xl font-bold text-[#183B7A]">4500+</h3>
                <p className="mt-3 text-slate-500">Alumni</p>
            </div>

            <div className="text-center">
                <h3 className="text-5xl font-bold text-[#183B7A]">35+</h3>
                <p className="mt-3 text-slate-500">Countries</p>
            </div>

            <div className="text-center">
                <h3 className="text-5xl font-bold text-[#183B7A]">120+</h3>
                <p className="mt-3 text-slate-500">Events</p>
            </div>

            <div className="text-center">
                <h3 className="text-5xl font-bold text-[#183B7A]">100%</h3>
                <p className="mt-3 text-slate-500">Connected</p>
            </div>

            </div>

        </Container>
        </section>
    );
    }