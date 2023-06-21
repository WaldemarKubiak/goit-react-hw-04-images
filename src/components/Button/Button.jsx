import PropTypes from 'prop-types';
import c from './Button.module.css';

export const Button = ({ value, onClick }) => {
  return (
    <button className={c.Button} type="button" onClick={onClick}>
      {value}
    </button>
  );
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  value: 'Next page',
};
