"use client";

import React, { useEffect, useRef } from "react";

interface WavyBackgroundProps {
  colors?: string[];
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "normal" | "fast";
  waveOpacity?: number;
  waveWidth?: number;
  waveYOffset?: number;
  containerClassName?: string;
  className?: string;
}

export const WavyBackground: React.FC<WavyBackgroundProps> = ({
  colors = ["#38BDF8", "#0EA5E9", "#0284C7"],
  backgroundFill = "white",
  blur = 10,
  speed = "normal",
  waveOpacity = 0.5,
  waveWidth = 50,
  waveYOffset = 0,
  containerClassName = "",
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const speedMap = {
    slow: 0.5,
    normal: 1,
    fast: 2,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationId: number;
    let phase = 0;

    const animate = () => {
      ctx.fillStyle = backgroundFill;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < colors.length; i++) {
        ctx.strokeStyle = colors[i];
        ctx.lineWidth = 2;
        ctx.globalAlpha = waveOpacity;
        ctx.beginPath();

        for (let x = 0; x <= canvas.width; x += 5) {
          const y =
            canvas.height / 2 +
            Math.sin((x / waveWidth + phase + i * 0.5) * Math.PI) *
              (50 - i * 10) +
            waveYOffset;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      phase += speedMap[speed] * 0.01;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [colors, backgroundFill, waveOpacity, waveWidth, waveYOffset, speed]);

  return (
    <div
      className={containerClassName}
      style={{
        filter: `blur(${blur}px)`,
      }}
    >
      <canvas
        ref={canvasRef}
        className={className}
        style={{
          display: "block",
        }}
      />
    </div>
  );
};
