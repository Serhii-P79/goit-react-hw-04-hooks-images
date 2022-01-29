import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components';
import './ImageGallery.scss';

export function ImageGallery({ images, onClick }) {
  return (
    <ul className="ImageGallery">
      {images.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onClick={onClick}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
};
