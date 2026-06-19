"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type AnimatedHeadingProps = {
  text: string;
  className?: string;
};

export function AnimatedHeading({ text, className }: AnimatedHeadingProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      gsap.from(".heading-letter", {
        y: "0.5em",
        opacity: 0,
        rotateX: -90,
        duration: 0.4,
        ease: "back.out(1.7)",
        stagger: 0.025,
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
