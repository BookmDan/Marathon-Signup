
const PhotoCard = ({ src, alt }) => (
  <div style={{ margin: '10px', textAlign: 'center' }}>
    <img src={src} alt={alt} style={{ width: '100%', height: 'auto' }} />
  </div>
);

export default PhotoCard;
