import { EstateModel } from '../models/index.js';
import pick from 'lodash/pick.js';
import {
  getCoverImageResized,
  getThumbnailResize,
} from '../utils/resizeImage.js';
import { file64 } from '../utils/UriConverter.js';
import { cloudinary } from '../configs/cloudinary.config.js';

const nestedFields = [
  'name',
  'address',
  'area',
  'neighborHood',
  'type',
  'currentStatus',
  'price',
  'bedRoom',
  'bathRoom',
  'description',
];

const createEstate = async ({ salerId, body, files }) => {
  try {
    const fields = pick(body, nestedFields);
    const thumbnailPublicId = [];
    let coverImagePublicId = null;
    if (files) {
      const folderName = `Estates/${fields.name}`;
      const coverImage = files?.filter((e) => {
        return e.fieldname === 'coverImg';
      });
      const isExistCoverImage = coverImage.length > 0;
      if (isExistCoverImage) {
        const coverImageResized = await getCoverImageResized(files);
        coverImagePublicId = await cloudinary.uploader.upload(
          file64(coverImageResized).content,
          { folder: folderName }
        );
      }
      const thumbnail = files?.filter((e) => {
        return e.fieldname === 'thumbnail';
      });
      const isExistThumbnail = thumbnail.length > 0;
      if (isExistThumbnail) {
        const thumbnailResized = await getThumbnailResize(files);
        const thumbnailPromises = thumbnailResized.map((e) => {
          return cloudinary.uploader.upload(file64(e).content, {
            folder: folderName,
          });
        });
        const thumbnailResult = await Promise.all(thumbnailPromises);
        thumbnailResult.forEach((e) => {
          thumbnailPublicId.push(e.public_id);
        });
      }
    }
    const estateAdded = await EstateModel.create({
      ...fields,
      owner: salerId,
      thumbnail: thumbnailPublicId,
      coverImg: coverImagePublicId.public_id,
    });
    return estateAdded;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { createEstate };