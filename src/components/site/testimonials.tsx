"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Star } from "lucide-react";

gsap.registerPlugin(useGSAP);

const testimonials = [
  {
    name: "Daniel Woodward",
    role: "United States · Nov 12, 2022",
    title: "I've tried many 3PLs and this is the only one I've not had issues with.",
    quote:
      "I have been using Eastern Fulfillment for about 9 months now. My account rep Jeff is the man. If I ever have questions I can ping him and I get an answer back within a few hours or less. They have helped me with the distribution for my clothing brand. Great software great customer service. I thankfully never have to look for another 3pl after this.",
  },
  {
    name: "Mikhail Untilov",
    role: "Ecuador · Feb 8, 2021",
    title: "Excellent service",
    quote:
      "It's not like working with huge 3pl where you are just a number on their stats. Eastern Fulfillment team will treat you like a family member, no matter your volumes, communication almost 24 hours, all questions and doubts are quickly resolved. Would definitely recommend Eastern Fulfillment! Thank you guys! You rock 🔥",
  },
  {
    name: "Scott Mo",
    role: "Australia · Jan 3, 2022",
    title: "Eastern Fulfillment is good, Roger is great",
    quote:
      "We've been using Eastern Fulfillment for over a year now, and they've been great to deal with. Having a trusted 3PL when your business isn't based in the US is critical, and Eastern Fulfillment has been invaluable to us. The quick communication from Roger is definitely a standout!",
  },
  {
    name: "Nando",
    role: "Indonesia · Mar 27, 2021",
    title: "The services are the best",
    quote:
      "The services are the best. I have worked with this company almost a year now, the customer service is very good. Highly recommended for all amazon seller. 👍👍",
  },
  {
    name: "David Weinhaus",
    role: "United States · Apr 27, 2021",
    title: "Eastern Fulfillment helped us put together a small...",
    quote:
      "Eastern Fulfillment helped us put together a small pkg fulfillment program, including both domestic and intl shipping, that motivated and positively impacted a ton of our partners. We seriously could not have done it without them. They were super easy to work with, timely, and responsive. Would highly recommend. Thanks guys.",
  },
  {
    name: "Vics Kaye",
    role: "Australia · Mar 30, 2021",
    title: "Eastern Fulfillment - your partner in e-commerce!",
    quote:
      "We've been partnering with Eastern Fulfillment for over a year now. As Amazon sellers, we needed a 3PL that's fast to ship, responsive & reasonably priced - and we scored the trifecta with Eastern Fulfillment! Their team on the ground in the warehouse is available directly via Whatsapp (super handy when any issues with a customer's delivery arises!!), and they go out of their way to help your business succeed. I've recommended them to two of my family members who are now using aswell. Thanks guys!! 😀",
  },
  {
    name: "Diana",
    role: "Romania · May 3, 2021",
    title: "Great Experience!",
    quote:
      "We have been collaborating with them for more than a year on several e-commerce platforms! Always willing to help us to work out the best situation and they always respond to our extra-queries on time! Definitely recommend them!",
  },
  {
    name: "Nour Hassanien",
    role: "Egypt · May 1, 2021",
    title: "We had a great experience, Highly recommended",
    quote:
      "To be honest we had a great experience with Eastern Fulfillment, they are professional, very responsive, helpful, and they have easy and good portal platform.",
  },
  {
    name: "Justin",
    role: "United States · Jun 29, 2021",
    title: "Great working with Eastern Fulfillment",
    quote:
      "Great working with Eastern Fulfillment. Communication has been fantastic. Roger does a great job. Would definitely recommend.",
  },
  {
    name: "Donald Dairo",
    role: "United Kingdom · Jan 31, 2021",
    title: "My first experience using a 3PL",
    quote:
      "My first experience using a 3PL so was a bit nervous initially. The nerves quickly disappeared after communicating with the professional and efficient staffer's who made me feel like I was in good hands. I am looking forward to a long and mutually beneficial relationship with Eastern Fulfillment and would definitely recommend them.",
  },
];

