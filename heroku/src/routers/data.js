const express = require('express')
const Data = require('../models/data')
const router = new express.Router()
const multer = require('multer')
const sharp = require('sharp')
const auth = require('../middleware/auth')

//Create
router.post('/create', auth, async(req, res) => {
  const obj = { owner: req.user._id }
  req.body.forEach((value, i) => {
    obj[`value${i}`] = value
  })
    const data = new Data(obj)
    await data.save()
    res.status(200).send('success')
  }, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

//Get All Data
router.get('/getAll', auth, async (req, res) => {
  const match = {}
  const sort = {}
  if (req.query.completed) {
    match.completed = req.query.completed === "true"
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":")
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1
  }
  try {
    await req.user.populate({
      path: "datas",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    })
    res.send(req.user.datas)
  } catch (error) {
    res.status(404).send(error)
  }
})

//Get Data By Id
router.get('/get/:id', auth, async (req, res) => {
  const _id = req.params.id
  try {
    const data = await Data.findOne({ owner: req.user._id, _id })
    if (!data) {
      return res.status(404).send()
    }
    res.status(201).send(data)
  } catch (error) {
    res.status(500).send()
  }
})

//Delete Data
// router.delete('/delete/:id', auth, async (req, res) => {
//     try {
//         const deleteData = await Data.findByIdAndDelete(req.params.id)
//         if (!deleteData) return res.status(404).send()
//         res.status(200).send('deleted')
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

//Multer Configs
// const upload = multer({
//     limits: { fileSize: 10485760 },
//     fileFilter(req, file, cb) {
//         if(!file.originalname.match(/\.(jpg|jpeg|png|PNG|JPG|JPEG)$/)) {
//             return cb(new Error('Please upload an image file(.jpg .png . jpeg'))
//         }
//         cb(undefined, true)
//     }
// })

//Uploading Data
// router.post('/image', auth, upload.array('imagesFile', 20), async (req, res) => {
//     let arr = []
//     for await (const image of req.files) {
//         let buffer = await sharp(image.buffer).resize({width:250,height:250}).png().toBuffer()
//         arr.push({image: buffer})
//     };
//     const data = new Data({
//         latitude: req.body.latitude,
//         longitude: req.body.longitude,
//         images: arr,
//         owner: req.user._id
//     })
//     await data.save()
//     res.status(200).send('success')
// }, (error, req, res, next) => {
//     res.status(400).send({error: error.message})
// })

//Serving Image
// router.get('/display/:id', auth, async (req, res) => {
//     try {
//         const data = await Data.findById(req.params.id)
//         if(!data || !data.images) throw new Error('')
//         let arr = []
//         data.images.forEach(image => arr.push(Buffer.from(image.image, "base64")))
//         const formatedImages = arr.map(buffer => {
//             return `data:image/png;base64,${buffer.toString("base64")}`
//           })
//         res.send(formatedImages)
//     } catch (error) {
//         res.status(404).send(error)        
//     }
// })

module.exports = router