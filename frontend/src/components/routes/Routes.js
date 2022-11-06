import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HomeScreen from '../../screens/HomeScreen'
import LoginScreen from '../../screens/LoginScreen'
import ProfileScreen from '../../screens/ProfileScreen'
import UserListScreen from '../../screens/UserListScreen'
import BloodStoreScreen from '../../screens/BloodStoreScreen'
import NotFound from '../NotFound'
import Register from '../../screens/RegisterScreen'
import PrivateRoute from '../routes/PrivateRoute'
import AdminPrivateRoute from '../routes/AdminPrivateRoute'

const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <Route path='/login' component={LoginScreen} />
        <Route path='/register' component={Register} />
        <PrivateRoute path='/profile' component={ProfileScreen} />
        <PrivateRoute exact path='/blood-store' component={BloodStoreScreen} />
        <PrivateRoute
          path='/blood-store/page/:pageNumber'
          component={BloodStoreScreen}
        />
        <AdminPrivateRoute
          exact
          path='/admin/users'
          component={UserListScreen}
        />
        <AdminPrivateRoute
          path='/admin/users/page/:pageNumber'
          component={UserListScreen}
        />

        <Route exact path='/' component={HomeScreen} />
        <Route component={NotFound} />
      </Switch>
    </section>
  )
}

export default Routes
