"use client";

import { useEffect, useRef } from "react";

export default function HoverSound() {
  const contextRef = useRef<AudioContext | null>(null);
  const lastTargetRef = useRef<Element | null>(null);

  useEffect(() => {
    const getContext = () => {
      const audioWindow = window as Window & {
        webkitAudioContext?: typeof AudioContext;
      };
      const AudioContextClass = window.AudioContext || audioWindow.webkitAudioContext;
      if (!AudioContextClass) return null;

      const context = contextRef.current ?? new AudioContextClass();
      contextRef.current = context;
      return context;
    };

    const unlockContext = () => {
      const context = getContext();
      if (!context || context.state !== "suspended") return;
      void context.resume();
    };

    const playTick = () => {
      const context = getContext();
      if (!context) return;
      if (context.state === "suspended") {
        void context.resume();
      }

      const now = context.currentTime;
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(620, now);
      oscillator.frequency.exponentialRampToValueAtTime(240, now + 0.045);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.055, now + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.052);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.055);
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target instanceof Element
        ? event.target.closest("[data-hover-sound]")
        : null;

      if (!target || target === lastTargetRef.current) return;
      lastTargetRef.current = target;
      playTick();
    };

    const onPointerOut = (event: PointerEvent) => {
      const target = event.target instanceof Element
        ? event.target.closest("[data-hover-sound]")
        : null;
      const nextTarget = event.relatedTarget instanceof Element
        ? event.relatedTarget.closest("[data-hover-sound]")
        : null;

      if (target && target !== nextTarget) {
        lastTargetRef.current = null;
      }
    };

    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    document.addEventListener("pointerdown", unlockContext, { once: true });
    document.addEventListener("keydown", unlockContext, { once: true });

    return () => {
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("pointerdown", unlockContext);
      document.removeEventListener("keydown", unlockContext);
      void contextRef.current?.close();
      contextRef.current = null;
    };
  }, []);

  return null;
}
