import { CategoryEnum } from "./enums/category.enum";

export const getCategoryColor = (category: string): string => {
  switch (category) {
    case CategoryEnum.FULL_LENGTH_MOVIES:
      return "bg-amber-400";
    case CategoryEnum.STAGE_PLAYS:
      return "bg-orange-600";
    case CategoryEnum.MUSICALS:
      return "bg-blue-500";
    case CategoryEnum.SPOKEN_WORD:
      return "bg-indigo-500";
    case CategoryEnum.SHORT_FILMS:
      return "bg-gray-600";
    case CategoryEnum.SKITS:
      return "bg-cyan-600";
    default:
      return "bg-neutral-800";
  }
};
