const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/adc', (req, res) => {
    res.send('swag')
    console.log('high')
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

////////////////////////////////
const path = require('path')
path.join(__dirname, '/fish.db')

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(path.join(__dirname, '/fish.db'))

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


db.close()
