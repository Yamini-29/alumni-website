import Hero from "@/components/public/Hero";
import GlassCards from "@/components/public/GlassCards";
import SectionTitle from "@/components/public/SectionTitle";
import EventCard from "@/components/public/EventCard";
import events from "@/data/events.json";
import MapWrapper from "@/components/public/MapWrapper";
import LeadershipMessage from "@/components/public/LeadershipMessage";
import Carousel from "@/components/public/LeadershipCarousel";
import AlumniHighlights from "@/components/public/AlumniHighlights";
import AboutSection from "@/components/public/AboutSection";
import Container from "@/components/layout/Container";
import LeaderMessages from "@/components/public/LeaderMessages";

export default function Home() {
  return (
    <div>
      <Hero />
      <GlassCards />

      <AboutSection />

      <LeaderMessages />
        <Container >
          <MapWrapper />
        </Container>




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