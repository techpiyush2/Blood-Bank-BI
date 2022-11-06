import asyncHandler from 'express-async-handler'
import BloodStoreModel from '../models/bloodStoreModel.js'

export const getBloodStore = asyncHandler(async (req, res) => {
  const bloodStore = await BloodStoreModel.find()
    .sort({ createdAt: -1 })
    .populate('user', ['name'])

  res.json(bloodStore)
})

export const postBloodStore = asyncHandler(async (req, res) => {
  const user = req.user.id
  const donor = req.body.donor
  const disease = req.body.disease
  const aadhar = req.body.aadhar
  const blood_group = req.body.blood_group
  const donateDate = req.body.donateDate
  const active = req.body.active



  const bloodStoreFields = {
    user,
    donor,
    disease,
    donateDate,
    blood_group,
    aadhar,
    active,
  }

  const bloodStore = new BloodStoreModel(bloodStoreFields)
  await bloodStore.save()

  if (bloodStore) {
    res.status(201).json(bloodStore)
  } else {
    res.status(400)
    throw new Error('Internal Server Error')
  }
})

export const putBloodStore = asyncHandler(async (req, res) => {
  const user = req.user.id
  const donor = req.body.donor
  const disease = req.body.disease
  const aadhar = req.body.aadhar
  const blood_group = req.body.blood_group
  const donateDate = req.body.donateDate
  const active = req.body.active

  const bloodStoreFields = {
    user,
    donor,
    disease,
    donateDate,
    blood_group,
    aadhar,
    active,
  }

  const bloodStore = await BloodStoreModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: bloodStoreFields }
  )

  if (bloodStore) {
    res.status(201).json(bloodStore)
  } else {
    res.status(400)
    throw new Error('Internal Server Error')
  }
})

export const deleteBloodStore = asyncHandler(async (req, res) => {
  const bloodStore = await BloodStoreModel.findOneAndRemove({
    _id: req.params.id,
  })

  if (bloodStore) {
    res.json(bloodStore)
  } else {
    res.status(400)
    throw new Error('Invalid ID')
  }
})
