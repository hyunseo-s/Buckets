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
      setUserId(res.id);
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
    navigate('/login')
  }

  return (
    <div 
      style={{
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '40px',
        marginTop: '150px'
      }}
    >
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '20vh',
          alignItems: 'center',
        }}
      >
        <Avatar 
          src={userData && userData.profileImg ? userData.profileImg : null} 
          alt="You" 
          size={200}
        />
      </div>
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#D5EEFF',
          marginTop: '100px',
          marginRight: '50px',
          borderRadius: '5px',
          height: "50vh",
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection:'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '40px'
          }}
        >
          <Title>
            Your Profile:
          </Title>
          <div>
            <Title size={25}>
              Username: {userData && userData.username}
            </Title>
            <Title size={25}>
              Email: {userData && userData.email}
            </Title>
          </div>
          <Button
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>

      </div>

    </div>
  );
}

export default Profile;
