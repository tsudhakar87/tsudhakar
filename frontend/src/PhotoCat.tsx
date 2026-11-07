import { useEffect, useRef, useState } from "react";
import "./PhotoCat.css";

// palette
const FUR = "#f4a04a";
const STRIPE = "#d97a2b";
const EYE = "#1f1714";
const PINK = "#ffb3ba";

// solid silhouette, sitting on the frame line (y = 200); viewBox is "18 20 200 218"
const HEAD =
  "M66 30 C72 34 76 40 80 44 Q92 41 104 44 C108 40 112 34 118 30 C121 40 119 50 120 60 " +
  "C123 74 117 88 104 94 Q92 98 80 94 C67 88 61 74 64 60 C65 50 63 40 66 30 Z";
const BODY =
  "M78 86 C73 98 69 106 69 118 C69 134 77 148 79 168 C80 178 80 186 80 192 " +
  "L76 192 C67 192 66 200 74 200 L152 200 C160 200 164 192 163 180 " +
  "C162 150 150 118 126 106 C116 101 110 96 108 86 Z";
const TAIL = "M156 190 C176 192 183 204 179 217 C176 228 167 232 161 226";

// head / face anchor points in viewBox coords
const VB = { x: 18, y: 20, w: 200, h: 218 };
const FACE = { x: 92, y: 70 };
const NECK = { x: 92, y: 92 };

const PAW_INTERVAL_MS = 45_000; // min gap between swipes (and before the first one)
const PAW_DURATION_MS = 2500;
const PAW_IDLE_MS = 10_000; // only swipe once the visitor hasn't scrolled/typed for this long
const PAW_MAX_PER_VISIT = 3;

type Point = { x: number; y: number };

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// tapered stripe: wide end (width w) at a, pointed tip at b, bowed slightly to one side
type Wedge = [ax: number, ay: number, bx: number, by: number, w: number];
function wedgePath([ax, ay, bx, by, w]: Wedge) {
  const len = Math.hypot(bx - ax, by - ay) || 1;
  const nx = (-(by - ay) / len) * (w / 2);
  const ny = ((bx - ax) / len) * (w / 2);
  const mx = (ax + bx) / 2 + nx * 0.6;
  const my = (ay + by) / 2 + ny * 0.6;
  return `M${ax + nx} ${ay + ny} Q${mx + nx * 0.5} ${my + ny * 0.5} ${bx} ${by} Q${mx - nx * 0.5} ${my - ny * 0.5} ${ax - nx} ${ay - ny} Z`;
}

// stripe placements (viewBox coords); anything outside the fur is clipped away
const HEAD_STRIPES: Wedge[] = [
  [86, 40, 87.5, 53, 4], [92, 40, 92, 57, 4.6], [98, 40, 96.5, 53, 4], // forehead
  [58, 64, 72, 68, 4.2], [58, 71.5, 70, 73, 3.4], // left cheek
  [126, 64, 112, 68, 4.2], [126, 71.5, 114, 73, 3.4], // right cheek
];
const BODY_STRIPES: Wedge[] = [
  [140, 98, 118, 118, 7], [160, 116, 128, 134, 8.5], [170, 138, 136, 152, 8.5], [174, 162, 142, 172, 8], // back
  [62, 138, 90, 143, 6], [64, 158, 92, 161, 6], [66, 176, 91, 178, 5.5], // front leg
];

// swiping arm (its own viewBox: 0 160 80 160 — only the bottom of this path shows), striped from alternating sides
const ARM =
  "M18 -4 L18 256 C12 264 11 278 15 288 C19 298 29 304 40 304 C51 304 61 298 65 288 C69 278 68 264 62 256 L62 -4 Z";
const ARM_STRIPES: Wedge[] = [166, 194, 222].map((y, i) =>
  i % 2 === 0 ? [12, y, 46, y + 4, 8] : [68, y, 34, y + 4, 8],
);

interface PhotoCatProps {
  src: string;
  alt: string;
}

