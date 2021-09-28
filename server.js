// express init
const express = require('express')
const app = express()


//socket.io essencials
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('server online', 'server now online');

  socket.on('new location', (msg) => { //TODO: no need to refresh all, just update what the user updated
    
    console.log('message: ' + msg);
    //tell all users a new fishlocal is added
    io.emit('new location', msg);
  });

  // one of user tells you a new fishlocal is added
  socket.on('new fishlocal', (msg) => { //TODO: no need to refresh all, just update what the user updated
      //TODO: msg contains user id
      console.log('message: ' + msg);
      //tell all users a new fishlocal is added
      io.emit('new fishlocal', msg);
    });
  socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});
// port for socket connection
http.listen(4001, () => {
  console.log('listening on *:4001');
});

// proxy server OK
const port = 4000
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '/index.html'))
// })



const path = require('path')
// using SQLite3 library
var sqlite3 = require('sqlite3').verbose()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) 

// AllLocations = {ID, Name, Lat, Lng, Description}
app.get('/AllLocations',(req, res) =>{
  console.log('Getting location data...');
  var db = new sqlite3.Database(path.join(__dirname, '/fish.db'));
  var finale = ''
  db.each('SELECT * FROM AllLocations;', function (err, row) {
    finale += JSON.stringify(row) + '|'
  }, function () {
    res.send(finale)
  }
  )
  db.close()
})

// FishLocal : {SpecieID, Size, Lat, lng}
app.get('/FishLocal', (req, res) => {
  console.log('Get FishLocal')
  var db = new sqlite3.Database(path.join(__dirname, '/fish.db'))
  var finale = ''
  db.each('SELECT * FROM FishLocal;', function (err, row) {
    // console.log('rowwww', typeof row ,"ed")
    finale += JSON.stringify(row) + '|'
    // console.log(finale)
  }, function () {
    res.send(finale)
  }
  )
  db.close()

})



// posting new data
app.post('/popo', (req, res) => {
  // res.set('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Origin', '*')
  
  console.log('server log: ', req.body)
  // *** update to the database
  var db = new sqlite3.Database(path.join(__dirname, '/fish.db'))
  db.serialize(function () {
    db.run(`INSERT INTO FishLocal (Specie, Size, Lat, Lng) VALUES ('${req.body['Specie']}', '${req.body['Size']}', '${req.body['Lat']}', '${req.body['Lng']}');`)
  })
  db.close()
  res.send('Insertion of fishlocal completed successfully.')
})

// posting new data
app.post('/postNewLocation', (req, res) => {
  // res.set('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Origin', '*')
  
  console.log('server log: ', req.body)
  // *** update to the database
  var db = new sqlite3.Database(path.join(__dirname, '/fish.db'))
  db.serialize(function () {
    db.run(`INSERT INTO AllLocations (Name, Lat, Lng, Description) VALUES ('${req.body['Name']}', '${req.body['Lat']}', '${req.body['Lng']}', '${req.body['Description']}');`)
  })
  db.close()
  res.send('Insertion of Location completed successfully.')
})

app.post('/fishinfo', (req, res) => {
  var db = new sqlite3.Database(path.join(__dirname, '/fish.db'))
  db.serialize(function () {
    db.get(`SELECT * FROM AllFishes WHERE Specie = ${req.body['Specie']};`,function (err, row) {
      res.send(row)
    }
    )
  })
  db.close()
})