import buildUrl from 'cloudinary-build-url';

export const useBlurredImageUrl = (publicId: string): [string] => {
  const blurredImage = buildUrl(publicId, {
    transformations: {
      effect: {
        name: 'blur:1000',
      },
      quality: 8,
    },
  });

  return [blurredImage];
};
