import React from "react";

interface Props {
  setPopulationSize: (e: React.ChangeEvent<HTMLInputElement>) => void;
  populationSize: number;
  timeToRemoved: number;
  setTimeToRemoved: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Form = (props: Props) => {
  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="popsize-input" aria-describedby="popsizeHelp">
            Antal individer
          </label>
          <small id="popsizeHelp" className="form-text text-muted">
            Se hur resultatet påverkas om det finns färre individer i området.
          </small>
          <input
            className={"form-control"}
            type="number"
            value={props.populationSize}
            onChange={props.setPopulationSize}
            name="population-size"
            id="popsize-input"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="time-to-removed-input"
            aria-describedby="timeToRemovedHelp"
          >
            Tid till frisk
          </label>
          <small id="timeToRemovedHelp" className="form-text text-muted">
            Se hur resultatet påverkas om det tar kortare tid att tillfriskna.
          </small>
          <input
            className={"form-control"}
            type="number"
            value={props.timeToRemoved}
            onChange={props.setTimeToRemoved}
            name="time-to-removed-input"
            id="time-to-removed-input"
          />
        </div>
      </form>
    </div>
  );
};
