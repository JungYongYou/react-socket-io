import { useEffect, useState } from 'react';
import './navbar.css';
import Notification from '../../img/notification.svg';
import Message from '../../img/message.svg';
import Settings from '../../img/settings.svg';

const Navbar = ({ socket }) => {
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		socket.on('getNotification', (data) => {
			setNotifications((prev) => [...prev, data]);
		});
	}, [socket]);

	console.log(notifications);

	return (
		<div className="navbar">
			<span className="logo">React Socket io</span>
			<div className="icons">
				<div className="icon">
					<img src={Notification} className="iconImg" alt="" />
					<div className="counter">2</div>
				</div>
				<div className="icon">
					<img src={Message} className="iconImg" alt="" />
					<div className="counter">2</div>
				</div>
				<div className="icon">
					<img src={Settings} className="iconImg" alt="" />
					<div className="counter">2</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