const testimonialsAlt = [
  {
    name: "Joe P",
    role: "United States · Feb 4, 2021",
    title: "Perfect & Affordable Distribution",
    quote:
      "I have been using Eastern Fulfillment for a few years now. They handle all of my distribution around the US and overseas. I would definitely recommend them if you want an accurate reliable 3pl.",
  },
  {
    name: "Selective Art LLC",
    role: "Romania · Dec 16, 2020",
    title: "They always provide the best solution for the customers",
    quote:
      "Great guys, always helpful, I worked with them for the last two years and I'm happy with their services. Fast and good service, they always provide the best solution for the customers.",
  },
  {
    name: "Léonie Bernard",
    role: "United States · Jan 18, 2021",
    title: "Tried many 3PLs but this is the best one by far.",
    quote:
      "I have tried so many fulfillment companies over the years. They are the only 3pl who feels like they actually on your team and want to help you grow. Their customer support really makes this possible. I'm very glad I found them.",
  },
  {
    name: "Anthony Dickson",
    role: "United States · Dec 21, 2020",
    title: "Eastern Fulfillment is Leading the Way",
    quote:
      "Eastern Fulfillment has managed our fulfillment services for the last several months. We had to find an alternate due to under performance of our previous vendor. They have been excellent with their responsiveness, communication, and level of service. I can't say enough about their attention to detail and suggestions to improve our operations.",
  },
  {
    name: "Rochak G",
    role: "United Kingdom · Dec 16, 2020",
    title: "Great to work with.",
    quote:
      "Been with Eastern Fulfillment for over a year now. Good prices and great support team. Small issues sometimes here and there but It would be unrealistic to expect 100% flawlessness. How Eastern Fulfillment makes up for it is by having a fast and responsive customer support team that are always there for you. They rectify the situations swiftly to the best of there abilities.",
  },
  {
    name: "David",
    role: "Australia · Jan 2, 2021",
    title: "Truly impressed with the team at Eastern Fulfillment",
    quote:
      "Truly impressed with the team at Eastern Fulfillment. I was in a spot of bother with stranded inventory at Amazon and a forced removal date which is daunting to say the least. I really appreciated them being so prompt and taking me in considering the logistic issues the USA is going through. I am on the opposite side of the USA, however communication was excellent and prompt with the use of WhatsApp. Thank you so much to you and your team. 🙏",
  },
  {
    name: "Michael Jordan",
    role: "United States · Dec 28, 2020",
    title: "The best 3PL I've used",
    quote:
      "Eastern Fulfillment has been a savior for my business. With the boom in online sales this year that put a massive strain on the logistics industry, I was having severe problems with my previous 3PL provider. I switched to Eastern Fulfillment and they simply do what they say they will, on time and correctly. Thanks guys!",
  },
  {
    name: "Edoardo Galliani",
    role: "Israel · Jan 4, 2021",
    title: "Seller on line",
    quote:
      "I started to sell on line since 4 mounts and with all the restrictions of amazon and the fact that I'm not in USA the logistic and inventory can be a big mess :) Eastern Fulfillment helped me 100% on that, and even if is a big company you get the personal contact and attention u need :) I Really recommend!",
  },
  {
    name: "John Tran",
    role: "United States · Jan 11, 2021",
    title: "Affordable & Convenient",
    quote:
      "I definitely recommend this 3PL company if you are looking to find a warehouse to store your products in safe hands. These guys go above and beyond to help their clients with their needs and will guide you every step of the way. They also have a website that makes it super easy to replenish your inventory (super simple steps btw). 100% recommend",
  },
  {
    name: "Sammy",
    role: "Singapore · Dec 15, 2020",
    title: "Great experience with this fulfilment...",
    quote:
      "Great experience with this fulfilment company. Would recommend them if you're looking for affordable rates and fast customer support.",
  },
];

