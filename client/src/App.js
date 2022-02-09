import { useState } from 'react';
import './App.css';

function App() {
	const [username, setUsername] = useState('');
	const [user, setUser] = useState('');

	return (
		<div className="container">
			<div className="login">
				<input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
				<button onClick={() => setUser(username)}>Login</button>
			</div>
		</div>
	);
}

export default App;
