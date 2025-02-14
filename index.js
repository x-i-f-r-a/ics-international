const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const socket = require('socket.io')(server)
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'static'));
app.use(express.static(path.join(__dirname, 'static')))

app.get('/', (req, res)=>{

        res.render('index');
});

app.get('/contact-us',(req, res)=>{
    res.render('contact')
})

app.get('/program-schedule',(req, res)=>{
    res.render('schedule')
})

app.get('/speakers',(req, res)=>{
    res.render('speakers')
})

app.get('/committee',(req, res)=>{
    res.render('committee')
})

app.get('/conference-partners',(req, res)=>{
    res.render('cpartners')
})

// app.get('/sponsors',(req, res)=>{
//     res.render('sponsors')
// })

app.get('/about-conference',(req, res)=>{
    res.render('about-conf')
})
app.get('/registration',(req, res)=>{
    res.render('registration')
})
app.get('/venue',(req, res)=>{
    res.render('venue')
})

app.get('/call-for-paper',(req, res)=>{
    res.render('papers')
})
app.get('/current',(req, res)=>{
    res.render('current')
})

server.listen(3000, ()=>{
    console.log("server running on 127.0.0.1:3000")
});

var count = 0;


socket.on('connection', function(client) {
	
	count++;

    // each time a new person connects, send them the old stuff
	client.emit('message', {
		count: count
	});

    // send a welcome
	client.broadcast.emit('message', {count: count, sessionId: client.sessionId})
			
  
	client.on('disconnect', function(){
		count--;
        client.broadcast.emit('message', {count: count, sessionId: client.sessionId});
    });
    
});
