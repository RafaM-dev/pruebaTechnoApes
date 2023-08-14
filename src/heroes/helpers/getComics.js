import { Observable } from "rxjs";
import marvelApi from "../../api/MarvelApi";

export const getComicsObservable = () => {
  return new Observable(async (subscriber) => {
    try {
      const response = await marvelApi.get("/comics");
      subscriber.next(response.data.data.results);
      subscriber.complete();
    } catch (error) {
      subscriber.error(error);
    }
  });
};

export const getComicByIdObservable = (comicId) => {
  return new Observable(async (subscriber) => {
    try {
      const response = await marvelApi.get(`/comics/${comicId}`);
      subscriber.next(response.data.data.results[0]);
      subscriber.complete();
    } catch (error) {
      subscriber.error(error);
    }
  });
};

export const getComicCharacteresByIdObservable = (comicId) => {
  return new Observable(async (subscriber) => {
    try {
      const response = await marvelApi.get(`/comics/${comicId}/characteres`);
      subscriber.next(response.data.data.results);
      subscriber.complete();
    } catch (error) {
      subscriber.error(error);
    }
  });
};

export const getComicsByNameObservable = (name = "") => {
  return new Observable(async (subscriber) => {
    try {
      const response = await marvelApi.get("/comics");
      const filteredComics = response.data.data.results.filter((comic) =>
        comic.title.toLocaleLowerCase().includes(name)
      );
      subscriber.next(filteredComics);
      subscriber.complete();
    } catch (error) {
      subscriber.error(error);
    }
  });
};
