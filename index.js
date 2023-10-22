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
/*

<!-- Schedule Section Begin -->
    <section class="schedule-section spad">
        <div class="container">
           
            <div class="row">
                <div class="col-lg-12">
                    <div class="schedule-tab">
                        
                                <div class="st-content">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-lg-3">
                                                <div class="sc-pic">
                                                    <img src="img/schedule/schedule-4.jpg" alt="">
                                                </div>
                                            </div>
                                            <div class="col-lg-5">
                                                <div class="sc-text">
                                                    <h4>Influencing The Influencer</h4>
                                                    <ul>
                                                        <li><i class="fa fa-user"></i> John Smith</li>
                                                        <li><i class="fa fa-envelope"></i> john@Colorlib.com
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="col-lg-4">
                                                <ul class="sc-widget">
                                                    <li><i class="fa fa-clock-o"></i> 08:00 am - 10:00 AM</li>
                                                    <li><i class="fa fa-map-marker"></i> 59 Breanne Canyon Suite, USA
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Schedule Section End -->




*/