import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
    // headers: {  Authorization: `Bearer ${localStorage.getItem('token')}` }
});

const useUserRole = () => {
    const { user} = useContext(AuthContext);


    const {data,isLoading:isAdminLoading}=useQuery({
        queryKey: 'userRole',
        queryFn: async () => {
            const response = await axiosSecure.get(`/user-role/${user?.email}`);
            return response.data.role;
        },
        enabled: !!user,
    })
    return [data, isAdminLoading];
};

export default useUserRole;