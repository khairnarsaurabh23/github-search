//configure server for heroku deploy
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/github-login'));
app.get('/*', function(req,res) {
	res.sendFile(path.join(__dirname+'/dist/github-login/index.html'));
});

//set the port
app.listen(process.env.PORT || 8080);