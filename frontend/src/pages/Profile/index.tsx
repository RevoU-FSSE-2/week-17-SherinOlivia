import { useNavigate } from 'react-router-dom';
import { Profile as ProfileForm } from '../../components';
import { useCallback, useContext, useEffect } from 'react';
import { AuthContext } from '../../provider/AppProvider';

const Profile = () => {
  const {user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const token = localStorage.getItem('authToken')

  const getProfile = useCallback(
    async () => {

      if(!token){
        navigate('/login')
        return
      }

      try {
        const response = await fetch (`https://mock-api.arikmpt.com/api/user/profile`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
          }
        })
        if(response.ok){
          const data = await response.json()
          console.log("response:", response)
          setUser?.(data.data)
        }
        console.log("Error in Fetching User Data..")
      } catch (error) {
        console.error(error)
      }
    },[setUser])

    useEffect(
      () => {
        getProfile()
      },
      [getProfile])

if(user) {
  return (
    <ProfileForm name={user?.name} email={user?.email} />

  );
}
 return null
};

export default Profile;