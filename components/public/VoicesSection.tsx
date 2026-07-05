import LeadershipMessageSlider from "@/components/public/LeadershipMessageSlider";
import AlumniVoicesMarquee from "@/components/public/AlumniVoicesMarquee";

export default function VoicesSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#05070D] via-[#070B16] to-[#05070D] py-24 text-white">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E8B04B]">
          In Their Own Words
        </p>

        <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
          Voices of Thamarai
        </h2>

        <p className="mt-3 text-gray-400">
          A message from our leadership, and a few words from the alumni
          who lived it.
        </p>
      </div>

      <div className="mt-14 px-6">
        <LeadershipMessageSlider />
      </div>

      {/* Breaks out of the centered container on purpose, so it reads as its
          own continuous strip rather than a row aligned under the slider. */}
      <div className="mt-14">
        <AlumniVoicesMarquee />
      </div>
    </section>
  );
}