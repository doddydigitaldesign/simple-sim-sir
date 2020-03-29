import React from "react";

interface Props {
  populationSize: number;
  timeToRemoved: number;
  transmissionRate: number;
  setPopulationSize: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setTimeToRemoved: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setTransmissionRate: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
            Se hur resultatet påverkas med olika antal individer i området.
          </small>
          <input
            className={"form-control"}
            type="number"
            min={0}
            max={1000}
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
            Se hur resultatet påverkas med olika längder på sjukdomen.
          </small>
          <input
            className={"form-control"}
            type="number"
            value={props.timeToRemoved}
            min={0.01}
            max={100}
            onChange={props.setTimeToRemoved}
            name="time-to-removed-input"
            id="time-to-removed-input"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="transmission-rate-input"
            aria-describedby="timeToRemovedHelp"
          >
            Smittrisk
          </label>
          <small id="transmissionRateHelp" className="form-text text-muted">
            Se hur resultatet påverkas om smittrisken ändras.
          </small>
          <input
            className={"form-control"}
            type="number"
            value={props.transmissionRate}
            onChange={props.setTransmissionRate}
            name="transmission-rate-input"
            id="transmission-rate-input"
          />
        </div>
      </form>
    </div>
  );
};
