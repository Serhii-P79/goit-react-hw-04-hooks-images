import PropTypes from 'prop-types';
import './ImageGalleryItem.scss';

export function ImageGalleryItem({ webformatURL, largeImageURL, onClick }) {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt=""
        onClick={() => {
          onClick(largeImageURL);
        }}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
