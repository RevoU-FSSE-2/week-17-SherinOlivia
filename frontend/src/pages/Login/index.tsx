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
        const data = await response.json()

        if (response.ok){
            const token = data.data.token

            localStorage.setItem('authToken', token)
            navigate('/');
        } else {
            alert(data.errors)
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