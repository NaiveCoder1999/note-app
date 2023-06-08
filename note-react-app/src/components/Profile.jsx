import {
  introspectAccessToken,
  checkAccessToken,
} from '../services/tokenService';
import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await introspectAccessToken(
          localStorage.getItem('access_token')
        );
        // const response = await checkAccessToken(
        //   localStorage.getItem('access_token')
        // );
        setData(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Profile of user</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Profile;
