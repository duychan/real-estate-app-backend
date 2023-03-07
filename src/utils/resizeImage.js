import sharp from 'sharp';

async function resize(buffer, width, height) {
  return await sharp(buffer).resize(width, height).toBuffer();
}

export const getCoverImageResized = async (files) => {
  try {
    const coverImage = files?.filter((e) => {
      return e.fieldname === 'coverImg';
    });
    const coverImageWidth = 400;
    const coverImageHeigth = 400;
    const lastImage = coverImage.at(-1);
    const bufferResized = await resize(
      lastImage.buffer,
      coverImageWidth,
      coverImageHeigth
    );
    return { ...lastImage, buffer: bufferResized };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getThumbnailResize = async (files) => {
  try {
    let thumbnail = files?.filter((e) => {
      return e.fieldname === 'thumbnail';
    });
    const coverImageWidth = 1600;
    const coverImageHeigth = 900;
    thumbnail = thumbnail.map(async (e) => {
      const bufferResized = await resize(
        e.buffer,
        coverImageWidth,
        coverImageHeigth
      );
      return { ...e, buffer: bufferResized };
    });
    return Promise.all(thumbnail)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } catch (error) {
    throw new Error(error.message);
  }
};