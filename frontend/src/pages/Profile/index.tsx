import { Profile as ProfileForm } from '../../components';
import { useCallback, useContext, useEffect } from 'react';
import { AuthContext } from '../../provider/AppProvider';

const Profile = () => {
  const {user, setUser } = useContext(AuthContext)

  const getProfile = useCallback(
    async () => {

      try {
        const response = await fetch (`https://mock-api.arikmpt.com/api/user/profile`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
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
    <ProfileForm username={user?.username} email={user?.email} />

  );
}
 return null
};

export default Profile;