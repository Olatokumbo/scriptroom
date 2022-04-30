enum categoryColor {
  full_length_movies = "full-length-movies",
  stage_plays = "stage-plays",
  musicals = "musicals",
  spoken_word = "spoken-word",
  short_films = "short-films",
  skits = "skits",
}


export const getCategoryColor = (category: string) => {
  switch (category) {
    case categoryColor.full_length_movies:
      return "bg-amber-400";
    case categoryColor.stage_plays:
      return "bg-orange-600";
    case categoryColor.musicals:
      return "bg-blue-500";
    case categoryColor.spoken_word:
      return "bg-indigo-500";
    case categoryColor.short_films:
      return "bg-gray-600";
    case categoryColor.skits:
      return "bg-cyan-600";
    default:
      return "bg-neutral-800";
  }
};
