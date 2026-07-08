import LoginForm from "@/components/login/LoginForm";
import { GraduationCap } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full bg-white">
      {/* Branding panel — desktop only */}
      <section
        className="relative hidden w-[42%] max-w-md flex-col justify-between overflow-hidden px-12 py-14 lg:flex"
        style={{ backgroundColor: "#0B1638" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(201,162,39,0.07) 0px, rgba(201,162,39,0.07) 1px, transparent 1px, transparent 26px)",
          }}
        />

        <div className="relative">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full border-2"
            style={{ borderColor: "#C9A227" }}
          >
            <GraduationCap style={{ color: "#C9A227" }} size={28} />
          </div>
          <p
            className="mt-6 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#D9B84A" }}
          >
            Thamarai International School
          </p>
        </div>

        <div className="relative">
          <h2 className="font-serif text-4xl leading-tight text-white">
            Alumni Admin
            <br />
            Portal
          </h2>
          <div
            className="mt-5 h-px w-16"
            style={{ background: "linear-gradient(to right, #C9A227, #9C1F63)" }}
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-200">
            A trusted, single place to manage alumni records, events, and outreach.
          </p>
        </div>

        <p className="relative text-xs text-slate-300">
          Restricted to authorized staff only.
        </p>
      </section>

      {/* Form panel */}
      <section className="flex w-full flex-1 items-center justify-center bg-white px-6 py-12">
        <LoginForm />
      </section>
    </main>
  );
}