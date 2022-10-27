import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HomeScreen from '../../screens/HomeScreen'
import LoginScreen from '../../screens/LoginScreen'
import ProfileScreen from '../../screens/ProfileScreen'
import UserListScreen from '../../screens/UserListScreen'
import BloodStoreScreen from '../../screens/BloodStoreScreen'
import BloodRequestScreen from '../../screens/BloodRequestScreen'
import NotFound from '../NotFound'
import UserLogHistoryScreen from '../../screens/LogHistoryScreen'

import PrivateRoute from '../routes/PrivateRoute'
import AdminPrivateRoute from '../routes/AdminPrivateRoute'
import BloodIssueScreen from '../../screens/BloodIssueScreen'
import CommentScreen from '../../screens/CommentScreen'
import ReportScreen from '../../screens/ReportScreen'

const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <Route path='/login' component={LoginScreen} />
        <Route path='/admin/report' component={ReportScreen} />
        <Route
          path='/admin/users/logs'
          component={UserLogHistoryScreen}
        />
        <Route path='/comment' component={CommentScreen} />
        <Route path='/profile' component={ProfileScreen} />
        <Route path='/blood-issue/:id' component={BloodIssueScreen} />
        <Route exact path='/blood-store' component={BloodStoreScreen} />
        <Route
          path='/blood-store/page/:pageNumber'
          component={BloodStoreScreen}
        />
        <Route
          exact
          path='/blood-request'
          component={BloodRequestScreen}
        />
        <Route
          path='/blood-request/page/:pageNumber'
          component={BloodRequestScreen}
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
