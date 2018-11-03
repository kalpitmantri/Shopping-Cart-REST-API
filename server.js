const http = require('http');
const app = require('./app');

const server = http.createServer(app);

var port = process.env.PORT || 3000;

server.listen(3000,()=>{
	console.log(`Server is listening on port ${port}`);
});