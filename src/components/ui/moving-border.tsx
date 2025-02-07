"use client";
import React, { ReactNode, CSSProperties } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "bg-transparent relative text-xl  h-16 w-40 p-[1px] overflow-hidden ",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-32 w-32 opacity-[0.8] bg-[radial-gradient(var(--red-500)_40%,transparent_60%)]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

interface MovingBorderProps {
  children: ReactNode;
  duration?: number;
  rx?: string | number;
  ry?: string | number;
  style?: CSSProperties;
  className?: string;
  pathLength?: number;
  borderWidth?: number;
  pathSpacing?: number;
}

interface Point {
  x: number;
  y: number;
}

interface PathConfig {
  path: string;
  points: Point[];
}

const MovingBorder = ({
  children,
  duration = 2000,
  rx = 30,
  ry = 30,
  style,
  className,
  pathLength = 0.9,
  borderWidth = 2,
  pathSpacing = 0.5
}: MovingBorderProps) => {
  const pathRef = useRef<any>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  const calculatePoints = (width: number, height: number): Point[] => {
    // Your calculation logic
    return [];
  };

  const createPath = (points: Point[]): string => {
    // Your path creation logic
    return '';
  };

  const generatePathConfig = (width: number, height: number): PathConfig => {
    const points = calculatePoints(width, height);
    return {
      path: createPath(points),
      points
    };
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export default MovingBorder;
