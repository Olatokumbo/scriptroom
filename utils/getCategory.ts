import { CategoryEnum } from "./enums/category.enum";

/**
 * Returns a Proper Category name
 * @param category Category
 */
const getCategory = (category: string): string => {
  if (category === CategoryEnum.FULL_LENGTH_MOVIES) return "Full Length Movie";
  if (category === CategoryEnum.STAGE_PLAYS) return "Stage Plays";
  if (category === CategoryEnum.MUSICALS) return "Musical";
  if (category === CategoryEnum.SPOKEN_WORD) return "Spoken Word";
  if (category === CategoryEnum.SHORT_FILMS) return "Short Film";
  if (category === CategoryEnum.SKITS) return "Skits";
  else return "";
};

export default getCategory;
