import PhotoCard from './PhotoCard';

const PhotoGallery = ({ photoFiles }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {photoFiles.map((photo, index) => (
      <PhotoCard key={index} src={photo.default} alt={`Photo ${index + 1}`} />
    ))}
  </div>
);

export default PhotoGallery;
