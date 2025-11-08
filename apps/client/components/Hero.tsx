import { Flex } from 'antd';
import PropertySearchForm from './PropertySearchForm';

const Hero:React.FC = () => {
  return (
    <section className="bg-blue-700 py-20 mb-4">
      <Flex
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        vertical
        justify="center"
      >
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Find The Perfect Rental
          </h1>
          <p className="my-4 text-xl text-white">
            Discover the perfect property that suits your needs.
          </p>
        </div>
        <div>
          <PropertySearchForm />
        </div>
      </Flex>
    </section>
  );
};
export default Hero;
