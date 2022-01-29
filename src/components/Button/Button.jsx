import PropTypes from 'prop-types';
import './Button.scss';

export function Button({ onClick }) {
  return (
    <button type="button" className="Button visually-hidden" onClick={onClick}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
