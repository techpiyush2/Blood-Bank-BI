import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [username, setusername] = useState('')
  const [password, setPassword] = useState('')
  const [fatherName, setFatherName] = useState('')
  const [address, setaddress] = useState('')
  const [dob, setdob] = useState('')
  const [aadharNo, setAadharNo] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, success } = userRegister

  useEffect(() => {
    if (success) {
      setName('')
      setusername('')
      setPassword('')
      setConfirmPassword('')
      setFatherName('')
      setaddress('')
      setdob()
      setAadharNo()
    }
  }, [success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      dispatch(register(name, username, password, address, fatherName, dob , aadharNo))
    }
  }
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {success && (
        <Message variant='success'>User has registered successfully</Message>
      )}
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
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
          <label htmlFor='username'>Username</label>
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
            required
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
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Sign Up
        </button>
      </form>

      <div className='row py-3'>
        <div className='col'>
          Have an Account?
          <Link to='/login'> Login</Link>
        </div>
      </div>
    </FormContainer>
  )
}

export default RegisterScreen
