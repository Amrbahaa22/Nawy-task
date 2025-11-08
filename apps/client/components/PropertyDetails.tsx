import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTimes,
  FaCheck,
} from 'react-icons/fa';
import { PropertyType } from './types';

const PropertyDetails: React.FC<{ property: PropertyType }> = ({
  property,
}) => {
  return (
    <main>
      <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
        <div className="text-gray-500 mb-4">{property.type}</div>
        <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
        <div className="mb-4 font-bold text-blue-500">Price: {property.price}$</div>
        {/* <div className="text-2xl font-bold text-white mb-2 p-4">
            
          </div> */}
        {/* <div className="mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0 bg-blue-500 w-[150px] rounded-lg">
         
        </div> */}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Description & Details</h3>
        <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
          <p>
            <FaBed className="inline-block mr-2" /> {property.rooms}{' '}
            <span className="hidden sm:inline">Beds</span>
          </p>
          <p>
            <FaBath className="inline-block mr-2" /> {property.baths}{' '}
            <span className="hidden sm:inline">Baths</span>
          </p>
          <p>
            <i className="fa-solid fa-ruler-combined"></i>
            <FaRulerCombined className="inline-block mr-2" />
            {property.area} <span className="hidden sm:inline">sqft</span>
          </p>
        </div>
        <p className="text-gray-500 mb-4 text-center">{property.description}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Amenities</h3>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none space-y-2">
          {property.amenities.map((amenity, index) => (
            <li key={index}>
              <FaCheck className="inline-block text-green-600 mr-2" /> {amenity}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};
export default PropertyDetails;
