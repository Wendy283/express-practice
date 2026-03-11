const express = require('express');

const app = express();

app.use(express.urlencoded({extended:false}));

app.get('/currenttime', function(req, res) {
    res.send('<h1>' + new Date().toISOString() + '</h1>');
}); // localhost:3000/currenttime


app.get('/', function(req, res){
    res.send(
        '<form action="/store-user" method="POST">' +
        '<label>Your Name</label>'+
        '<input type="text" name="userName">' +
        '<button type="submit">Submit</button>' +
        '</form>'
    );

}); //localhost:3000

app.post('/store-user', function(req, res){
    const userName = req.body.userName;
    console.log(userName);
    res.send('<h1>Username stored!</h1>');
});

app.listen(3000);