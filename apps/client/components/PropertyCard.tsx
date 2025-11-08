import Image from 'next/image';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCouch,
} from 'react-icons/fa';
import { PropertyType } from './types';
import Link from 'next/link';

const PropertyCard: React.FC<{ property: PropertyType }> = ({ property }) => {
  // Check if photos exist and if the first photo is a valid URL
  const hasValidPhoto = property.photos &&
                        property.photos.length > 0 &&
                        (property.photos[0].startsWith('http://') ||
                         property.photos[0].startsWith('https://'));

  const imageUrl = hasValidPhoto
    ? property.photos[0]
    : 'https://via.placeholder.com/400x300?text=No+Image';

  return (
    <div className="rounded-xl shadow-md relative">
      <Image
        src={imageUrl}
        alt={property.title || 'Property image'}
        height={0}
        width={0}
        sizes="100vw"
        className="w-full h-auto rounded-t-xl"
      />
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{property.type}</div>
          <h3 className="text-xl font-bold">{property.title}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          ${property.price}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="inline mr-2" /> {property.rooms}{' '}
            <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <FaBath className="inline mr-2" />
            {property.baths} <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="inline mr-2" />
            {property.area} <span className="md:hidden lg:inline">sqft</span>
          </p>
          <p>
            <FaCouch className="inline mr-2" />
            <span className="md:hidden lg:inline">
              {property.furnishingStatus}
            </span>
          </p>
        </div>
        <Link
          href={`/properties/${property.id}`}
          className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
          Details
        </Link>
      </div>
    </div>
  );
};
export default PropertyCard;