export default function PhotoCat({ src, alt }: PhotoCatProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const nodRef = useRef<SVGGElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const eyesRef = useRef<SVGGElement>(null);
  const heartRef = useRef<SVGPathElement>(null);
  const pawRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<Point | null>(null);
  const happyTimerRef = useRef<number | null>(null);

  const [happy, setHappy] = useState(false);
  const [blinking, setBlinking] = useState(false);

  // --- eyes / head follow the pointer ---
  useEffect(() => {
    const look = { x: 0, y: 0 };
    let raf = 0;

    function frame() {
      raf = 0;
      const svg = svgRef.current;
      if (!svg) return;

      let tx = 0;
      let ty = 0;
      const p = pointerRef.current;
      if (p) {
        const r = svg.getBoundingClientRect();
        const cx = r.left + r.width * ((FACE.x - VB.x) / VB.w);
        const cy = r.top + r.height * ((FACE.y - VB.y) / VB.h);
        const dx = p.x - cx;
        const dy = p.y - cy;
        const d = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, d / 260);
        tx = (dx / d) * k;
        ty = (dy / d) * k;
      }

      look.x += (tx - look.x) * 0.14;
      look.y += (ty - look.y) * 0.14;
      const { x, y } = look;

      headRef.current?.setAttribute("transform", `rotate(${x * 6} ${NECK.x} ${NECK.y}) translate(${x * 2.5} ${y * 2})`);
      eyesRef.current?.setAttribute("transform", `translate(${x * 5} ${y * 4.5})`);

      if (Math.abs(tx - look.x) > 0.002 || Math.abs(ty - look.y) > 0.002) {
        raf = requestAnimationFrame(frame);
      }
    }

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onPointer = (e: PointerEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY };
      kick();
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointer, { passive: true });
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
    };
  }, []);

  // --- idle blinking ---
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let t = 0;
    const schedule = () => {
      t = window.setTimeout(() => {
        setBlinking(true);
        t = window.setTimeout(() => {
          setBlinking(false);
          schedule();
        }, 150);
      }, 2500 + Math.random() * 4000);
    };
    schedule();
    return () => window.clearTimeout(t);
  }, []);

  // --- paw swipes while the photo is scrolled out of view ---
  // Swipes only when the visitor is idle (so it never interrupts reading),
  // at most PAW_INTERVAL_MS apart, and at most PAW_MAX_PER_VISIT times per page load.
  useEffect(() => {
    const wrap = wrapRef.current;
    const paw = pawRef.current;
    if (!wrap || !paw || prefersReducedMotion()) return;

    const topbar = document.querySelector<HTMLElement>(".topbar");
    const barH = topbar?.offsetHeight ?? 0;
    let poll: number | null = null;
    let anims: Animation[] = [];
    let swipes = 0;
    let nextDue = 0;
    let lastActivity = Date.now();
    const markActive = () => {
      lastActivity = Date.now();
    };
    const activityEvents = ["scroll", "wheel", "keydown", "touchmove"] as const;
    activityEvents.forEach((e) => window.addEventListener(e, markActive, { passive: true }));

    function hidePaw() {
      anims.forEach((a) => a.cancel());
      anims = [];
      paw!.style.visibility = "hidden";
    }

    function swipe(): boolean {
      if (document.hidden || anims.length) return false;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const top = topbar ? topbar.getBoundingClientRect().bottom : 0;
      const p = pointerRef.current ?? { x: vw / 2, y: vh / 2 };

      const side = Math.random() < 0.5 ? -1 : 1;
      const ox = clamp(p.x + side * (50 + Math.random() * 90), 40, vw - 40);
      const dx = p.x - ox;
      const dy = Math.max(p.y - top, 1);
      const ang = clamp((-Math.atan2(dx, dy) * 180) / Math.PI, -50, 50);
      const H = paw!.offsetHeight;
      const reach = clamp(Math.hypot(dx, dy) - 14, 60, H - 30);
      const out = reach - H;
      const hid = -H - 10;
      const T = (a: number, y: number) => `rotate(${a}deg) translateY(${y}px)`;

      paw!.style.left = `${ox}px`;
      paw!.style.top = `${top}px`;
      paw!.style.visibility = "visible";

      const armAnim = paw!.animate(
        [
          { transform: T(ang, hid), offset: 0, easing: "cubic-bezier(.3,.7,.4,1)" },
          { transform: T(ang, out), offset: 0.3 },
          { transform: T(ang + 9, out - 8), offset: 0.42 },
          { transform: T(ang - 7, out), offset: 0.54 },
          { transform: T(ang + 9, out - 8), offset: 0.66 },
          { transform: T(ang, out), offset: 0.76, easing: "ease-in" },
          { transform: T(ang, hid), offset: 1 },
        ],
        { duration: PAW_DURATION_MS, easing: "ease-in-out" },
      );
      anims = [armAnim];
      armAnim.onfinish = hidePaw;
      return true;
    }

    function stop() {
      if (poll !== null) window.clearInterval(poll);
      poll = null;
      hidePaw();
    }

    function tick() {
      const now = Date.now();
      if (swipes >= PAW_MAX_PER_VISIT) {
        if (!anims.length) stop(); // let the last swipe finish first
        return;
      }
      if (now < nextDue || now - lastActivity < PAW_IDLE_MS) return;
      if (swipe()) {
        swipes += 1;
        nextDue = now + PAW_INTERVAL_MS;
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        const rootTop = entry.rootBounds?.top ?? barH;
        const scrolledPast = !entry.isIntersecting && entry.boundingClientRect.bottom <= rootTop;
        if (scrolledPast) {
          if (poll === null && swipes < PAW_MAX_PER_VISIT) {
            nextDue = Date.now() + PAW_INTERVAL_MS;
            poll = window.setInterval(tick, 500);
          }
        } else {
          stop();
        }
      },
      { rootMargin: `-${barH}px 0px 0px 0px` },
    );
    io.observe(wrap);

    return () => {
      io.disconnect();
      activityEvents.forEach((e) => window.removeEventListener(e, markActive));
      stop();
    };
  }, []);

  useEffect(() => () => {
    if (happyTimerRef.current !== null) window.clearTimeout(happyTimerRef.current);
  }, []);

  function pet() {
    setHappy(true);
    if (happyTimerRef.current !== null) window.clearTimeout(happyTimerRef.current);
    happyTimerRef.current = window.setTimeout(() => setHappy(false), 1300);

    if (prefersReducedMotion()) return;
    nodRef.current?.animate(
      [
        { transform: "translateY(0) rotate(0deg)" },
        { transform: "translateY(4px) rotate(-2deg)", offset: 0.25 },
        { transform: "translateY(0) rotate(0deg)", offset: 0.5 },
        { transform: "translateY(4px) rotate(2deg)", offset: 0.75 },
        { transform: "translateY(0) rotate(0deg)" },
      ],
      { duration: 700, easing: "ease-in-out" },
    );
    heartRef.current?.animate(
      [
        { opacity: 0, transform: "translateY(6px) scale(0.6)" },
        { opacity: 1, transform: "translateY(-4px) scale(1)", offset: 0.3 },
        { opacity: 0, transform: "translateY(-22px) scale(1)" },
      ],
      { duration: 1200, easing: "ease-out" },
    );
  }

  const svgClass = ["cat-svg", happy && "is-happy", blinking && "is-blinking"].filter(Boolean).join(" ");

  return (
    <div className="photo-wrap" ref={wrapRef}>
      <div className="photo-slot">
        <img className="photo-img" src={src} alt={alt} />
      </div>
      <p className="cat-hint">^^ psst, you can pet the cat</p>

      <button className="cat" type="button" aria-label="Pet the cat" onClick={pet}>
        <svg ref={svgRef} className={svgClass} viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`} aria-hidden="true">
          <defs>
            <clipPath id="photocat-head-clip">
              <path d={HEAD} />
            </clipPath>
            <clipPath id="photocat-body-clip">
              <path d={BODY} />
            </clipPath>
          </defs>

          {/* tail hangs over the frame edge */}
          <g className="cat-tail" fill="none" strokeWidth={12}>
            <path d={TAIL} stroke={FUR} strokeLinecap="round" />
            <path d={TAIL} stroke={STRIPE} strokeDasharray="0 9 5 8" />
          </g>

          {/* body + second front paw */}
          <path d={BODY} fill={FUR} />
          <g clipPath="url(#photocat-body-clip)" fill={STRIPE}>
            {BODY_STRIPES.map((w) => (
              <path key={w.join()} d={wedgePath(w)} />
            ))}
          </g>
          <ellipse cx="96" cy="197" rx="10" ry="4" fill={FUR} />

          {/* head */}
          <g ref={nodRef} className="cat-nod">
            <g ref={headRef}>
              <path d={HEAD} fill={FUR} />
              <g clipPath="url(#photocat-head-clip)" fill={STRIPE}>
                {HEAD_STRIPES.map((w) => (
                  <path key={w.join()} d={wedgePath(w)} />
                ))}
              </g>
              <g ref={eyesRef}>
                <g className="cat-eyes-open" fill={EYE}>
                  <ellipse className="cat-eye" cx="82" cy="70" rx="3.3" ry="4.6" />
                  <ellipse className="cat-eye" cx="102" cy="70" rx="3.3" ry="4.6" />
                </g>
                <g className="cat-eyes-happy" fill="none" stroke={EYE} strokeWidth={2.3} strokeLinecap="round">
                  <path d="M78.5 71.5 Q82 66.5 85.5 71.5" />
                  <path d="M98.5 71.5 Q102 66.5 105.5 71.5" />
                </g>
                {/* whiskers */}
                <g fill="none" stroke={EYE} strokeWidth={1} strokeLinecap="round">
                  <path d="M84 79 Q72 76 58 75" />
                  <path d="M84 81.5 Q71 81.5 58 83" />
                  <path d="M100 79 Q112 76 126 75" />
                  <path d="M100 81.5 Q113 81.5 126 83" />
                </g>
                {/* nose */}
                <path d="M89.6 78.5 L94.4 78.5 L92 81.6 Z" fill={EYE} stroke={EYE} strokeWidth={1.2} strokeLinejoin="round" />
              </g>
            </g>
          </g>

          {/* pet heart */}
          <path
            ref={heartRef}
            className="cat-heart"
            d="M126 46 C118 40 118 33 122.5 33 C124.5 33 126 35 126 36.5 C126 35 127.5 33 129.5 33 C134 33 134 40 126 46 Z"
            fill="#ff8fa3"
          />
        </svg>
      </button>

      <div className="cat-paw" ref={pawRef} aria-hidden="true">
        <svg viewBox="0 160 80 160">
          <defs>
            <clipPath id="photocat-arm-clip">
              <path d={ARM} />
            </clipPath>
          </defs>
          <path d={ARM} fill={FUR} />
          <g clipPath="url(#photocat-arm-clip)" fill={STRIPE}>
            {ARM_STRIPES.map((w) => (
              <path key={w.join()} d={wedgePath(w)} />
            ))}
          </g>
          <g fill={PINK}>
            <path d="M40 263 C49 263 55 271 53 277 C51.5 282 46 281 40 281 C34 281 28.5 282 27 277 C25 271 31 263 40 263 Z" />
            <circle cx="23.5" cy="285" r="4.3" />
            <circle cx="34" cy="292.5" r="4.5" />
            <circle cx="46" cy="292.5" r="4.5" />
            <circle cx="56.5" cy="285" r="4.3" />
          </g>
        </svg>
      </div>
    </div>
  );
}
