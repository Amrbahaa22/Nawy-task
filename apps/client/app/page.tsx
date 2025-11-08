import Hero from '@components/Hero';
import HomeProperties from '@components/HomeProperties';
import { ToastContainer } from 'react-toastify';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <HomeProperties />
      <ToastContainer />
    </>
  );
};
export default HomePage;
