const getCategory = (category: string) => {
  if (category === "full-length-movies") return "Full Length Movie";
  if (category === "stage-plays") return "Stage Plays";
  if (category === "musicals") return "Musical";
  if (category === "spoken-word") return "Spoken Word";
  if (category === "short-films") return "Short Film";
  if (category === "skits") return "Skits";
};

export default getCategory;
