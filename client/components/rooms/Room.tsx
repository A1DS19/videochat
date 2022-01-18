import React from 'react';
import type { NextPage } from 'next';
import { Room as RoomType } from '../../shared/context/rooms/types';
import Image from 'next/image';
import { Box, Flex, Text } from '@chakra-ui/react';
import buildUrl, { extractPublicId } from 'cloudinary-build-url';
import { useBlurredImageUrl } from '../../shared/hooks/useIMageTransformations';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FacebookShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
} from 'react-share';

interface RoomProps {
  room: RoomType;
}

export const Room: NextPage<RoomProps> = ({ room }): JSX.Element => {
  const publicId = extractPublicId(
    'https://res.cloudinary.com/ai1ds/image/upload/v1642537069/test_ddmsct.gif'
  );

  const roomLink =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3000/room/${room.url_name}`
      : `https://videochat-five.vercel.app/room/${room.url_name}`;

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
      <Box
        ml={'auto'}
        mr={5}
        mt={5}
        maxWidth={'70%'}
        backgroundColor={'#edf2f7'}
        padding={5}
        borderRadius={'lg'}
      >
        <Link href={`/room/${room.url_name}`}>
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
        <Flex>
          <Text mr={1}>Name:</Text>
          <Link href={`/room/${room.url_name}`}>
            <a>
              <Text _hover={{ color: 'gray.600' }} cursor={'pointer'}>
                {room.name}
              </Text>
            </a>
          </Link>
        </Flex>
        <Box mt={2}>
          <Text>Share room</Text>
          <Flex>
            <FacebookShareButton className='share-item' url={roomLink}>
              <FacebookIcon round={true} size={35} />
            </FacebookShareButton>

            <RedditShareButton className='share-item' url={roomLink}>
              <RedditIcon round={true} size={35} />
            </RedditShareButton>

            <TelegramShareButton className='share-item' url={roomLink}>
              <TelegramIcon round={true} size={35} />
            </TelegramShareButton>

            <TwitterShareButton className='share-item' url={roomLink}>
              <TwitterIcon round={true} size={35} />
            </TwitterShareButton>

            <WhatsappShareButton className='share-item' url={roomLink}>
              <WhatsappIcon round={true} size={35} />
            </WhatsappShareButton>
          </Flex>
        </Box>
      </Box>
    </React.Fragment>
  );
};
