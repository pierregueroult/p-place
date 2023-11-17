"use client";

import { useEffect, useRef } from "react";
import { Map } from "@prisma/client";

const factor = 4;

interface LiveImageProps {
  className?: string;
}

export default function LiveImage({ className }: LiveImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    async function fetchData() {
      if (!canvasRef.current) return;
      const res = await fetch("/api/pixel/all");
      const data = await res.json();
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      data.forEach((el: { x: number; y: number; colorHex: string }) => {
        setTimeout(() => {
          ctx.fillStyle = `#${el.colorHex}`;
          ctx.fillRect(el.x * factor, el.y * factor, factor, factor);
        }, el.x * 10 + el.y * 10);
      });
    }
    fetchData();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={80 * factor}
      height={80 * factor}
      className={className}
    ></canvas>
  );
}
