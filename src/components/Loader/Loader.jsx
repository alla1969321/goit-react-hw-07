import CircleLoader from 'react-spinners/CircleLoader';

const override = {
  display: 'block',
  position: 'absolute',
  top: '30px',
  right: '150px',
  borderColor: 'red',
};

const Loader = () => {
  return (
    <CircleLoader
      size={30}
      cssOverride={override}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;
