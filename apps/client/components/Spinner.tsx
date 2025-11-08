import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};

const Spinner: React.FC = () => {
  return (
    <ClipLoader
      color="#3b82f6"
      loading
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};
export default Spinner;
