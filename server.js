const express = require('express');
const app = express();
const path = requere('path');

app.use(express.static(__dirname + '/dist/Flashcards'));
res.sendFile(path.join(__dirname+'/dist/Flashcards/index.html'));


app.listen(process.env.PORT || 8080);

//PathLocationStrategy
app.get('/*', function(req,res){
    res.sendFile(path.join(__dirname + '/dist/Flashcards/index.html'));
})

console.log('Console listening');

var server = app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log("Express is working on port " + port);
  });