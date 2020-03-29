import React from "react";

interface Props {
  infected: number;
  removed: number;
  susceptible: number;
}

const Stats = (props: Props) => {
  return (
    <div className="list-group">
      <p className="list-group-item">Smittade: {props.infected}</p>
      <p className="list-group-item">Tillfrisknade: {props.removed}</p>
      <p className="list-group-item">Mottagliga: {props.susceptible}</p>
    </div>
  );
};

export default Stats;
