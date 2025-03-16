import { useEffect, useState } from "react";
import { get } from "../utils/apiClient";
import { handleError } from "../utils/handlers";
import { Avatar, Button, Title } from "@mantine/core";
import { useNavigate } from "react-router";
import MyBuckets from "./MyBuckets";

const Profile = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      const res = await get('/users/me');
      if (res.error) {
        handleError(res.error);
        return;
      }
      console.log('userid=', res)
      setUserId(res);
    }
    getUserId();
  }, [token]);

  useEffect(() => {
    const getUserData = async () => {
      if (userId == null) return;
      const res = await get(`/users/${userId}/profile`);
      if (res.error) {
        handleError(res.error);
        return;
      }
      console.log('user data=', res)
      setUserData(res);
    };

    getUserData();
    console.log('user data=', userData)
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate('login')
  }

  return (
    <div 
      style={{
        flexDirection: 'column',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '40px',
      }}
    >
      <Avatar 
        src={userData && userData.profileImg ? userData.profileImg : null} 
        alt="You" 
        size={100}
      />
      <div
        style={{
          display: 'flex',
          flexDirection:'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Title>
          {userData && userData.username}
        </Title>
        <Title size={12}>
          {userData && userData.email}
        </Title>
      </div>
      <Button
        onClick={handleLogout}
      >
        Logout
      </Button>
      <MyBuckets />
    </div>
  );
}

export default Profile;
