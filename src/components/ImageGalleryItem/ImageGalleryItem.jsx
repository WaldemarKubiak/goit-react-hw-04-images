import PropTypes from 'prop-types';
import c from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onImageClick }) => {
  return (
    <li className={c.ImageGalleryItem}>
      <img
        className={c.ImageGalleryItem__image}
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => onImageClick(image.largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
