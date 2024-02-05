import{ useState } from 'react';

const PhotoGallery = ({ photoFiles }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 8;

  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photoFiles.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="photo-grid">
        {currentPhotos.map((photo, index) => (
          <div key={index} className="photo-item">
            <img src={photo.default} alt={`photo-${index}`} />
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(photoFiles.length / photosPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
