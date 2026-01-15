import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="profile">
      <div className="profile-container">
        <h1>Profile</h1>
        <div className="profile-info">
          <div className="profile-field">
            <label>Name:</label>
            <p>{user.name}</p>
          </div>
          <div className="profile-field">
            <label>Email:</label>
            <p>{user.email}</p>
          </div>
          <div className="profile-field">
            <label>Member Since:</label>
            <p>{new Date(user.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
