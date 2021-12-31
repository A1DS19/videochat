import React from 'react';
import type { NextPage } from 'next';
import { Room as RoomType } from '../../shared/context/rooms/types';
import Image from 'next/image';
import { Box, Text } from '@chakra-ui/react';
import buildUrl, { extractPublicId } from 'cloudinary-build-url';
import { useBlurredImageUrl } from '../../shared/hooks/useIMageTransformations';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface RoomProps {
  room: RoomType;
}

export const Room: NextPage<RoomProps> = ({ room }): JSX.Element => {
  const publicId = extractPublicId(
    'https://res.cloudinary.com/ai1ds/image/upload/v1640924338/Blog-cover-image_nvqacy.jpg'
  );

  const [blurredImage] = useBlurredImageUrl(publicId);

  const imageUrl = buildUrl(publicId, {
    transformations: {
      resize: {
        type: 'scale',
        width: 316,
        height: 178,
      },
      radius: 8,
    },
  });

  return (
    <React.Fragment>
      <Box backgroundColor={'#edf2f7'} padding={5} borderRadius={'lg'} maxWidth={'30%'}>
        <Link href={`/room/${room.name}`}>
          <a>
            <Box cursor={'pointer'}>
              <motion.div whileHover={{ x: 5, y: -5 }}>
                <Image
                  src={imageUrl}
                  alt='test image'
                  width={316}
                  height={178}
                  blurDataURL={blurredImage}
                  placeholder='blur'
                />
              </motion.div>
            </Box>
          </a>
        </Link>
        <Link href={`/room/${room.name}`}>
          <a>
            <Text _hover={{ color: 'gray.600' }} cursor={'pointer'}>
              {room.name}
            </Text>
          </a>
        </Link>
        <Text fontSize={'small'} color={'gray'}>
          Creator: {room.creator.email}
        </Text>
      </Box>
    </React.Fragment>
  );
};
