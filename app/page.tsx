import Hero from "@/components/Hero";
import GlassCards from "@/components/GlassCards";
import SectionTitle from "@/components/SectionTitle";
import EventCard from "@/components/EventCard";
import events from "@/data/events.json";
import MapWrapper from "@/components/MapWrapper";
import LeadershipMessage from "@/components/LeadershipMessage";
import Carousel from "@/components/LeadershipCarousel";
import AlumniHighlights from "@/components/AlumniHighlights";

export default function Home() {
  return (
    <div>
      <Hero />
      <GlassCards />
      <section className="px-10 py-20">
<MapWrapper /></section>

<Carousel />


      {/* <section className="px-10 py-20">
        <SectionTitle title="Upcoming Events" />

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {events.slice(0, 3).map((event, i) => (
            <EventCard key={i} event={event} />
          ))}
        </div>
      </section> */}
    </div>
  );
}