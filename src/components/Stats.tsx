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
          text={"S, antal mottagliga: " + props.susceptible}
        />
        <ListItem
          textColor={"light"}
          bgColor={"bg-danger"}
          text={"I, antal infekterade: " + props.infected}
        />
        <ListItem
          textColor={"dark"}
          bgColor={"bg-light"}
          text={"R, antal immuna eller döda: " + props.removed}
        />
      </ul>
    </>
  );
};

export default Stats;
