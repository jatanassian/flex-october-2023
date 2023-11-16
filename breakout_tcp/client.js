const net = require('net');

const client = net.createConnection({ host: 'localhost', port: 3000 });

client.setEncoding('utf-8')

// Display text from server
client.on('data', data => {
	console.log(data);
})

// Select a rocket number
process.stdin.on('data', data => {
	client.write(data);
})