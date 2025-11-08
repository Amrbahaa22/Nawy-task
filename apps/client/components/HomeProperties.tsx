'use client';
import dynamic from 'next/dynamic';
import { PropertyType } from './types';
import Spinner from './Spinner';
import { v4 as uuidv4 } from 'uuid';
import useFetchProperties from '@/hooks/useFetchProperties';

const DynamicComponent = dynamic(() => import('@components/PropertyCard'), {
  loading: () => <Spinner />,
  ssr: false,
});

const HomeProperties: React.FC = () => {
  const { properties, loading } = useFetchProperties();

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties === undefined || properties.length === 0 ? (
              <p>No Properties Found</p>
            ) : (
              properties.map((property: PropertyType) => (
                <DynamicComponent key={uuidv4()} property={property} />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default HomeProperties;
