import { introspectAccessToken } from '../services/tokenService';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await introspectAccessToken(
          localStorage.getItem('access_token')
        );
        if (response.active) {
          setData(response);
        } else {
          navigate('/logout');
        }
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
  }, [navigate]);

  if (loading) {
    return (
      <div className="container">
        <div className="row mt-5 ">
          <div className="col-md-12">
            <h2>Loading...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <h1>Profile of user</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Profile;
