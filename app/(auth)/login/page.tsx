import Image from "next/image";
import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full bg-[#F7F4ED]">
      {/* Left Branding Panel */}
      <section className="relative hidden w-[42%] max-w-md overflow-hidden bg-[#183B7A] px-12 py-14 lg:flex lg:flex-col lg:justify-between">
        {/* Decorative Background */}
        <div className="absolute inset-0">
          <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#D8A11C]/15 blur-3xl" />

          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(255,255,255,.25) 0px, rgba(255,255,255,.25) 1px, transparent 1px, transparent 28px)",
            }}
          />
        </div>

        {/* Logo */}
        <div className="relative">
          <div className="relative w-fit">
            <div className="absolute inset-0 rounded-full bg-[#D8A11C]/25 blur-2xl" />

            <div className="relative rounded-full bg-white p-6 shadow-2xl">
              <Image
                src="/images/tis_logo.png"
                alt="Thamarai International School"
                width={84}
                height={84}
                className="object-contain"
              />
            </div>
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-[#D8A11C]">
            Thamarai International School
          </p>
        </div>

        {/* Title */}
        <div className="relative">
          <h2 className="text-4xl font-bold leading-tight text-white">
            Alumni Admin Portal
          </h2>

          <div className="mt-5 h-1 w-20 rounded-full bg-[#D8A11C]" />

          <p className="mt-6 max-w-xs text-sm leading-7 text-white/80">
            Securely manage alumni records, reunions, announcements and school
            engagement from one centralized platform.
          </p>
        </div>

        {/* Footer */}
        <div className="relative border-t border-white/10 pt-5">
          <p className="text-xs text-white/60">
            Authorized administrators only
          </p>
        </div>
      </section>

      {/* Right Login */}
      <section className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:hidden">
            <div className="mx-auto mb-4 w-fit rounded-full bg-white p-4 shadow-lg">
              <Image
                src="/images/tis_logo.png"
                alt="School Logo"
                width={72}
                height={72}
              />
            </div>

            <h1 className="text-3xl font-bold text-[#183B7A]">
              Alumni Admin
            </h1>

            <p className="mt-2 text-slate-600">
              Thamarai International School
            </p>
          </div>

          <LoginForm />
        </div>
      </section>
    </main>
  );
}