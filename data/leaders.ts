export interface Leader {
  id: number;
  name: string;
  designation: string;
  image: string;
  message: string;
}

export const leaders: Leader[] = [
  {
    id: 1,
    name: "Mr. T.Venkatesan",
    designation: "Chairman",
    image: "/images/chairman.jpg",
    message:
      "Education is not merely about academic excellence—it is about nurturing individuals with integrity, compassion, and the courage to shape a better tomorrow. Our alumni embody these values, carrying the spirit of Thamarai International School wherever they go.",
  },

  {
    id: 2,
    name: "Mrs. Nirmala Venkatesan",
    designation: "Vice Chairman",
    image: "/images/vice.jpg",
    message:
      "The success of our institution is reflected in the achievements of our alumni. We remain committed to fostering innovation, lifelong learning, and meaningful relationships that continue well beyond graduation.",
  },

  {
    id: 3,
    name: "H. Jayashree Badrinath",
    designation: "Principal",
    image: "/images/principal.jpg",
    message:
      "Our alumni community represents generations of excellence and shared purpose. Together, we continue building a network that inspires collaboration, leadership, and service to society.",
  },
];