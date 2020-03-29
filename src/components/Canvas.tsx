import React, { useLayoutEffect, useRef } from "react";
import { config } from "../config";
import { RelationTypes } from "../types/relations";
import { Tracker } from "./Tracker";

interface Props {
  populationSize: number;
  timeToRemoved: number;
  handleSetStats: (prev: RelationTypes, next: RelationTypes) => void;
}

export const Canvas = (props: Props) => {
  const { handleSetStats } = props;
  const ref = useRef<HTMLCanvasElement>(null);
  useLayoutEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext("2d");
      ctx?.clearRect(0, 0, config.canvasWidth, config.canvasHeight);
      if (ctx) {
        new Tracker({
          ctx,
          height: config.canvasHeight,
          width: config.canvasWidth,
          popSize: props.populationSize,
          timeToRemoved: props.timeToRemoved,
          handleSetStats: handleSetStats
        });
      }
    }
  }, [handleSetStats, props.populationSize, props.timeToRemoved]);
  return (
    <canvas
      ref={ref}
      width={config.canvasWidth}
      height={config.canvasHeight}
    ></canvas>
  );
};
