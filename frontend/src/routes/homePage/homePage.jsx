import { useContext } from 'react'
import SearchBar from '../../components/searchBar/SearchBar'
import './homePage.scss'
import { AuthContext } from '../../context/AuthContext'

function HomePage(){

  const {currentUser} = useContext(AuthContext)

  // console.log(currentUser);
  
  return (
    <div className='homePage'>
      <div className="textContainer">
        <div className="wraper">
          <h1 className='title'>Find Real Estate & Get Your Dream Place
          </h1>
            <p>
            Welcome to EstateLink, your go-to platform for buying, selling, and renting real estate. Explore a range of properties with expert guidance and personalized service to find your perfect home or investment.
            </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years Of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Awards Gained</h2>
            </div>
            <div className="box">
              <h1>1200+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>

        </div>
      </div>
      <div className="imgContainer">
        <img src='/bg.png' alt='' />
      </div>
    </div>
  )
}

export default HomePage