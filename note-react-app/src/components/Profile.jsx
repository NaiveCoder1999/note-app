import { introspectAccessToken } from '../services/tokenService';
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
        setData(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    function refreshPage() {
      window.location.reload();
    }
    // Set up the interval to refresh the page
    const intervalId = setInterval(refreshPage, 300000); // 300 seconds
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
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
