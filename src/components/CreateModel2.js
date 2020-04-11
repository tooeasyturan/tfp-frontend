import React, { useState, useEffect, useContext } from 'react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { Button, Form, Grid, Header, Message, Segment, TextArea, Dropdown, Image, Popup } from 'semantic-ui-react'
import { UserContext } from './UserContext'
import AvatarUpload2 from './AvatarUpload2'



import profilesService from '../services/profiles'

const CreateModel2 = ({ user }) => {


  const options = [
    { key: 'headshot', text: 'Headshot', value: 'headshot' },
    { key: 'dating', text: 'Dating', value: 'dating' },
    { key: 'portrait', text: 'Portrait', value: 'portrait' },
    { key: 'fashion', text: 'Fashion', value: 'fashion' },
    { key: 'family', text: 'Family', value: 'family' },
    { key: 'event', text: 'Event', value: 'event' },
    { key: 'nude', text: 'Nude', value: 'nude' }
  ]

  const [country, setCountry] = useState(user.profile[0].country)
  const [region, setRegion] = useState(user.profile[0].region)
  const [description, setDescription] = useState(user.profile[0].description)
  const [shootingStyle, setShootingStyle] = useState(user.profile[0].shootingStyle)
  const [socialMedia, setSocialMedia] = useState('')
  // const [avatar, setAvatar] = useState(user.avatar[0].avatar)

  const [token, setToken] = useState(null)
  const [profile, setProfile] = useState(null)



  // console.log('FETCHED USER', loggedInUser)

  console.log('user from app avatar', user.profile[0].country)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTFPappUser')
    if (loggedUserJSON) {
      const result = JSON.parse(loggedUserJSON)
      setToken(result)
      profilesService.setToken(result.token)
    }
  }, [])

  // const username = JSON.parse(window.localStorage.getItem('loggedTFPappUser')).username


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const profile = await profilesService.create({
        country, region, description, shootingStyle, socialMedia,
      })

      setProfile(profile)
      console.log('set profile', profile)

    } catch (exception) {
      console.log('error')
    }
  }

  const handleAvatarClick = () => {

  }



  const createModel2 = () => (
    <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh' }}>
      <Grid.Column style={{ maxWidth: 450 }}>
        {/* <Header as='h2' color='teal' textAlign='center'>
          Edit Your Profile
      </Header> */}
        <Form size='large' onSubmit={handleSubmit}>
          <Segment style={{ marginTop: 100 }}>
            <Popup
              trigger={
                // <label htmlFor="image">
                //   <input type="file" name="image" id="image" style={{ display: 'none' }} />
                //   <Image src={avatar} size='huge' rounded centered onClick={handleAvatarClick} />
                // </label>
                <AvatarUpload2 user={user} />
              }
            >
              <Popup.Header>Click to change avatar</Popup.Header>
            </Popup>

            {/* <label htmlFor="image">
              <input type="file" name="image" id="image" style={{ display: 'none' }} />
              <Image src={avatar} size='huge' rounded centered onClick={handleAvatarClick} />
            </label> */}

            <br></br>
            <h1 style={{ fontSize: 16, fontWeight: "bold" }}>Current Location</h1>
            <Form.Group>
              <CountryDropdown value={country} onChange={(val) => setCountry(val)} />
              <RegionDropdown country={country} value={region} onChange={(val) => setRegion(val)} />
            </Form.Group>

            <h1 style={{ fontSize: 16, fontWeight: "bold" }}>About Me</h1>
            <Form.Field
              control={TextArea}
              value={description}
              onChange={({ target }) => setDescription(target.value)}
              placeholder='Tell us more about yourself...'
            />

            <h1 style={{ fontSize: 16, fontWeight: "bold" }}>What types of pictures are you looking for?</h1>
            <Dropdown
              placeholder='Please select at least one type'
              fluid
              multiple selection
              options={options}
              value={shootingStyle}
              // onChange={({ target }) => setStyle(style.concat(target.innerText))}
              onChange={(e, { value }) => setShootingStyle([...value])}
            />
            <br></br>
            <Button color='teal' fluid size='large'>
              Update Profile
          </Button>          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )

  console.log(shootingStyle)



  return (
    <div>
      {createModel2()}


    </div>
  )

}

export default CreateModel2