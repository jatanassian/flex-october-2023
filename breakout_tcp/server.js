const net = require('net');
const rocketsData = require('./data.json');

const PORT = 3000;

const server = net.createServer();

server.on('connection', connection => {
	console.log('A client has connected to the server');

	connection.setEncoding('utf-8');

	// Send welcome message to the client
	connection.write('Hello!\nWelcome to the SpaceX rocket database.\nPlease select a rocket from the list below to learn more about it:\n')

	// Set a database of space rockets
	rocketsData.forEach((rocket, index) => {
		connection.write(`Press ${index + 1} for ${rocket.name}.\n`);
	})

	// The server sends the information of the selected rocket
	connection.on('data', data => {
		const selectedRocket = Number(data) - 1;

		if (selectedRocket >= rocketsData.length || selectedRocket < 0 || Number.isNaN(selectedRocket)) {
			connection.write('Invalid rocket number, please select from the options above.')
		} else {
			connection.write(rocketsData[selectedRocket].description);
		}
	})
});

server.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
})