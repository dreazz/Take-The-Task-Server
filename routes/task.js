const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const mongoose = require('mongoose')

router.get("/", (req, res, next) => {
  Task.find()
    .then((tasks) => {
      res.json(tasks)
      return res.status(200).send();
    })
    .catch(next);

})
// router.post("/", (req, res, next) => {
//   const { title, body, category, status, owner_id } = req.body;
//   Task.create({ title, body, category, status, owner_id })
//     .then(() => {
//       console.log(title, body, category, status, owner_id)
//       res.status(200).send();
//     })
// })

router.post("/", (req, res, next) => {
  const { title, body } = req.body;
  Task.create({ title, body })
    .then(() => {
      console.log(title, body)
      res.status(200).send();
    })
    .catch(next);
})
router.delete('/:task_id', (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.task_id);
  Task.findByIdAndDelete({ _id: id })
    .then(() => res.status(200).send())
    .catch(next);
})

router.put('/:task_id', (req, res, next) => {
  console.log(req.params.task_id)
  const id = mongoose.Types.ObjectId(req.params.task_id);
  const {title,body} = req.body
  Task.findByIdAndUpdate({ _id: id },{title:title,body:body})
  .then(() => {
    res.status(200).send();
  })
})

router.get("/:owner_id", (req, res, next) => {
  Task.find({ owner_id: req.session.currentUSer_id })
    .then((task) => {
      res.json(task)
      return res.status(200).send();
    })
    .catch((error) => {
      res.status(404).json({
        error: 'not-found'
      })
    })


})



module.exports = router;