import { createSlice } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";

const usedWords = new Set();

function generateUniqueWord() {
  let word = faker.word.words({ count: { min: 1, max: 5 } });
  while (usedWords.has(word)) {
    word = faker.word.words({ count: { min: 1, max: 5 } });
  }
  usedWords.add(word);
  return word;
}

const albumsSlice = createSlice({
  name: "albums",
  initialState: [...Array(8)].map(() => {
    const photoCount = Math.round(Math.random() * 16 + 1);
    return {
      albumId: faker.string.uuid(),
      albumName: generateUniqueWord(),
      favorite: faker.datatype.boolean(),
      photos: [...Array(photoCount)].map(() => {
        return {
          photoId: faker.string.uuid(),
          photoUrl: faker.image.urlPicsumPhotos({
            width: faker.number.int({ min: 480, max: 1920 }),
            height: faker.number.int({ min: 480, max: 1080 }),
          }),
          photoAlt: faker.lorem.words({ min: 1, max: 5 }),
          love: faker.datatype.boolean(),
        };
      }),
    };
  }),
  reducers: {
    addNewAlbum: (state, action) => {
      action.payload.photos = action.payload.photos.slice(0, -1);
      state = state.unshift(action.payload);
    },
    getDetail: (state, action) => {
      const photoCount = Math.round(Math.random() * 16);
      state = state.unshift({
        albumId: faker.string.uuid(),
        albumName: generateUniqueWord(),
        favorite: faker.datatype.boolean(),
        photos: [...Array(photoCount)].map(() => {
          return {
            photoId: faker.string.uuid(),
            photoUrl: faker.image.urlPicsumPhotos({
              width: faker.number.int({ min: 480, max: 1920 }),
              height: faker.number.int({ min: 480, max: 1080 }),
            }),
            photoAlt: faker.lorem.words({ min: 1, max: 5 }),
            love: 0,
          };
        }),
      });
    },
    addPhoto: (state, action) => {
      let albumToUpdate = state.find(
        (o) => o.albumId === action.payload.albumId
      );
      albumToUpdate.photos = [...albumToUpdate.photos, action.payload.values];
    },
    updateLikeAlbum: (state, action) => {
      const { id } = action.payload;
      const albumToUpdate = state.find((o) => o.albumId === id);

      if (albumToUpdate) {
        albumToUpdate.favorite = albumToUpdate.favorite ? 0 : 1;
      }
    },
    loadMoreAlbum: (state) => {
      const newAlbums = [...Array(3)].map(() => {
        const photoCount = Math.round(Math.random() * 16 + 1);
        return {
          albumId: faker.string.uuid(),
          albumName: generateUniqueWord(),
          favorite: faker.datatype.boolean(),
          photos: [...Array(photoCount)].map(() => {
            return {
              photoId: faker.string.uuid(),
              photoUrl: faker.image.urlPicsumPhotos({
                width: faker.number.int({ min: 480, max: 1920 }),
                height: faker.number.int({ min: 480, max: 1080 }),
              }),
              photoAlt: faker.lorem.words({ min: 1, max: 5 }),
              love: faker.datatype.boolean(),
            };
          }),
        };
      });
      state.push(...newAlbums);
    },
    updatePhotoLove: (state, action) => {
      const { albumId, photoId } = action.payload;
      const albumToUpdate = state.find((o) => o.albumId === albumId);

      if (albumToUpdate) {
        const photoToUpdate = albumToUpdate.photos.find(
          (o) => o.photoId === photoId
        );
        if (photoToUpdate) {
          photoToUpdate.love = photoToUpdate.love ? 0 : 1;
        }
      }
    },
  },
});

export default albumsSlice;
