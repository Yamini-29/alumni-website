import LoginForm from "@/components/login/LoginForm";
import { GraduationCap } from "lucide-react";
export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full bg-slate-50">
      {" "}
      <section
        className="relative hidden w-[42%] max-w-md flex-col justify-between overflow-hidden px-12 py-14 lg:flex"
        style={{ backgroundColor: "#303F9F" }}
      >
        {" "}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.14) 0px, rgba(255,255,255,0.14) 1px, transparent 1px, transparent 26px)",
          }}
        />{" "}
        <div className="relative">
          {" "}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/25">
            {" "}
            <GraduationCap className="text-white" size={28} />{" "}
          </div>{" "}
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
            {" "}
            Thamarai International School{" "}
          </p>{" "}
        </div>{" "}
        <div className="relative">
          {" "}
          <h2 className="text-4xl font-bold leading-tight text-white">
            {" "}
            Alumni Admin Portal{" "}
          </h2>{" "}
          <div className="mt-5 h-1 w-16 rounded-full bg-[#C218D4]" />{" "}
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/75">
            {" "}
            A trusted, single place to manage alumni records, events, and
            outreach.{" "}
          </p>{" "}
        </div>{" "}
        <p className="relative text-xs text-white/60">
          {" "}
          Restricted to authorized staff only.{" "}
        </p>{" "}
      </section>{" "}
      <section className="flex w-full flex-1 items-center justify-center px-6 py-12">
        {" "}
        <LoginForm />{" "}
      </section>{" "}
    </main>
  );
}
