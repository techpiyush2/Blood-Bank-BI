import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listBloodStore } from '../actions/bloodStoreActions'

import bcVideo from '../assets/videoplayback.mp4'

import Message from '../components/Message'
import Loader from '../components/Loader'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const bloodStoreList = useSelector((state) => state.bloodStoreList)
  const {error, loading } = bloodStoreList

  useEffect(() => {
    dispatch(listBloodStore())
  }, [dispatch])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='d-flex mt-5 row '>
         <div className='mt-5 w-50 h-50  col-12 col-sm-6'>
         <video className = 'w-100 h-100 text-center border border-dark ' src={bcVideo} autoPlay loop muted />
         </div>
         <div className='mt-5 w-35 h-50  col-12 col-sm-6 p-4'>
           <h1>Piyush</h1>
           <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi est illum libero eveniet voluptates consequatur nam natus tenetur voluptatibus repellendus labore, maxime ex.</p>
         </div>
         </div>
      )}
      {}
    </>
  )
}

export default HomeScreen
