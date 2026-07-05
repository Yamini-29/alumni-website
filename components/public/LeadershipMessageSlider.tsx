"use client";

const alumniVoices = [
  {
    name: "Yamini R.",
    batch: "2015",
    quote:
      "The confidence I built on that stage in school is the same confidence I walk into board meetings with today.",
  },
  {
    name: "Arjun K.",
    batch: "2012",
    quote:
      "Thamarai didn't just teach us subjects, it taught us how to ask better questions.",
  },
  {
    name: "Sneha M.",
    batch: "2018",
    quote:
      "Every teacher who pushed me back then is the reason I didn't quit during my toughest semester at university.",
  },
  {
    name: "Rahul V.",
    batch: "2009",
    quote:
      "I still use the debate skills I picked up in Class 10 in every client pitch I run.",
  },
  {
    name: "Kiran S.",
    batch: "2016",
    quote:
      "Coming back for Alumni Day feels like nothing changed, except now I'm the one giving advice to juniors.",
  },
  {
    name: "Divya P.",
    batch: "2014",
    quote:
      "The friendships from those corridors turned into my closest circle, fifteen years on.",
  },
];

// Duplicate the list once so the CSS loop from 0% to -50% is seamless.
const loop = [...alumniVoices, ...alumniVoices];

export default function AlumniVoicesMarquee() {
  return (
    <div className="marquee-mask relative w-full">
      <div className="marquee-track flex w-max gap-5 px-6">
        {loop.map((a, i) => (
          <figure
            key={`${a.name}-${i}`}
            className="w-72 shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"
          >
            <span
              aria-hidden="true"
              className="font-serif text-3xl leading-none text-[#E8B04B]/50"
            >
              &ldquo;
            </span>

            <blockquote className="-mt-3 text-sm leading-relaxed text-gray-300">
              {a.quote}
            </blockquote>

            <figcaption className="mt-4 text-sm">
              <span className="font-semibold text-white">{a.name}</span>
              <span className="text-gray-500"> · Batch of {a.batch}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <style jsx>{`
        .marquee-mask {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 8%,
            black 92%,
            transparent
          );
          mask-image: linear-gradient(
            to right,
            transparent,
            black 8%,
            black 92%,
            transparent
          );
        }

        .marquee-track {
          animation: marquee 34s linear infinite;
        }

        .marquee-mask:hover .marquee-track {
          animation-play-state: paused;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}