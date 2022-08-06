const express = require('express')
const mongoose = require('mongoose')
const crypto = require('crypto')
const { GridFsStorage } = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const path = require('path')
const multer = require('multer')

const Stadium = require('../models/stadium')
const stadium = require('../controllers/stadiumFunctions')
const list = require('../controllers/showAll')
const User = require('../models/user')

const router = express.Router()



router.get('/add/:email', stadium.show)

router.get('/skip', (req,res) => {
    res.redirect('/')
})

router.post('/add', stadium.add)

router.get('/showAll/:page', list.show)

//
const conn = mongoose.createConnection('mongodb://localhost/Arena-Booking')

let gfs;

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('uploads')
    module.exports = gfs;
})

const storage = new GridFsStorage({
    url: 'mongodb://localhost/Arena-Booking',
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage });


router.post('/upload/:name', upload.single('file'), async (req,res) => {
    const name = req.params.name
    const stadium = await Stadium.findOne({name: name})
    const email = stadium.email
    stadium.images.push(req.file.filename)
    await stadium.save()
    const person = await User.findOne({email:email}) 
    res.render('admin-profile',{user: person})
    //console.log(req.file)
    //console.log(stadium)
})

router.get('/book/:name', (req,res) => {
  const name = req.params.name
  res.render('book-event',{ name: name})
})

router.post('/book', stadium.book)

router.get('/view/:lon/:lat', (req,res) => {
  const lan = req.params.lon
  const lat = req.params.lat
  res.render('map', {lan:lan, lat:lat})
})

router.post('/search', async (req,res) => {
  const search = req.body.search
  console.log(search)
  const stadiums =await  Stadium.find()
  //console.log(stadiums)
  res.send(stadiums)
})

router.get('/bookedSlots/:name', stadium.slots)

router.get('/myStadium/:email', async (req,res) => {
  const email = req.params.email
  const stadiums = await  Stadium.find({ email: email })

   gfs.files.findOne({filename: 'ab25c7be3ac37a1d763265a32bf60932.png'}, (err, files) => {
      
    if(!files || files.length === 0) console.log(err)

    return res.send(files)
  }) 
  
  //res.render('my-stadium', { stadiums: stadiums})
})

router.get('/myStadiumSlots/:name', stadium.myStadiumSlots)

router.get('/eventDetails/:time', stadium.details)



module.exports = router