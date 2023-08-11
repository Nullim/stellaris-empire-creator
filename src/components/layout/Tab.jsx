import PropTypes from 'prop-types';

const Tab = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`${
        isActive ? 'bg-green-700 text-white' : 'bg-green-900 text-white'
      } py-2 px-4`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Tab;
