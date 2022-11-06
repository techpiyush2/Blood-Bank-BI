import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [username, setusername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fatherName, setFatherName] = useState('')
  const [address, setaddress] = useState('')
  const [dob, setdob] = useState('')
  const [aadharNo, setAadharNo] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!user?.name) {
      dispatch(getUserDetails('profile'))
    } else {
      setName(user.name)
      setusername(user.username)
      setFatherName(user.fatherName)
      setaddress(user.address)
      setdob(user.dob)
      setAadharNo(user.aadharNo)
    }
  }, [dispatch, history, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, username, password, address, fatherName, dob , aadharNo }))
    }
  }
  return (
    <FormContainer>
      <h2>User Profile</h2>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {success && <Message variant='success'>Profile Updated </Message>}
      {loading && <Loader></Loader>}
      <form onSubmit={submitHandler}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            placeholder='Enter name'
            className='form-control'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='username'>username Address</label>
          <input
            type='username'
            placeholder='Enter username'
            className='form-control'
            value={username}
            onChange={(e) => setusername(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Father Name</label>
          <input
            type='text'
            placeholder='Enter father name'
            className='form-control'
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            required
          />
        </div>  <div className='form-group'>
          <label htmlFor='name'>Address</label>
          <input
            type='text'
            placeholder='Enter address'
            className='form-control'
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            required
          />
        </div>  <div className='form-group'>
          <label htmlFor='name'>Date Of Birth</label>
          <input
            type='date'
            placeholder='Enter date of birth'
            className='form-control'
            value={dob}
            onChange={(e) => setdob(e.target.value)}
            required
          />
        </div>  <div className='form-group'>
          <label htmlFor='name'>Aadhar Number</label>
          <input
            type='number'
            placeholder='Enter Aadhar Number'
            className='form-control'
            value={aadharNo}
            onChange={(e) => setAadharNo(e.target.value)}
            required
          />
          </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='Enter password'
            className='form-control'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            placeholder='Confirm password'
            className='form-control'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Update
        </button>
      </form>
    </FormContainer>
  )
}

export default ProfileScreen
