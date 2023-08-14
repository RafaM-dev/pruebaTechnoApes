import marvelApi from "../../api/MarvelApi";

export const getCharacters = async () => {
  try {
    const response = await marvelApi.get("/characters");
    return response.data.data.results;
  } catch (error) {
    console.error("Error fetching characters:", error);
    return [];
  }
};

