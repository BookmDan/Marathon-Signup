// import { useState, useEffect } from 'react';
// import PhotoGallery from './PhotoGallery';
import running from "../../photos/gallery/5k.jpg";
import drone from "../../photos/gallery/drone.jpg";

// const Photos = () => {
//   const [photoFiles, setPhotoFiles] = useState([]);

//   useEffect(() => {
//     const importPhotos = async () => {
//       const context = context('../../photos/gallery/', false, /\.(png|jpe?g|svg)$/);
//       const photos = await Promise.all(context.keys().map(context));
//       setPhotoFiles(photos);
//     };

//     importPhotos();
//   }, []);

//   return (
//     <div>
//       <h2>Photo Gallery</h2>
//       <PhotoGallery photoFiles={photoFiles} />
//     </div>
//   );
// };



// <PhotoGallery photoFiles={photoFiles} /> 
const Photos = () => {
  return (
    <div>
      <h2>Photo Gallery</h2>
      <img src={running}/> 
      <img2 src={drone}/> 
    </div>
  );
};
export default Photos;
