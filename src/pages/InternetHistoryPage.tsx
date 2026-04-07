import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
  charcoal: "#0d0d0d",
  nearBlack: "#070707",
  green: "#00ff87",
  gold: "#ffd700",
  red: "#c0392b",
  brown: "#1a0f00",
  deepRed: "#1a0000",
  navy: "#081225",
};

type StepProps = {
  title: string;
  body: string;
  stat?: string;
  highlight?: string;
  innerRef?: (element: HTMLDivElement | null) => void;
};

function StepCard({ title, body, stat, highlight, innerRef }: StepProps) {
  return (
    <div
      ref={innerRef}
      className="rounded-xl border border-white/10 bg-black/25 p-6 opacity-100 backdrop-blur-sm"
    >
      <h3 className="mb-3 font-serif text-3xl font-bold leading-tight text-white">{title}</h3>
      <p className="whitespace-pre-line text-sm leading-relaxed text-white/80">{body}</p>
      {stat ? <p className="mt-4 font-mono text-xs uppercase tracking-wide text-white/70">{stat}</p> : null}
      {highlight ? (
        <p className="mt-3 font-semibold" style={{ color: COLORS.gold }}>
          {highlight}
        </p>
      ) : null}
    </div>
  );
}

export function InternetHistoryPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const leftRopeRef = useRef<HTMLDivElement | null>(null);
  const rightRopeRef = useRef<HTMLDivElement | null>(null);
  const leftFigureRef = useRef<HTMLDivElement | null>(null);
  const rightFigureRef = useRef<HTMLDivElement | null>(null);
  const heroHeadlineRef = useRef<HTMLHeadingElement | null>(null);
  const heroSubRef = useRef<HTMLParagraphElement | null>(null);
  const heroPromptRef = useRef<HTMLParagraphElement | null>(null);

  const era1Ref = useRef<HTMLElement | null>(null);
  const era1Steps = useRef<HTMLDivElement[]>([]);
  const era1WirePathRef = useRef<SVGPathElement | null>(null);
  const era1SilhouetteRefs = useRef<SVGImageElement[]>([]);
  const era1SilhouetteAssets = [
    "/src/assets/Il-capo-architetto.svg",
    "/src/assets/1269851278.svg",
    "/src/assets/liftarn_Silhouette_of_a_man.svg",
    "/src/assets/radacina_men_in_black_1.svg",
  ];

  const era2Ref = useRef<HTMLElement | null>(null);
  const era2Steps = useRef<HTMLDivElement[]>([]);
  const era2NeonLettersRef = useRef<SVGTextElement[]>([]);

  const onlineRef = useRef<HTMLElement | null>(null);
  const onlineTrackRef = useRef<HTMLDivElement | null>(null);

  const era3Ref = useRef<HTMLElement | null>(null);
  const era3Steps = useRef<HTMLDivElement[]>([]);
  const era3GavelRef = useRef<SVGGElement | null>(null);

  const era4Ref = useRef<HTMLElement | null>(null);
  const era4Steps = useRef<HTMLDivElement[]>([]);
  const era4BoardRowsRef = useRef<HTMLDivElement[]>([]);

  const transition1919ValueRef = useRef<HTMLParagraphElement | null>(null);
  const postPaspaSectionRef = useRef<HTMLElement | null>(null);
  const transitionPostPaspaValueRef = useRef<HTMLParagraphElement | null>(null);
  const outroRef = useRef<HTMLElement | null>(null);

  const [eraLabel, setEraLabel] = useState("A history in six eras");
  const [oddsTicker, setOddsTicker] = useState("--- vs ---   EVEN");
  const [progress, setProgress] = useState(0);
  const [slipStage, setSlipStage] = useState(0);
  const [ticketWinner, setTicketWinner] = useState(false);
  const [showCoinRain, setShowCoinRain] = useState(false);

  const coinParticles = useRef(
    Array.from({ length: 56 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      size: 12 + Math.random() * 18,
      delay: Math.random() * 1.25,
      duration: 2.6 + Math.random() * 2.4,
      drift: -52 + Math.random() * 104,
      opacity: 0.55 + Math.random() * 0.4,
    })),
  ).current;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => setProgress(self.progress),
      });
      return () => trigger.kill();
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          gsap.set([leftFigureRef.current, rightFigureRef.current], { top: -220, autoAlpha: 1 });
          gsap.set([leftRopeRef.current, rightRopeRef.current], { autoAlpha: 1, height: 0 });
          gsap.set([heroHeadlineRef.current, heroSubRef.current, heroPromptRef.current], { autoAlpha: 1 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "+=150%",
              pin: true,
              scrub: 1,
            },
          });

          tl.to(leftFigureRef.current, { top: "60vh", duration: 0.55, ease: "none" }, 0)
            .to(rightFigureRef.current, { top: "60vh", duration: 0.6, ease: "none" }, 0)
            .to(leftRopeRef.current, { height: "60vh", duration: 0.55, ease: "none" }, 0)
            .to(rightRopeRef.current, { height: "60vh", duration: 0.6, ease: "none" }, 0)
            .to([heroHeadlineRef.current, heroSubRef.current, heroPromptRef.current], { autoAlpha: 0, duration: 0.4, ease: "none" }, 0)
            .to([leftFigureRef.current, rightFigureRef.current, leftRopeRef.current, rightRopeRef.current], { autoAlpha: 0, duration: 0.4, ease: "none" }, 0.6);
        },
        "(max-width: 767px)": () => {
          gsap.set([leftFigureRef.current, rightFigureRef.current], { top: "50vh", autoAlpha: 1 });
          gsap.set([leftRopeRef.current, rightRopeRef.current], { autoAlpha: 1, height: "100%" });
          gsap.set([heroHeadlineRef.current, heroSubRef.current, heroPromptRef.current], { autoAlpha: 1 });
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = era1Ref.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
        const stepNodes = era1Steps.current;
        gsap.set(stepNodes[1], { autoAlpha: 0, y: 26, x: 32, rotate: 1.5 });
        gsap.set(stepNodes[2], { autoAlpha: 0, y: 18, x: -24, rotate: -1 });
        if (era1WirePathRef.current) {
          const len = era1WirePathRef.current.getTotalLength();
          gsap.set(era1WirePathRef.current, { strokeDasharray: len, strokeDashoffset: len });
        }
        gsap.set(era1SilhouetteRefs.current, { autoAlpha: 0, y: 14 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: "top top",
            end: "+=250%",
            onEnter: () => {
              setEraLabel("ERA 01 / THE BACK ROOM");
              setOddsTicker("1919 / World Series / ???");
              setSlipStage(1);
            },
            onEnterBack: () => {
              setEraLabel("ERA 01 / THE BACK ROOM");
              setOddsTicker("1919 / World Series / ???");
              setSlipStage(1);
            },
            onLeave: () => {
              setOddsTicker("FIXED");
            },
            onLeaveBack: () => {
              setEraLabel("A history in six eras");
            },
          },
        });

        tl.to(stepNodes[0], { autoAlpha: 1, y: 0, duration: 0.15 }, 0.02)
          .to(stepNodes[1], { autoAlpha: 1, y: 0, x: 0, rotate: 0, duration: 0.24, ease: "power2.out" }, 0.3)
          .to(era1SilhouetteRefs.current, { autoAlpha: 1, y: 0, stagger: 0.04, duration: 0.2 }, 0.38)
          .to(stepNodes[2], { autoAlpha: 1, y: 0, x: 0, rotate: 0, duration: 0.24, ease: "power2.out" }, 0.64)
          .to(era1WirePathRef.current, { strokeDashoffset: 0, duration: 0.3 }, 0.68);
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = era2Ref.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
        gsap.set(era2Steps.current[0], { autoAlpha: 0, y: 16, scale: 0.98 });
        gsap.set(era2Steps.current[1], { autoAlpha: 0, y: 12, x: 44 });
        gsap.set(era2Steps.current[2], { autoAlpha: 0, y: 20, x: -36 });
        gsap.set(era2NeonLettersRef.current, { autoAlpha: 0.2 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: "top top",
            end: "+=250%",
            onEnter: () => {
              setEraLabel("ERA 02 / VIVA LAS VEGAS");
              setOddsTicker("1950 / Las Vegas / OPEN");
              setSlipStage(2);
            },
            onEnterBack: () => {
              setEraLabel("ERA 02 / VIVA LAS VEGAS");
              setOddsTicker("1950 / Las Vegas / OPEN");
              setSlipStage(2);
            },
            onLeave: () => {
              setOddsTicker("For 4 decades, Nevada handled nearly all legal sports bets in America.");
            },
            onLeaveBack: () => {
              setEraLabel("ERA 01 / THE BACK ROOM");
              setSlipStage(1);
            },
          },
        });

        tl.to(era2NeonLettersRef.current, { autoAlpha: 1, stagger: 0.03, duration: 0.08 }, 0)
          .to(era2Steps.current[0], { autoAlpha: 1, y: 0, scale: 1, duration: 0.22, ease: "back.out(1.2)" }, 0.05)
          .to(era2Steps.current[1], { autoAlpha: 1, y: 0, x: 0, duration: 0.24, ease: "power3.out" }, 0.34)
          .to(era2Steps.current[2], { autoAlpha: 1, y: 0, x: 0, duration: 0.24, ease: "power3.out" }, 0.64);
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = onlineRef.current;
    const track = onlineTrackRef.current;
    if (!section || !track) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
        gsap.to(track, {
          x: () => -(track.scrollWidth - section.clientWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: "top top",
            end: "+=250%",
            invalidateOnRefresh: true,
            onEnter: () => {
              setEraLabel("ONLINE ERA / FROM YOUR COUCH");
              setOddsTicker("1996 → 2009 / ONLINE / LIVE");
              setSlipStage(3);
            },
            onEnterBack: () => {
              setEraLabel("ONLINE ERA / FROM YOUR COUCH");
              setOddsTicker("1996 → 2009 / ONLINE / LIVE");
              setSlipStage(3);
            },
            onLeave: () => {
              setOddsTicker("Who has the fastest data feed wins.");
            },
            onLeaveBack: () => {
              setEraLabel("ERA 02 / VIVA LAS VEGAS");
              setSlipStage(2);
            },
          },
        });
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = era3Ref.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
        gsap.set(era3Steps.current[0], { autoAlpha: 0, y: 42, filter: "blur(6px)" });
        gsap.set(era3Steps.current[1], { autoAlpha: 0, y: 18, x: 28 });
        gsap.set(era3Steps.current[2], { autoAlpha: 0, y: 18, x: -28 });
        gsap.set(era3GavelRef.current, { rotate: -18, y: -30, autoAlpha: 0.6, transformOrigin: "50% 50%" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: "top top",
            end: "+=250%",
            onEnter: () => {
              setEraLabel("ERA 03 / THE CASE THAT CHANGED EVERYTHING");
              setOddsTicker("May 14, 2018 / PASPA / STRUCK DOWN");
              setSlipStage(4);
            },
            onEnterBack: () => {
              setEraLabel("ERA 03 / THE CASE THAT CHANGED EVERYTHING");
              setOddsTicker("May 14, 2018 / PASPA / STRUCK DOWN");
              setSlipStage(4);
            },
            onLeave: () => {
              setOddsTicker("0 states → 38 states");
            },
            onLeaveBack: () => {
              setEraLabel("ONLINE ERA / FROM YOUR COUCH");
              setSlipStage(3);
            },
          },
        });

        tl.to(era3GavelRef.current, { y: 6, rotate: 0, autoAlpha: 1, duration: 0.2 }, 0.02)
          .to(era3Steps.current[0], { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.26, ease: "power2.out" }, 0.08)
          .to(era3Steps.current[1], { autoAlpha: 1, y: 0, x: 0, duration: 0.22, ease: "power2.out" }, 0.38)
          .to(era3Steps.current[2], { autoAlpha: 1, y: 0, x: 0, duration: 0.22, ease: "power2.out" }, 0.66);
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = era4Ref.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
        gsap.set(era4Steps.current[0], { autoAlpha: 0, y: 28, scale: 0.97 });
        gsap.set(era4Steps.current[1], { autoAlpha: 0, x: 36, y: 10 });
        gsap.set(era4Steps.current[2], { autoAlpha: 0, x: 36, y: 10 });
        gsap.set(era4BoardRowsRef.current, { autoAlpha: 0.3, x: -16 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: "top top",
            end: "+=250%",
            onEnter: () => {
              setEraLabel("ERA 04 / THE PLATFORM WARS");
              setOddsTicker("OFFICIAL DATA PARTNER");
              setSlipStage(5);
            },
            onEnterBack: () => {
              setEraLabel("ERA 04 / THE PLATFORM WARS");
              setOddsTicker("OFFICIAL DATA PARTNER");
              setSlipStage(5);
            },
            onLeave: () => {
              setOddsTicker("The bet paid off.");
            },
            onLeaveBack: () => {
              setEraLabel("ERA 03 / THE CASE THAT CHANGED EVERYTHING");
              setSlipStage(4);
            },
          },
        });

        tl.to(era4BoardRowsRef.current, { autoAlpha: 1, x: 0, stagger: 0.06, duration: 0.16, ease: "power1.out" }, 0.03)
          .to(era4Steps.current[0], { autoAlpha: 1, y: 0, scale: 1, duration: 0.22, ease: "back.out(1.1)" }, 0.08)
          .to(era4Steps.current[1], { autoAlpha: 1, y: 0, x: 0, duration: 0.2, ease: "power3.out" }, 0.35)
          .to(era4Steps.current[2], { autoAlpha: 1, y: 0, x: 0, duration: 0.2, ease: "power3.out" }, 0.62);
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = postPaspaSectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "+=80%",
            pin: true,
          });
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: transition1919ValueRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const value = { n: 0 };
          gsap.to(value, {
            n: 20000000,
            duration: 1.1,
            ease: "power2.out",
            onUpdate: () => {
              if (transition1919ValueRef.current) {
                transition1919ValueRef.current.textContent = `$${Math.floor(value.n).toLocaleString()}`;
              }
            },
          });
        },
      });
      ScrollTrigger.create({
        trigger: transitionPostPaspaValueRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const value = { n: 0 };
          gsap.to(value, {
            n: 119000000000,
            duration: 1.2,
            ease: "power2.out",
            onUpdate: () => {
              if (transitionPostPaspaValueRef.current) {
                transitionPostPaspaValueRef.current.textContent = `$${Math.floor(value.n).toLocaleString()}`;
              }
            },
          });
        },
      });
      ScrollTrigger.create({
        trigger: postPaspaSectionRef.current,
        start: "top 85%",
        end: "bottom 20%",
        onEnter: () => setShowCoinRain(true),
        onEnterBack: () => setShowCoinRain(true),
        onLeave: () => setShowCoinRain(false),
        onLeaveBack: () => setShowCoinRain(false),
      });
      ScrollTrigger.create({
        trigger: outroRef.current,
        start: "top 65%",
        onEnter: () => {
          setEraLabel("NEXT ERA   ???");
          setOddsTicker("NEXT ERA   ???");
          setSlipStage(6);
          setTicketWinner(true);
        },
        onEnterBack: () => {
          setEraLabel("ERA 04 / THE PLATFORM WARS");
          setOddsTicker("The bet paid off.");
          setTicketWinner(false);
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const pageStyle: React.CSSProperties = {
    backgroundColor: COLORS.charcoal,
    color: "#ffffff",
  };

  const slipRows = [
    "1919 / World Series / ???",
    "1950 / Las Vegas / OPEN",
    "2006 / UIGEA / BLOCKED",
    "2018 / PASPA / STRUCK",
    "NOW / OFFICIAL DATA PARTNER",
    ticketWinner ? "WINNER" : "PARLAY WINS",
  ];

  return (
    <div ref={rootRef} className="relative overflow-x-hidden font-sans" style={pageStyle}>
      <style>
        {`
          @keyframes coinDrop {
            0% {
              transform: translate3d(0, -130%, 0);
            }
            100% {
              transform: translate3d(var(--coin-drift), 120vh, 0);
            }
          }
          @keyframes coinSpin {
            0% {
              transform: rotateY(0deg);
              filter: brightness(0.95);
            }
            50% {
              transform: rotateY(180deg);
              filter: brightness(1.3);
            }
            100% {
              transform: rotateY(360deg);
              filter: brightness(0.95);
            }
          }
        `}
      </style>
      <div className="pointer-events-none fixed left-0 top-0 z-50 h-[2px] w-full bg-white/10">
        <div className="h-full" style={{ width: `${progress * 100}%`, backgroundColor: COLORS.green }} />
      </div>

      <div className="pointer-events-none fixed left-4 top-5 z-40 hidden md:block">
        <p className="font-mono text-xs tracking-[0.26em] text-white/70">{eraLabel}</p>
      </div>

      <div className="pointer-events-none fixed right-5 top-4 z-40 rounded border border-white/20 bg-black/35 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-white/85">
        {oddsTicker}
      </div>

      <div className="pointer-events-none fixed inset-y-0 left-8 z-30 hidden md:block">
        <div className="absolute bottom-0 top-0 w-px bg-white/20" />
        <div className="absolute bottom-0 top-0 w-px" style={{ height: `${progress * 100}%`, backgroundColor: COLORS.green }} />
        <div
          className="absolute -left-[5px] h-3 w-3 rounded-full"
          style={{
            top: `calc(${progress * 100}% - 6px)`,
            backgroundColor: COLORS.green,
            boxShadow: "0 0 15px rgba(0,255,135,0.85)",
          }}
        />
      </div>

      <div className="pointer-events-none fixed inset-y-10 right-4 z-30 hidden w-64 md:block">
        <div className="h-full rounded-md border border-white/15 bg-black/35 p-4 backdrop-blur-sm">
          <p className="mb-4 font-mono text-xs tracking-widest text-white/65">BETTING SLIP</p>
          <div className="space-y-2">
            {slipRows.map((row, idx) => (
              <div key={row} className="relative overflow-hidden rounded border border-white/10 px-2 py-1 font-mono text-[10px] tracking-wide">
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    width: `${idx < slipStage ? 100 : 0}%`,
                    background: idx === 0 ? "rgba(192,57,43,0.25)" : "rgba(0,255,135,0.18)",
                  }}
                />
                <span className="relative">{row}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-20">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="absolute font-mono text-xs"
            style={{
              left: `${(i * 13) % 100}%`,
              top: `${(i * 17) % 100}%`,
              color: i % 2 ? COLORS.green : "#ffffff",
            }}
          >
            {i % 3 === 0 ? "-110" : i % 3 === 1 ? "+3.5" : "O/U 47"}
          </span>
        ))}
      </div>

      <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
        {coinParticles.map((coin) => (
          <span
            key={coin.id}
            className="absolute block"
            style={
              {
                left: `${coin.left}%`,
                top: "-14%",
                width: `${coin.size}px`,
                height: `${coin.size}px`,
                opacity: showCoinRain ? coin.opacity : 0,
                animationName: "coinDrop",
                animationDuration: `${coin.duration}s`,
                animationDelay: `${coin.delay}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationPlayState: showCoinRain ? "running" : "paused",
                transition: "opacity 200ms ease-out",
                "--coin-drift": `${coin.drift}px`,
              } as React.CSSProperties & Record<string, string | number>
            }
          >
            <span
              className="block h-full w-full rounded-full border border-amber-100/40"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,247,206,0.95) 0%, rgba(255,215,0,0.92) 44%, rgba(178,130,0,0.95) 100%)",
                boxShadow: "0 0 10px rgba(255,215,0,0.42)",
                animationName: "coinSpin",
                animationDuration: `${Math.max(coin.duration * 0.45, 1.05)}s`,
                animationDelay: `${coin.delay}s`,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationPlayState: showCoinRain ? "running" : "paused",
              }}
            />
          </span>
        ))}
      </div>

      <section
        ref={heroRef}
        className="relative z-10 h-screen overflow-hidden"
        style={{ backgroundColor: COLORS.charcoal }}
      >
        <div
          ref={leftRopeRef}
          className="absolute top-0 z-[1] w-[2px]"
          style={{
            left: "35%",
            height: 0,
            opacity: 0,
            background: "linear-gradient(to bottom, transparent, #c9a84c 10%, #c9a84c 90%, transparent)",
          }}
        />
        <div
          ref={rightRopeRef}
          className="absolute top-0 z-[1] w-[2px]"
          style={{
            left: "65%",
            height: 0,
            opacity: 0,
            background: "linear-gradient(to bottom, transparent, #c9a84c 10%, #c9a84c 90%, transparent)",
          }}
        />

        <div
          ref={leftFigureRef}
          className="absolute z-[3]"
          style={{
            left: "calc(35% - 40px)",
            top: "-220px",
          }}
        >
          <img src="/src/assets/moneybag.svg" alt="Rappelling bettor" style={{ width: "80px" }} />
        </div>
        <div
          ref={rightFigureRef}
          className="absolute z-[3]"
          style={{
            left: "calc(65% - 40px)",
            top: "-220px",
            transform: "scaleX(-1)",
            transformOrigin: "center",
          }}
        >
          <img src="/src/assets/moneybag.svg" alt="Rappelling bettor mirrored" style={{ width: "80px" }} />
        </div>

        <div className="relative z-[2] flex h-full flex-col items-center justify-center px-6 text-center">
          <h1
            ref={heroHeadlineRef}
            className="font-serif font-black"
            style={{ color: COLORS.gold, fontSize: "clamp(48px, 8vw, 96px)" }}
          >
            The House Always Changed
          </h1>
          <p
            ref={heroSubRef}
            className="mx-auto mt-5 max-w-[600px]"
            style={{ color: "#999", fontSize: "clamp(16px, 2vw, 22px)" }}
          >
            How sports betting went from back alleys to billion dollar legitimacy
          </p>
        </div>

        <p
          ref={heroPromptRef}
          className="fixed bottom-6 left-1/2 z-[4] -translate-x-1/2 font-mono"
          style={{ color: "#666", fontSize: "14px", letterSpacing: "0.1em" }}
        >
          Scroll to begin ↓
        </p>
      </section>

      <section ref={era1Ref} className="relative z-10 min-h-screen px-6 py-16 md:px-12" style={{ backgroundColor: COLORS.brown }}>
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-black/25 p-5">
            <svg viewBox="0 0 560 420" className="h-full w-full">
              <rect x="30" y="36" width="500" height="300" rx="16" fill="#100a05" stroke="#8f6d45" strokeWidth="2" />
              <text x="72" y="95" fill="#f5e8c8" fontFamily="monospace" fontSize="24">
                NYG -3 / CHI +3
              </text>
              <path ref={era1WirePathRef} d="M62 250 C180 180 250 260 350 220 C410 195 470 245 510 214" stroke={COLORS.green} strokeWidth="3" fill="none" />
              {Array.from({ length: 8 }).map((_, i) => (
                <image
                  key={i}
                  ref={(element) => {
                    if (element) era1SilhouetteRefs.current[i] = element;
                  }}
                  href={era1SilhouetteAssets[i % era1SilhouetteAssets.length]}
                  x={58 + i * 56}
                  y="270"
                  width="40"
                  height="60"
                  style={{ filter: "brightness(0) invert(1)" }}
                  preserveAspectRatio="xMidYMid meet"
                />
              ))}
            </svg>
          </div>
          <div className="space-y-6">
            <StepCard
              innerRef={(element) => {
                if (element) era1Steps.current[0] = element;
              }}
              title="Before Vegas, there were bookmakers."
              body={
                "In the early 1900s, sports betting was everywhere and nowhere at once — illegal in most states, tolerated in practice. Bookmakers operated out of barbershops, saloons, and phone exchanges. The odds lived in a man's head and on a chalkboard."
              }
            />
            <StepCard
              innerRef={(element) => {
                if (element) era1Steps.current[1] = element;
              }}
              title="1919. The Black Sox Scandal."
              body={
                "Eight Chicago White Sox players are accused of intentionally losing the World Series in exchange for money from a gambling syndicate. Baseball is nearly destroyed. Betting goes further underground."
              }
              highlight="FIXED"
            />
            <StepCard
              innerRef={(element) => {
                if (element) era1Steps.current[2] = element;
              }}
              title="The Wire Services. Betting gets organized."
              body={
                "By the 1930s, the mob runs a national wire service delivering race results faster than radio. Bookmakers pay a subscription fee. It's the first sports data business — it just happened to be criminal."
              }
            />
          </div>
        </div>
      </section>

      <section className="relative z-10 flex min-h-[50vh] items-center justify-center px-6 py-16 text-center" style={{ backgroundColor: COLORS.deepRed }}>
        <div>
          <p ref={transition1919ValueRef} className="font-mono text-4xl font-bold md:text-6xl">
            $0
          </p>
          <p className="mt-4 max-w-xl text-sm text-white/70">
            estimated illegal bets placed on the 1919 World Series
          </p>
        </div>
      </section>

      <section ref={era2Ref} className="relative z-10 min-h-screen px-6 py-16 md:px-12" style={{ backgroundColor: COLORS.navy }}>
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-pink-400/30 bg-black/30 p-5">
            <svg viewBox="0 0 560 420" className="h-full w-full">
              <rect x="18" y="30" width="524" height="324" rx="20" fill="#09090e" stroke="#f472b6" strokeWidth="2" />
              {["S", "P", "O", "R", "T", "S", " ", "B", "O", "O", "K"].map((letter, i) => (
                <text
                  key={`${letter}-${i}`}
                  ref={(element) => {
                    if (element) era2NeonLettersRef.current[i] = element;
                  }}
                  x={58 + i * 40}
                  y="124"
                  fill="#ff4dc4"
                  fontFamily="monospace"
                  fontSize="42"
                >
                  {letter}
                </text>
              ))}
              <circle cx="150" cy="270" r="18" fill={COLORS.gold} />
              <text x="180" y="277" fill="#ffffff" fontFamily="monospace" fontSize="14">
                Nevada glows
              </text>
            </svg>
          </div>
          <div className="space-y-6">
            <StepCard
              innerRef={(element) => {
                if (element) era2Steps.current[0] = element;
              }}
              title="Nevada legalizes sports betting. 1949."
              body={
                "While the rest of America criminalizes gambling, Nevada goes the other way. The Stardust opens the first major race and sports book. For 60 years, if you wanted to bet legally, you had one option: get on a plane."
              }
            />
            <StepCard
              innerRef={(element) => {
                if (element) era2Steps.current[1] = element;
              }}
              title="The point spread changes everything."
              body={
                "Chicago math teacher Charles McNeil invents the point spread in the 1940s. Suddenly every game is theoretically 50/50. The bookmaker's edge becomes the vig — and it's genius."
              }
              stat="DAL -7 vs NYG +7   O/U 44.5"
            />
            <StepCard
              innerRef={(element) => {
                if (element) era2Steps.current[2] = element;
              }}
              title="1961. The Wire Act. The federal government draws a line."
              body={
                "JFK's DOJ, targeting the mob, passes the Interstate Wire Act — making it illegal to use wire communications for sports betting across state lines. The mob loses its wire service. Vegas tightens its monopoly."
              }
            />
          </div>
        </div>
      </section>

      <section className="relative z-10 flex min-h-[50vh] items-center justify-center px-6 py-16 text-center" style={{ backgroundColor: COLORS.nearBlack }}>
        <p className="max-w-3xl whitespace-pre-line font-mono text-lg text-white/88 md:text-3xl">
          Then came the internet.
          {"\n"}And everything the Wire Act was built to prevent
          {"\n"}— became possible from your couch.
        </p>
      </section>

      <section ref={onlineRef} className="relative z-10 min-h-screen overflow-hidden py-12" style={{ backgroundColor: COLORS.charcoal }}>
        <div ref={onlineTrackRef} className="flex h-[80vh] w-[500vw] gap-6 px-6 md:px-10">
          {[
            {
              title: "1996. The First Online Sportsbook",
              body: "A site built in Antigua takes the first legal online sports bet. The laws haven't caught up yet.",
              stat: "First bet: $50 on Green Bay Packers",
            },
            {
              title: "2006. UIGEA. The US Tries to Shut It Down.",
              body: "The Unlawful Internet Gambling Enforcement Act makes it illegal for banks to process online gambling payments. Dozens of sites exit the US market overnight.",
              stat: "32 — offshore sites that went dark in 72 hours",
            },
            {
              title: "The Offshore Era",
              body: "Bovada. BetOnline. MyBookie. American bettors don't stop — they just go offshore. Billions flow out of the US economy annually into unregulated markets.",
              stat: "$150B+ bet illegally per year in the US",
            },
            {
              title: "2009. In-Play Betting Goes Mainstream.",
              body: "European books crack live betting. Odds move in real time. Bettors can now react to what's happening on the field — mid-game, mid-drive, mid-at-bat.",
              stat: "Live betting now accounts for 70%+ of handle at major European books",
            },
            {
              title: "The data arms race begins.",
              body: "Who has the fastest data feed wins. Milliseconds matter. The sports data industry — companies like Genius Sports — is born to feed the beast.",
              stat: "Genius Sports",
            },
          ].map((panel) => (
            <article key={panel.title} className="online-panel flex h-full w-screen shrink-0 items-center justify-center">
              <div className="mx-auto grid h-full w-full max-w-5xl gap-8 rounded-2xl border border-white/10 bg-black/25 p-8 md:grid-cols-2">
                <div className="flex items-center justify-center rounded-xl border border-white/10 bg-black/30">
                  <svg viewBox="0 0 420 280" className="h-full w-full p-4">
                    <rect x="18" y="18" width="384" height="244" rx="14" fill="#101720" stroke="#3b82f6" strokeWidth="2" />
                    <path d="M40 62 H380" stroke="#0ea5e9" strokeWidth="2" />
                    <path d="M40 112 H340" stroke={COLORS.green} strokeWidth="3" />
                    <path d="M40 150 H300" stroke={COLORS.gold} strokeWidth="3" />
                    <path d="M40 188 H260" stroke="#ef4444" strokeWidth="3" />
                    <text x="42" y="90" fill="#fff" fontFamily="monospace" fontSize="14">
                      {panel.title}
                    </text>
                  </svg>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="mb-3 font-serif text-4xl font-bold">{panel.title}</h3>
                  <p className="text-sm leading-relaxed text-white/80">{panel.body}</p>
                  <p className="mt-4 font-mono text-xs uppercase tracking-wide text-white/65">{panel.stat}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section ref={era3Ref} className="relative z-10 min-h-screen overflow-hidden px-6 py-16 md:px-12" style={{ backgroundColor: "#180f0a" }}>
        <div className="relative z-10 mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-black/25 p-5">
            <svg viewBox="0 0 560 420" className="h-full w-full">
              <rect x="25" y="45" width="510" height="300" rx="12" fill="#25180d" stroke="#8c6a4f" strokeWidth="2" />
              <g ref={era3GavelRef}>
                <rect x="236" y="95" width="92" height="28" rx="7" fill="#a98f79" />
                <rect x="258" y="120" width="48" height="136" rx="10" fill="#745d48" />
                <rect x="206" y="252" width="150" height="18" rx="8" fill="#584435" />
              </g>
              <circle cx="140" cy="280" r="10" fill={COLORS.red} />
              <text x="162" y="286" fill="#fff" fontFamily="monospace" fontSize="14">
                NCAA v. Murphy — SCOTUS — 2018
              </text>
            </svg>
          </div>
          <div className="space-y-6">
            <StepCard
              innerRef={(element) => {
                if (element) era3Steps.current[0] = element;
              }}
              title="1992. PASPA passes. The federal ban is official."
              body={
                "The Professional and Amateur Sports Protection Act effectively bans sports betting in every state except Nevada, Oregon, Delaware, and Montana. The leagues lobby hard for it. They call betting an existential threat to the integrity of sport."
              }
            />
            <StepCard
              innerRef={(element) => {
                if (element) era3Steps.current[1] = element;
              }}
              title="New Jersey decides to fight."
              body={
                "2011. Governor Chris Christie signs a law legalizing sports betting in New Jersey. The NCAA and major pro leagues immediately sue. It takes 7 years. New Jersey loses twice before the Supreme Court agrees to hear it."
              }
            />
            <StepCard
              innerRef={(element) => {
                if (element) era3Steps.current[2] = element;
              }}
              title="May 14, 2018."
              body={
                "The Supreme Court strikes down PASPA 6–3. Justice Samuel Alito writes the opinion. Sports betting is not federally banned — states can decide for themselves."
              }
              stat="0 states → 38 states with legal sports betting"
            />
          </div>
        </div>
      </section>

      <section
        ref={postPaspaSectionRef}
        className="relative z-10 flex min-h-[50vh] items-center justify-center overflow-hidden px-6 py-16 text-center"
        style={{ backgroundColor: COLORS.nearBlack }}
      >
        <div className="relative z-10">
          <p ref={transitionPostPaspaValueRef} className="font-mono text-4xl font-bold md:text-6xl">
            $0
          </p>
          <p className="mt-4 text-sm text-white/70">legally wagered in the US since PASPA was struck down</p>
          <p className="mt-2 text-xs uppercase tracking-wider text-white/55">
            In 5 years, the industry went from one state to a national market.
          </p>
        </div>
      </section>

      <section ref={era4Ref} className="relative z-10 min-h-screen px-6 py-16 md:px-12" style={{ backgroundColor: "#0f1419" }}>
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-black/30 p-5">
            <div className="space-y-2">
              {["DAL -3.5  -110", "NYG +3.5  -110", "O/U 47.0  -108", "LIVE: KC -1.5  -122"].map((row, idx) => (
                <div
                  key={row}
                  ref={(element) => {
                    if (element) era4BoardRowsRef.current[idx] = element;
                  }}
                  className="rounded border border-white/10 bg-black/40 px-3 py-2 font-mono text-sm"
                >
                  {row}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <StepCard
              innerRef={(element) => {
                if (element) era4Steps.current[0] = element;
              }}
              title="DraftKings. FanDuel. The app era."
              body={
                "Daily fantasy laid the groundwork. The moment PASPA fell, the apps were ready. DraftKings and FanDuel pivot overnight. Within a year they're running Super Bowl ads."
              }
            />
            <StepCard
              innerRef={(element) => {
                if (element) era4Steps.current[1] = element;
              }}
              title="The media companies bet on betting."
              body={
                "ESPN. Fox Bet. Barstool Sportsbook. The Score. Every media company wants a piece of the handle. Broadcast rights and betting rights start to converge."
              }
            />
            <StepCard
              innerRef={(element) => {
                if (element) era4Steps.current[2] = element;
              }}
              title="Data becomes the product."
              body={
                "Real-time official data feeds. Integrity monitoring. Automated trading. The infrastructure underneath every bet placed in America is a data business. The leagues — who once sued to stop betting — now have official data partnerships."
              }
              highlight="Genius Sports"
            />
          </div>
        </div>
      </section>

      <section ref={outroRef} className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20 text-center" style={{ backgroundColor: COLORS.nearBlack }}>
        <div className="max-w-4xl">
          <h2 className="font-serif text-5xl font-black md:text-7xl">The bet paid off.</h2>
          <p className="mt-7 whitespace-pre-line text-white/80 md:text-xl">
            What took a century to legalize took five years to transform.
            {"\n"}The next chapter is being written in real time —
            {"\n"}in data feeds, live odds, and the moments that make fans lean forward.
          </p>
          <p className="mt-8 text-lg font-semibold" style={{ color: COLORS.gold }}>
            Genius Sports sits at the center of it.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button className="rounded border border-white/20 px-5 py-3 text-sm uppercase tracking-wide transition hover:bg-white/10">
              See How It Works
            </button>
            <button className="rounded px-5 py-3 text-sm uppercase tracking-wide text-black" style={{ backgroundColor: COLORS.green }}>
              Talk to Our Team
            </button>
          </div>
          <p className="mt-12 font-mono text-xs uppercase tracking-[0.3em] text-white/65">NEXT ERA   ???</p>
        </div>
      </section>
    </div>
  );
}
