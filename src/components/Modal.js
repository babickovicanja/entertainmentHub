import React, {useState, useEffect} from "react"

import { YoutubeOutlined } from "@ant-design/icons"
import Slider from "react-slick"

import "../styles/Modal.css"

function Modal({id, mediaType}) {
  const url = ` https://api.themoviedb.org/3/${mediaType}/${id}?api_key=7b642aed2489a8f6bfc80d04a2421e1c&language=en-US`
  const carouselUrl = `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=7b642aed2489a8f6bfc80d04a2421e1c&language=en-US`
  const youtubeUrl = `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=7b642aed2489a8f6bfc80d04a2421e1c&language=en-US`
  const [modalData, setModalData] = useState([])
  const [carouselData, setCarouselData] = useState([])
  const [youtubeData, setYoutubeData] = useState([])

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setModalData(data)
      })
  }, [id])

  useEffect(() => {
    fetch(youtubeUrl)
      .then(response => response.json())
      .then(data => {
        setYoutubeData(data.results.find(link => link.type='Trailer'))
      })
  }, [id])

  useEffect(() => {
    fetch(carouselUrl)
      .then(response => response.json())
      .then(data => {
        setCarouselData(data)
        
      }) 
  }, [id])

  useEffect(() => {
    console.log(mediaType)
  }, [id])
  
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };

  // if(window.screen.width < )

  return ( 
        <div key={id} className="modal">
          <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${modalData.backdrop_path}`} className="modal-poster-landscape" />
          <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${modalData.poster_path}`} className="modal-poster" />

          <div className="modal-text">
            <h5 className="modal-title">{modalData.title}</h5>
            <p className="modal-subtitle">{modalData.tagline}</p>
            <div className="modal-description">
              {modalData.overview}
            </div>

            <Slider {...settings} className="modal-carousel-wrapper">
              {carouselData && carouselData.cast && carouselData.cast.map(actor => {
                return (
                  <div className="carousel-item">
                    <img src={`https://image.tmdb.org/t/p/w300/${actor.profile_path}`} />
                    <p>{actor.name}</p>
                  </div>
                )
              })}
            </Slider>

            { youtubeData && <a href={`https://www.youtube.com/watch?v=${youtubeData.key}`} className="modal-button" ><YoutubeOutlined className="modal-button-icon"/> WATCH THE TRAILER</a>}

          </div>
        </div> )
}

export default Modal;