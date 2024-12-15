import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CreateUserForm from '../components/CreateUserForm';
import { UserContext } from '../context/UserContext';
import { createUser } from '../services/Api';

function Login() {
    const navigate = useNavigate();
    const { setUsername } = useContext(UserContext);

    const handleCreateUser = async (username, password) => {
        try {
            await createUser(username, password); // CHAMAR API
            console.log('Create successful: ', username);

            setUsername(username);

            // Navigate to the dashboard with user details
            navigate('/dashboard', { state: { username, password } });
        } catch (error) {
            console.error('Create failed:', error.message);
            alert(error.message);
        }
    };

    return (
        <div>
            <Header />
            <h1 className="center-login-header">Login</h1>
            <CreateUserForm onLogin={handleCreateUser} />
        </div>
    );
}

export default Login;