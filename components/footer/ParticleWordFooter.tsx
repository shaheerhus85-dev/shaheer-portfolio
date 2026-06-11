"use client";

import { useEffect, useRef } from "react";
import styles from "./ParticleWordFooter.module.css";

const DEFAULT_WORDS = ["EMAIL", "GITHUB", "AI SYSTEMS", "AUTOMATION", "CONTACT"];
const WORD_INTERVAL_MS = 4500;

type ParticleWordFooterProps = {
  activeWord?: string | null;
  autoWords?: string[];
  defaultWord?: string;
};

type Particle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  alpha: number;
  radius: number;
};

function getBaseFontSize(word: string, width: number, height: number) {
  const safeHeight = height * 0.62;
  const desktopStart = width < 700 ? 108 : 170;

  if (word.length <= 5) {
    return Math.min(desktopStart, width * 0.32, safeHeight);
  }

  if (word.length <= 8) {
    return Math.min(desktopStart, width * 0.24, safeHeight);
  }

  return Math.min(desktopStart, width * 0.18, safeHeight);
}

function getFittedFontSize(
  ctx: CanvasRenderingContext2D,
  word: string,
  width: number,
  height: number,
) {
  const maxWidth = width * 0.78;
  const maxHeight = height * 0.62;
  let fontSize = getBaseFontSize(word, width, height);

  for (let i = 0; i < 8; i += 1) {
    ctx.font = `900 ${fontSize}px "Inter Tight", "Satoshi", system-ui, sans-serif`;

    if (ctx.measureText(word).width <= maxWidth && fontSize <= maxHeight) {
      return fontSize;
    }

    fontSize *= 0.9;
  }

  return fontSize;
}

