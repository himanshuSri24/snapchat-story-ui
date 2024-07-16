import img1 from "../assets/images/snap-img-1.jpg";
import img2 from "../assets/images/snap-img-2.jpg";
import img3 from "../assets/images/snap-img-3.jpg";
import vid1 from "../assets/videos/vid-test.mp4";

const defaultImages = [img1, img2, img3];

export const getImageArray = (numberOfImages) => {
  const images = [];
  for (let i = 0; i < numberOfImages; i++) {
    images.push(defaultImages[i % defaultImages.length]);
  }
  return images;
};

export const getVideo = () => {
  return [vid1];
};
