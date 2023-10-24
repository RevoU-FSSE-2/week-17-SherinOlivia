import { useNavigate } from 'react-router-dom';
import { LoginInfo } from '../../types';
import { Login as LoginForm } from '../../components';

const Login = () => {
  const navigate = useNavigate()
  const apiUrl = "https://w17sh-backend-img-cifhetjmdq-uw.a.run.app/api/users/login"
  
  const handleLogin = async (values: LoginInfo) => {

    console.log(`Successfully logged in`, values)
    try {
        const response = await fetch (apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(values)
        })
        console.log(response)
        
        if (response.ok){
          const data = await response.json()
          if (data.success) {
            navigate('/dashboard');
          } else {
            console.log(data.message); 
          } 
        } else {
          alert("Login failed. Please check your credentials.");
        }

    } catch (error) {
        console.error(error)
        alert("Login Failedddd...!")
    }

  }

  return (
    <LoginForm onSubmit={handleLogin} />

  );
};

export default Login;