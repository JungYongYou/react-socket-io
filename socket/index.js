import { Server } from 'socket.io';

const io = new Server({
	cors: {
		origin: 'http://localhost:3000',
	},
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
	console.log('addNewUser username: ', username);
	console.log('addNewUser socketId: ', socketId);
	!onlineUsers.some((user) => user.username === username) && onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
	onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
	console.log('getUser username: ', username);
	console.log(
		'getUser onlineUsers.find((user) => user.username === username): ',
		onlineUsers.find((user) => user.username === username),
	);
	return onlineUsers.find((user) => user.username === username);
};

io.on('connection', (socket) => {
	socket.on('newUser', (username) => {
		addNewUser(username, socket.id);
	});

	socket.on('sendNotification', ({ senderName, receiverName, type }) => {
		console.log('sendNotification senderName: ', senderName);
		console.log('sendNotification receiverName: ', receiverName);
		console.log('sendNotification type: ', type);
		const receiver = getUser(receiverName);
		io.to(receiver.socketId).emit('getNotification', {
			senderName,
			type,
		});
	});

	socket.on('disconnect', () => {
		removeUser(socket.id);
	});
});

io.listen(5000);
