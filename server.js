const express = require('express')
const app = express()
const port = 3000

const path = require('path')
path.join(__dirname, '/fish.db')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

////////////////////////////////




app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) 

app.post('/popo', (req, res) => {
  // res.set('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Origin', '*')
  res.send('swag')
  console.log('server log: ', req.body)
  // *** update to the database
  var sqlite3 = require('sqlite3').verbose()
  var db = new sqlite3.Database(path.join(__dirname, '/fish.db'))
  db.serialize(function () {
    db.run(`INSERT INTO FishLocal (Specie, Location) VALUES ('${req.body['name']}', '${req.body['location']}');`)
  })
  db.close()
})

// db.serialize(function () {
//   db.run('CREATE TABLE lorem (info TEXT)')
//   var stmt = db.prepare('INSERT INTO lorem VALUES (?)')

//   for (var i = 0; i < 10; i++) {
//     stmt.run('Ipsum ' + i)
//   }

//   stmt.finalize()

//   db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
//     console.log(row.id + ': ' + row.info)
//   })
// })


// db.close()
