"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { onIntroDone } from "@/lib/intro";

type AnimatedHeadingProps = {
  text: string;
  className?: string;
};

export function AnimatedHeading({ text, className }: AnimatedHeadingProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      // Keep the letters hidden until the intro loader has slid away.
      gsap.set(".heading-letter", { opacity: 0 });

      return onIntroDone(() => {
        gsap.fromTo(
          ".heading-letter",
          { y: "0.5em", opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
            stagger: 0.025,
            delay: 0.5,
          }
        );
      });
    },
    { scope: containerRef }
  );

  const words = text.split(" ");

  return (
    <h1 ref={containerRef} className={className} aria-label={text}>
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-block whitespace-nowrap"
          aria-hidden="true"
        >
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              className="heading-letter inline-block will-change-transform"
            >
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 && (
            <span className="heading-letter inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </h1>
  );
}
