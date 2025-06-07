import { Carousel } from 'react-responsive-carousel';

import banner1 from '@/assets/images/Banner/banner_1.png';
import banner2 from '@/assets/images/Banner/banner_2.png';
import banner3 from '@/assets/images/Banner/banner_3.png';

const Banner = () => {
  return (
    <Carousel
      animationHandler={'slide'}
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
    >
      {BANNER_DATA.map((banner) => (
        <div key={banner.id} className="w-full aspect-[3/1] select-none">
          <img src={banner.image} alt={banner.title} className="object-cover w-full h-full" sizes="100vw" />
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;

const BANNER_DATA = [
  {
    id: 1,
    title: 'Banner 1',
    image: banner1,
    link: '#',
  },
  {
    id: 2,
    title: 'Banner 2',
    image: banner2,
    link: '#',
  },
  {
    id: 3,
    title: 'Banner 3',
    image: banner3,
    link: '#',
  },
];
