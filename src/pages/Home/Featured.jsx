import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Featured = () => {
    const {data}=useQuery({
        queryKey: 'featured',
        queryFn: async () => {
            const response = await axiosSecure.get(`/featured`);
            return response.data;
        }
    })
    return (
        <div>
            
        </div>
    );
};

export default Featured;