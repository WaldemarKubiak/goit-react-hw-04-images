import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import c from './ImageGallery.module.css';

export const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={c.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onImageClick={onImageClick}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
