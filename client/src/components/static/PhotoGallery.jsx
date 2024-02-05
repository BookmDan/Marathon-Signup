import { useState } from 'react';
import { useEffect } from 'react';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 8;

  useEffect(() => {
    // Fetch photos from a certain folder (src/photos/gallery/ in this case)
    const importAll = (r) => r.keys().map(r);
    const photoFiles = importAll('../../photos/gallery/', false, /\.(png|jpg|svg)$/);

    // Map file paths to actual image components
    const photoComponents = photoFiles.map((photo, index) => (
      <img key={index} src={photo.default} alt={`photo-${index}`} />
    ));

    setPhotos(photoComponents);
  }, []);

  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="photo-grid">
        {currentPhotos.map((photo, index) => (
          <div key={index} className="photo-item">
            {photo}
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(photos.length / photosPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
