const bodyparser = require('body-parser');
const compression = require('compression');
const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);

app.use(compression());
app.use('/jquery', express.static('node_modules/jquery/dist/'));
app.use('/phaser', express.static('node_modules/phaser-ce/build/'));
app.use('/css', express.static('src/client/css'));
app.use('/dist', express.static('dist/client'));
app.use('/assets', express.static('src/client/assets'));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
	if (req.xhr) {
		res.status(500).send({
			error: 'Server Error'
		});
	} else {
		next(err);
	}
});

app.get('/', (request, response) => {
	response.sendFile(path.resolve(__dirname, '../../index.html'));
});

server.listen(process.env.PORT || 8080, function() {
	console.log('Listening on ' + server.address().port);
});