import { useState, useEffect } from 'react'

const Home = () => {
  const [shows, setShows] = useState([])
  const [showName, setShowName] = useState('')

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=girls')
      .then(response => response.json())
      .then(data => setShows(data))
      .catch(error => console.log(error))
  }, [])

  const handleInputChange = (event) => {
    setShowName(event.target.value)
  }

  const handleClickButton = () => {
    console.log('handleClickButton', showName)

    fetch('https://api.tvmaze.com/search/shows?q=' + showName)
      .then(response => response.json())
      .then(data => setShows(data))
      .catch(error => console.log(error))
  }

  return (
    <>
      <div className='container'>
        <h1>Shows</h1>

        <form className='form-inline my-2 my-lg-0 w-75'>
          <input type='text' className='form-control' id='search' placeholder='Enter name' onChange={handleInputChange} />
          <button type='button' className='btn btn-outline-primary' onClick={handleClickButton}>Buscar</button>
        </form>

        <div className='row'>
          {shows.map(show => (
            <div className='col-sm-4 mb-4' key={show.score}>
              <div className='card'>
                <img className='card-img-top' src={show.show.image?.medium} alt={show.name} />
                <div className='card-body'>
                  <h4 className='card-title'>{show.show.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
