import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Table } from 'react-bootstrap';
import { useAuth } from '../providers/AuthContext';
import {
  getLocalAccessToken,
  introspectAccessToken,
} from '../services/tokenService';

const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { loginUserName } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await introspectAccessToken(getLocalAccessToken());
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
        <div className="container col-md-12">
          <h2>Notes loading...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="container col-md-12">
          <h5>Error - {error}</h5>
        </div>
      </div>
    );
  }

  const {
    active,
    sub,
    aud,
    nbf,
    scope,
    authority,
    iss,
    exp,
    iat,
    email,
    client_id,
    token_type,
  } = data;
  return (
    <div className="container">
      <h3>Profile of {loginUserName}</h3>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <Card>
        <Card.Header>Profile Information</Card.Header>
        <Card.Body>
          <Table responsive>
            <tbody>
              <tr>
                <th>Active</th>
                <td>{active ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <th>Subject</th>
                <td>{sub}</td>
              </tr>
              <tr>
                <th>Audience</th>
                <td>{aud.join(', ')}</td>
              </tr>
              <tr>
                <th>Not Before</th>
                <td>{new Date(nbf * 1000).toLocaleString()}</td>
              </tr>
              <tr>
                <th>Scope</th>
                <td>{scope}</td>
              </tr>
              <tr>
                <th>Authority</th>
                <td>{authority.join(', ')}</td>
              </tr>
              <tr>
                <th>Issuer</th>
                <td>{iss}</td>
              </tr>
              <tr>
                <th>Expiration</th>
                <td>{new Date(exp * 1000).toLocaleString()}</td>
              </tr>
              <tr>
                <th>Issued At</th>
                <td>{new Date(iat * 1000).toLocaleString()}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{email}</td>
              </tr>
              <tr>
                <th>Client ID</th>
                <td>{client_id}</td>
              </tr>
              <tr>
                <th>Token Type</th>
                <td>{token_type}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
