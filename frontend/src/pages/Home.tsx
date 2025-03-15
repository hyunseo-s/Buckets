import { Button } from '@mantine/core';
import { useNavigate } from 'react-router';

const Home = () => {
	const navigate = useNavigate();
	return (
		<>
			<Button onClick={() => navigate('/login')} variant="filled">Login</Button>
		</>
	)
}

export default Home;