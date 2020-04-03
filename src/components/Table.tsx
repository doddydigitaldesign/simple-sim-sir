import React from "react";

interface Props {
  S: number;
  I: number;
  R: number;
}

export const Table = (props: Props) => {
  return (
    <table className="table table-striped table-dark">
      <thead>
        <tr>
          <th scope="col">Population size</th>
          <th scope="col">Susceptible</th>
          <th scope="col">Infected</th>
          <th scope="col">Recovered</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">{props.S + props.I + props.R}</th>
          <td>{props.S}</td>
          <td>{props.I}</td>
          <td>{props.R}</td>
        </tr>
      </tbody>
    </table>
  );
};
