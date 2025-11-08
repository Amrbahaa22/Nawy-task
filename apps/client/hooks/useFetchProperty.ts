'use client';
import { PropertyType } from '@/components/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const useFetchProperty = (id: string) => {
  const [property, setProperty] = useState<PropertyType>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:8000/v1';
        const res = await axios.get<PropertyType>(
          `${apiUrl}/apartment/${id}`
        );
        setProperty(res.data);
        toast.success('Property found');
      } catch (error: any) {
        setIsError(true);
        setError(error);
        toast.error('Property not found');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  return { property, loading: isLoading, isError, error };
};
export default useFetchProperty;
