import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import { generateToken } from '../utils/generateToken.js'
import LogOnSession from '../models/userLogonSessionModel.js'

const logSession = asyncHandler(async (id) => {
  const user = id
  const date = Date.now()
  const logDate = new Date(date)

  return await LogOnSession.create({
    user,
    logDate,
  })
})

export const logHistory = asyncHandler(async (req, res) => {
  const log = await LogOnSession.find({})
    .sort({ logDate: -1 })
    .populate('user', ['name', 'username'])
  res.json(log)
})

export const authUser = asyncHandler(async (req, res) => {
  const username = req.body.username.toLowerCase()
  const password = req.body.password

  const user = await User.findOne({ username })
  if (user && (await user.matchPassword(password))) {
    logSession(user._id)
    return res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      isHospital: user.isHospital,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid username or password')
  }
})

export const registerUser = asyncHandler(async (req, res) => {
  const { name, username, password, isHospital, address, fatherName, dob, aadharNo } = req.body
  const userExist = await User.findOne({ username })
  if (userExist) {
    res.status(400)
    throw new Error('User already exist')
  }

  const user = await User.create({
    name,
    username,
    password,
    isHospital,
    address,
    fatherName,
    dob,
    aadharNo
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      isHospital: user.isHospital,
       address : user.address,
       fatherName :user.fatherName,
       dob : user.dob,
       aadharNo :user.aadharNo,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      isHospital: user.isHospital,
      address : user.address,
      fatherName :user.fatherName,
      dob : user.dob,
      aadharNo :user.aadharNo,
    })
  } else {
    res.status(404)
    throw new Error('Invalid username or password')
  }
})

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.username = req.body.username.toLowerCase() || user.username
    user.address = req.body.address || user.address
    user.fatherName = req.body.fatherName || user.fatherName
    user.dob = req.body.dob || user.dob
    user.aadharNo = req.body.aadharNo || user.aadharNo

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      username: updatedUser.username,
      isHospital: updatedUser.isHospital,
      address : user.address,
      fatherName :user.fatherName,
      dob : user.dob,
      aadharNo :user.aadharNo,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('Invalid username or password')
  }
})

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 })

  res.json(users)
})

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (req.params.id == req.user._id) {
    res.status(400)
    throw new Error("You can't delete your own user in the admin area.")
  }

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (req.params.id == req.user._id) {
    res.status(400)
    throw new Error("You can't edit your own user in the admin area.")
  }

  if (user) {
    user.name = req.body.name || user.name
    user.username = req.body.username.toLowerCase() || user.username
    user.address = req.body.address || user.address
    user.fatherName = req.body.fatherName || user.fatherName
    user.dob = req.body.dob || user.dob
    user.aadharNo = req.body.aadharNo || user.aadharNo
    user.isHospital = req.body.isHospital

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      username: updatedUser.username,
      isHospital: updatedUser.isHospital,
      address : user.address,
      fatherName :user.fatherName,
      dob : user.dob,
      aadharNo :user.aadharNo,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
