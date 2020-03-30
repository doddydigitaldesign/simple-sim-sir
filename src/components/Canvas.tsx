import React, { useEffect, useRef } from "react";
import { config } from "../config";
import { initComputePositions } from "../workers/computePositions";
import { Tracker } from "./Tracker";

interface Props {
  populationSize: number;
  timeToRemoved: number;
  transmissionRate: number;
  handleSetStats: (stats: { S: number; I: number; R: number }) => void;
  stats: { S: number; I: number; R: number };
}

export const Canvas = (props: Props) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (ref.current) {
      // init worker
      initComputePositions();
      // init canvas context
      const ctx = ref.current.getContext("2d");
      ctx?.clearRect(0, 0, config.canvasWidth, config.canvasHeight);
      if (ctx) {
        const tracker = new Tracker({
          ctx,
          height: config.canvasHeight,
          width: config.canvasWidth,
          popSize: props.populationSize,
          timeToRemoved: props.timeToRemoved,
          transmissionRate: props.transmissionRate,
          stats: props.stats
        });
        const interval = setInterval(() => {
          const stats = tracker.getStats();
          props.handleSetStats({ ...stats });
        }, 1000);
        if (interval) {
          return () => {
            clearInterval();
          };
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.transmissionRate, props.populationSize, props.timeToRemoved]);
  return (
    <canvas
      ref={ref}
      width={config.canvasWidth}
      height={config.canvasHeight}
    ></canvas>
  );
};
