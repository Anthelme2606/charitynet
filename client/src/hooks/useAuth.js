import React from 'react';
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from '../lib/queries';

const UseAuth = () => {
  const { loading, error, data } = useQuery(CURRENT_USER, {
    fetchPolicy: 'cache-first',
  });

  if (loading) return null; 
  if (error) {
    console.log("Error fetching data:", error);
    return null; 
  }

  return data; 
};

export default UseAuth;
