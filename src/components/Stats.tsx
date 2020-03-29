import React from "react";

interface Props {
  infected: number;
  removed: number;
  susceptible: number;
}

const ListItem = (props: {
  text: string;
  textColor: "dark" | "light";
  bgColor: string;
}) => (
  <li className={"list-group-item " + props.bgColor}>
    <span className={"text-" + props.textColor}>{props.text}</span>
  </li>
);

const Stats = (props: Props) => {
  return (
    <>
      <ul className="list-group">
        <ListItem
          textColor={"light"}
          bgColor={"bg-primary"}
          text={"Mottagliga: " + props.susceptible}
        />
        <ListItem
          textColor={"light"}
          bgColor={"bg-danger"}
          text={"Infekterade: " + props.infected}
        />
        <ListItem
          textColor={"dark"}
          bgColor={"bg-light"}
          text={"Tillfrisknade: " + props.removed}
        />
      </ul>
    </>
  );
};

export default Stats;
