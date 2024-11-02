const http = require("http")
const app = require("./app")

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
	console.log('-------------------------')
	console.log(`Backend is available`)
	console.log(`PORT: ${port}`)
	console.log('-------------------------')
});