import PhotoGallery from './PhotoGallery';
import running from "../../photos/gallery/5k.jpg";
import drone from "../../photos/gallery/drone.jpg";

const Photos = () => {
  // <PhotoGallery />
  return (
    <div>
      <h2>Photo Gallery</h2>
      <img src={running}/> 
      <img2 src={drone}/> 
    </div>
  );
};

export default Photos;
