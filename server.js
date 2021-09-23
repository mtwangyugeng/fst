// express init
const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('new fishlocal', (msg) => {
      console.log('message: ' + msg);
      io.emit('new fishlocal', msg);
    });
  socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});

http.listen(4001, () => {
console.log('listening on *:4001');
});


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


// FishLocal : {Specie, Size, Lat, lng}
app.get('/alldata', (req, res) => {
  console.log('alldata')
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

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) 

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
  res.send('swag')
})

app.post('/fishinfo', (req, res) => {
  console.log('reeeeeeeeeeeeeeeeeeeeeeeeeeeeee', req.body['Specie'])
  var db = new sqlite3.Database(path.join(__dirname, '/fish.db'))
  db.serialize(function () {
    db.get(`SELECT * FROM AllFishes WHERE Specie = ${req.body['Specie']};`,function (err, row) {
      console.log('reeeeeeeeeeeeeeeeeeeeeeeeeeeeee', row)
      res.send(row)
    }
    )
  })
  db.close()
})