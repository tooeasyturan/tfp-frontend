import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Logout from './Logout'
import DeleteUser from './DeleteUser'
import { Card, Image, Button, Grid, Popup } from 'semantic-ui-react'
import "../styles/UserProfile.css"
import PortfolioUploads from './PortfolioUploads'
import CreateModel from './CreateModel'
import { UserContext } from './UserContext'
import AvatarUpload2 from './AvatarUpload'



const MyProfile = ({ user }) => {
  return (
    <>
      <Grid>
        <Grid.Column>
          <CreateModel user={user} />
          <Button color='teal' size='large' href='/users'>
            Explore Users
          </Button>
          <DeleteUser />
          <PortfolioUploads />
        </Grid.Column>
      </Grid>
    </>
  )
}

export default MyProfile