export default function ParticleWordFooter({
  activeWord,
  autoWords = DEFAULT_WORDS,
  defaultWord,
}: ParticleWordFooterProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeWordRef = useRef<string | null>(activeWord ?? null);
  const autoWordsRef = useRef(autoWords);
  const defaultWordRef = useRef(defaultWord);
  const revisionRef = useRef(0);

  useEffect(() => {
    activeWordRef.current = activeWord ?? null;
  }, [activeWord]);

  useEffect(() => {
    autoWordsRef.current = autoWords.length > 0 ? autoWords : DEFAULT_WORDS;
    revisionRef.current += 1;
  }, [autoWords]);

  useEffect(() => {
    defaultWordRef.current = defaultWord;
    revisionRef.current += 1;
  }, [defaultWord]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) {
      return;
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = reducedMotionQuery.matches;
    let particles: Particle[] = [];
    let frameId = 0;
    let wordTimer = performance.now();
    let wordIndex = 0;
    let width = 0;
    let height = 0;
    let visible = false;
    let pointerListenersAttached = false;
    let renderedWord = "";
    let forceDefaultNext = false;
    let hadActiveWord = Boolean(activeWordRef.current);
    let seenRevision = revisionRef.current;
    const pointer = { x: -9999, y: -9999, active: false };

    const getCurrentWord = () => {
      const manual = activeWordRef.current?.trim().toUpperCase();
      if (manual) {
        return manual;
      }

      const words = autoWordsRef.current.length > 0 ? autoWordsRef.current : DEFAULT_WORDS;
      const defaultAutoWord = defaultWordRef.current?.trim().toUpperCase();

      if ((!renderedWord || forceDefaultNext) && defaultAutoWord) {
        forceDefaultNext = false;
        return defaultAutoWord;
      }

      return words[wordIndex % words.length];
    };

    const getParticleBudget = () => {
      return width < 700 ? 1800 : 3400;
    };

    const sampleWord = (word: string) => {
      if (width <= 0 || height <= 0) {
        return [] as { x: number; y: number }[];
      }

      const isMobile = width < 700;
      const step = isMobile ? 8 : 6;
      const offscreen = document.createElement("canvas");
      offscreen.width = Math.max(1, Math.floor(width));
      offscreen.height = Math.max(1, Math.floor(height));
      const offCtx = offscreen.getContext("2d");

      if (!offCtx) {
        return [] as { x: number; y: number }[];
      }

      const fontSize = getFittedFontSize(offCtx, word, width, height);
      offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
      offCtx.fillStyle = "#ffffff";
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.font = `900 ${fontSize}px "Inter Tight", "Satoshi", system-ui, sans-serif`;
      offCtx.fillText(word, offscreen.width / 2, offscreen.height / 2);

      const image = offCtx.getImageData(0, 0, offscreen.width, offscreen.height).data;
      const points: { x: number; y: number }[] = [];

      for (let y = 0; y < offscreen.height; y += step) {
        for (let x = 0; x < offscreen.width; x += step) {
          const alpha = image[(y * offscreen.width + x) * 4 + 3];
          if (alpha > 128) {
            points.push({ x, y });
          }
        }
      }

      const budget = getParticleBudget();
      if (points.length <= budget) {
        return points;
      }

      const stride = Math.ceil(points.length / budget);
      return points.filter((_, index) => index % stride === 0).slice(0, budget);
    };

    const assignTargets = (word: string) => {
      const targets = sampleWord(word);
      if (targets.length === 0) {
        return;
      }

      if (particles.length < targets.length) {
        for (let i = particles.length; i < targets.length; i += 1) {
          const target = targets[i % targets.length];
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            tx: target.x,
            ty: target.y,
            vx: 0,
            vy: 0,
            alpha: 0.68 + Math.random() * 0.08,
            radius: width < 700 ? 1.8 : 2.35 + Math.random() * 0.25,
          });
        }
      }

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        if (i < targets.length) {
          const target = targets[i];
          particle.tx = target.x;
          particle.ty = target.y;
          particle.alpha = Math.min(0.78, Math.max(particle.alpha, 0.68));
        } else {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.min(width, height) * (0.2 + Math.random() * 0.2);
          particle.tx = width / 2 + Math.cos(angle) * radius;
          particle.ty = height / 2 + Math.sin(angle) * radius;
          particle.alpha = 0.08;
        }
      }

      renderedWord = word;
    };

    const drawStatic = () => {
      const word = getCurrentWord();
      assignTargets(word);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(236, 232, 227, 0.72)";

      for (const particle of particles) {
        if (particle.alpha < 0.18) {
          continue;
        }

        ctx.globalAlpha = particle.alpha;
        ctx.beginPath();
        ctx.arc(particle.tx, particle.ty, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const parentRect = canvas.parentElement?.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, rect.width || parentRect?.width || window.innerWidth);
      height = Math.max(1, rect.height || parentRect?.height || Math.round(window.innerHeight * 0.34));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      assignTargets(getCurrentWord());

      if (reducedMotion) {
        drawStatic();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(236, 232, 227, 0.72)";

      const pointerRadius = reducedMotion ? 0 : width < 700 ? 70 : 110;
      const idleNoise = width < 700 ? 0.018 : 0.024;
      const time = performance.now();

      for (const particle of particles) {
        const noiseX = Math.sin(particle.ty * 0.018 + time * 0.0009) * idleNoise;
        const noiseY = Math.cos(particle.tx * 0.016 + time * 0.0008) * idleNoise;
        const dx = particle.tx - particle.x;
        const dy = particle.ty - particle.y;

        particle.vx += dx * 0.025 + noiseX;
        particle.vy += dy * 0.025 + noiseY;

        if (pointer.active) {
          const pointerDx = particle.x - pointer.x;
          const pointerDy = particle.y - pointer.y;
          const distance = Math.sqrt(pointerDx * pointerDx + pointerDy * pointerDy);

          if (distance > 0 && distance < pointerRadius) {
            const force = (1 - distance / pointerRadius) * 2.15;
            particle.vx += (pointerDx / distance) * force;
            particle.vy += (pointerDy / distance) * force;
          }
        }

        particle.vx *= 0.82;
        particle.vy *= 0.82;
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.alpha < 0.14) {
          continue;
        }

        ctx.globalAlpha = particle.alpha;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    const stopAnimation = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    const startAnimation = () => {
      if (visible && !frameId) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const animate = (timestamp: number) => {
      frameId = 0;
      if (!visible) {
        return;
      }

      const hasActiveWord = Boolean(activeWordRef.current);
      const configChanged = seenRevision !== revisionRef.current;

      if ((hadActiveWord && !hasActiveWord) || configChanged) {
        forceDefaultNext = true;
        wordIndex = 0;
        renderedWord = "";
        wordTimer = timestamp;
        seenRevision = revisionRef.current;
      }
      hadActiveWord = hasActiveWord;

      const nextWord = getCurrentWord();

      if (nextWord !== renderedWord) {
        assignTargets(nextWord);
        wordTimer = timestamp;
      } else if (!activeWordRef.current && timestamp - wordTimer >= WORD_INTERVAL_MS) {
        const words = autoWordsRef.current.length > 0 ? autoWordsRef.current : DEFAULT_WORDS;
        wordIndex = (wordIndex + 1) % words.length;
        wordTimer = timestamp;
        assignTargets(words[wordIndex]);
      }

      if (reducedMotion) {
        drawStatic();
      } else {
        draw();
      }

      startAnimation();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const addPointerListeners = () => {
      if (pointerListenersAttached) {
        return;
      }

      canvas.addEventListener("pointermove", handlePointerMove);
      canvas.addEventListener("pointerleave", handlePointerLeave);
      pointerListenersAttached = true;
    };

    const removePointerListeners = () => {
      if (!pointerListenersAttached) {
        return;
      }

      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      pointerListenersAttached = false;
      handlePointerLeave();
    };

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      if (reducedMotion) {
        drawStatic();
      }
    };

    resize();
    drawStatic();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      drawStatic();
      startAnimation();
    });
    resizeObserver.observe(canvas);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    document.fonts?.ready
      .then(() => {
        resize();
        drawStatic();
        startAnimation();
      })
      .catch(() => undefined);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;

        if (visible) {
          resize();
          drawStatic();
          addPointerListeners();
          startAnimation();
        } else {
          stopAnimation();
          removePointerListeners();
        }
      },
      { rootMargin: "220px 0px", threshold: 0 },
    );

    intersectionObserver.observe(canvas);

    window.addEventListener("resize", resize);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      stopAnimation();
      removePointerListeners();
      window.removeEventListener("resize", resize);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.particleCanvas} aria-hidden="true" />;
}
