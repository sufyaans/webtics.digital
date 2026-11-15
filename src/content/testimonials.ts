/**
 * Client testimonials, in the clients' own words (from Webtics' Google reviews and
 * messages supplied by Sufyaan). Do not edit the wording. `pull` is a short phrase lifted
 * from the quote itself, used as the heading.
 */
export type Testimonial = {
  name: string;
  company?: string;
  pull: string;
  quote: string[];
  /** Case study slug, if there is one */
  work?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Farhan Patel",
    company: "Shutter Inc",
    pull: "Turned our ideas into reality, better than we imagined.",
    work: "shutter-inc",
    quote: [
      "Working with Sufyaan and the team was an absolute pleasure from start to finish! The whole process was smooth, stress-free, and super efficient. Our weekly Zoom calls and WhatsApp chats made communication so easy, and the transparency throughout made everything feel really collaborative.",
      "I came in with zero knowledge about websites, but Sufyaan just took the reins and turned our ideas into reality—better than we imagined! His expert advice saved us from making mistakes and kept the focus exactly where it should be: on the customer experience. We didn’t have to compromise on anything!",
      "Huge thanks to Sufyaan for all your hard work, creativity, and dedication. I’ll definitely be coming back for any future projects!",
    ],
  },
  {
    name: "Rheanna Spence",
    company: "The Meetings Space",
    pull: "Smooth from start to finish.",
    work: "the-meetings-space",
    quote: [
      "We partnered with Webtics to build our website as part of a rebrand, and the experience was smooth from start to finish. One of the biggest advantages was having a single point of contact, which made communication clear and efficient. The rates were also very budget-friendly—perfect for a small business.",
      "Even after the launch, Webtics remained responsive and helpful with any questions or issues that came up. If you're a small company in need of a reliable and affordable web developer, I’d definitely recommend Webtics.",
    ],
  },
  {
    name: "Naailah",
    company: "Riayah Modest",
    pull: "I’ve been worry free.",
    quote: [
      "Started a small business and Webtics Digital designed and set up my website with care, ease and professionalism. I’ve been worry free since the service was not only affordable but comes with the guarantee that if anything goes wrong I have easy communication and round the clock support.",
      "As someone with anxiety, Sufyaan was friendly and immediately put me at ease by handling any changes I wanted with patience and a smile. I’d 10/10 recommend. I can’t wait to see how far they go.",
    ],
  },
  {
    name: "Shabana Momin",
    company: "Leicester Advice and Support Services",
    pull: "A brilliant stress-free service.",
    quote: [
      "I set up a new CIC about a year ago and just had no clue how to go about setting up the website etc. But Webtics Digital took all the stress away and gave me exactly what I wanted for my website and always there if I have any issues or questions. Thank you for a brilliant stress-free service.",
    ],
  },
  {
    name: "Anonymous",
    pull: "Professional and reliable marketing service.",
    quote: [
      "We’ve had a great experience working with Webtics Digital. They are knowledgeable, responsive, and truly understands how to drive results. From strategy to execution, they’ve supported us with creative ideas, consistent communication, and a strong focus on delivering value.",
      "Their input has helped us strengthen our brand presence and reach the right audience. Highly recommend them to any business looking for dependable digital marketing services and support.",
    ],
  },
];
