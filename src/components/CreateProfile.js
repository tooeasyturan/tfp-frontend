import React, { useState, useEffect } from 'react'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import profilesService from '../services/profiles'
import usersService from '../services/users'
import UserProfile from './MyProfile'
import "../styles/Profile.css"


const CreateProfile = () => {
  const [country, setCountry] = useState('')
  const [region, setRegion] = useState('')
  const [description, setDescription] = useState('')
  const [experience, setExperience] = useState('')
  const [shootingStyle, setShootingStyle] = useState('')
  const [website, setWebsite] = useState('')
  const [socialMedia, setSocialMedia] = useState('')



  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])


  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTFPappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      profilesService.setToken(user.token)
    }
  }, [])

  const username = JSON.parse(window.localStorage.getItem('loggedTFPappUser')).username
  console.log(username)





  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const profile = await profilesService.create({
        country, region, description, experience, shootingStyle, website, socialMedia,
      })

      setProfile(profile)

    } catch (exception) {
      console.log('error')
    }
  }


  const createProfile = () => (
    <div className="profile-wrapper">
      <div className="profile-form-wrapper">
        <h1>Create Profile</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="location">Location</label>
            <CountryDropdown value={country} onChange={(val) => setCountry(val)} />
            <RegionDropdown country={country} value={region} onChange={(val) => setRegion(val)} />
          </div>
          <div className="description">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              value={description}
              className=""
              placeholder="Description"
              name="description"
              noValidate
              onChange={({ target }) => setDescription(target.value)} />
          </div>
          <div className="experience">
            <label htmlFor="experience">Experience</label>
            <input
              type="text"
              value={experience}
              className=""
              placeholder="Experience"
              name="experience"
              noValidate
              onChange={({ target }) => setExperience(target.value)} />
          </div>
          <div className="shootingStyle">
            <label htmlFor="shootingStyle">Shooting Style</label>
            <input
              type="text"
              value={shootingStyle}
              className=""
              placeholder="Shooting Style"
              name="shootingStyle"
              noValidate
              onChange={({ target }) => setShootingStyle(target.value)} />
          </div>
          <div className="website">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              value={website}
              className=""
              placeholder="Website"
              name="website"
              noValidate
              onChange={({ target }) => setWebsite(target.value)} />
          </div>
          <div className="socialMedia">
            <label htmlFor="socialMedia">Social Media</label>
            <input
              type="text"
              value={socialMedia}
              className=""
              placeholder="Social Media"
              name="socialMedia"
              noValidate
              onChange={({ target }) => setSocialMedia(target.value)} />
          </div>
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  )



  return (
    <div>
      {createProfile()}
    </div>
  )

}

export default CreateProfile