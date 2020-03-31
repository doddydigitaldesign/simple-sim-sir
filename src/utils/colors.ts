import { RelationTypes } from "../types/relations";

export const getBallColor = (relation: RelationTypes) => {
  switch (relation) {
    case RelationTypes.INFECTIOUS:
      return "red";
    case RelationTypes.REMOVED:
      return "white";
    default:
      return "dodgerblue";
  }
};
export const getShadowColor = (relation: RelationTypes) => {
  switch (relation) {
    case RelationTypes.INFECTIOUS:
      return "yellow";
    case RelationTypes.REMOVED:
      return "limegreen";
    default:
      return "deepskyblue";
  }
};