const brands = [
  "Lumi Skincare",
  "Trailhead Outdoors",
  "Verde Home Goods",
  "Crate & Co.",
  "Bloom Apparel",
  "NorthPeak Supplements",
  "Petal & Press",
  "Atlas Pet Supply",
  "Saffron Kitchen",
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const trackReverseRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeReverseRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Continuous card marquees. Each row is rendered twice, so wrapping at
      // 50% is seamless. The two rows scroll in opposite directions.
      const track = trackRef.current;
      if (track) {
        gsap.fromTo(
          track,
          { xPercent: 0 },
          { xPercent: -50, ease: "none", duration: 60, repeat: -1 }
        );
      }

      const trackReverse = trackReverseRef.current;
      if (trackReverse) {
        gsap.fromTo(
          trackReverse,
          { xPercent: -50 },
          { xPercent: 0, ease: "none", duration: 60, repeat: -1 }
        );
      }

      // Full-width brand marquees. Each row is rendered twice, so wrapping at
      // 50% is seamless. The two rows scroll in opposite directions.
      const marquee = marqueeRef.current;
      if (marquee) {
        gsap.fromTo(
          marquee,
          { xPercent: 0 },
          { xPercent: -50, ease: "none", duration: 28, repeat: -1 }
        );
      }

      const marqueeReverse = marqueeReverseRef.current;
      if (marqueeReverse) {
        gsap.fromTo(
          marqueeReverse,
          { xPercent: -50 },
          { xPercent: 0, ease: "none", duration: 28, repeat: -1 }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      data-ga-view="testimonials"
      className="overflow-hidden bg-secondary/40 py-20 lg:py-28"
    >
      <div className="flex flex-col gap-10 lg:gap-14">
        <div className="container-px">
          <div className="mx-auto max-w-2xl text-center">

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by the brands we ship for
            </h2>
            <p className="mt-4 text-muted-foreground">
              From first order to peak season — faster shipping, accurate
              inventory, and fulfillment that scales with your growth.
            </p>
          </div>
        </div>

        {/* Horizontal card marquees — two rows, opposite directions */}
        <div className="flex flex-col gap-6">
          <div ref={trackRef} className="flex w-max items-stretch gap-6 pr-6">
            {[...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={`row1-${t.name}-${i}`} {...t} />
            ))}
          </div>
          <div
            ref={trackReverseRef}
            className="flex w-max items-stretch gap-6 pr-6"
          >
            {[...testimonialsAlt, ...testimonialsAlt].map((t, i) => (
              <TestimonialCard key={`row2-${t.name}-${i}`} {...t} />
            ))}
          </div>
        </div>
      </div>

      {/* Full-width brand marquee — two rotated bands, opposite directions */}
      <div className="relative mt-20 overflow-hidden py-6">
        {/* Band 1 → rotated left, scrolls left */}
        <div className="-ml-[5%] w-[110%] -rotate-2 border-y border-border/60 bg-card/60 py-5">
          <div ref={marqueeRef} className="flex w-max shrink-0">
            {[...brands, ...brands].map((brand, i) => (
              <span
                key={`row1-${brand}-${i}`}
                className="flex items-center whitespace-nowrap px-10 text-2xl font-semibold tracking-tight text-muted-foreground/70 sm:text-3xl"
              >
                {brand}
                <span className="ml-10 h-1.5 w-1.5 rounded-full bg-primary/40" />
              </span>
            ))}
          </div>
        </div>

        {/* Band 2 → rotated right, scrolls right, primary fill */}
        <div className="relative z-10 -ml-[5%] mt-8 w-[110%] rotate-2 bg-primary py-5 text-primary-foreground shadow-lg shadow-primary/20">
          <div ref={marqueeReverseRef} className="flex w-max shrink-0">
            {[...[...brands].reverse(), ...[...brands].reverse()].map(
              (brand, i) => (
                <span
                  key={`row2-${brand}-${i}`}
                  className="flex items-center whitespace-nowrap px-10 text-2xl font-semibold tracking-tight sm:text-3xl"
                >
                  {brand}
                  <span className="ml-10 h-1.5 w-1.5 rounded-full bg-primary-foreground/50" />
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  name,
  role,
  title,
  quote,
}: {
  name: string;
  role: string;
  title: string;
  quote: string;
}) {
  return (
    <figure className="flex w-[300px] flex-col rounded-2xl border border-border bg-card p-7 sm:w-[360px]">
      <div className="flex gap-0.5 text-primary">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-primary" />
        ))}
      </div>
      <div className="mt-4 text-sm font-semibold leading-snug">{title}</div>
      <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-foreground/90">
        “{quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {name.charAt(0)}
        </span>
        <div>
          <div className="text-sm font-semibold">{name}</div>
          <div className="text-xs text-muted-foreground">{role}</div>
        </div>
      </figcaption>
    </figure>
  );
}
