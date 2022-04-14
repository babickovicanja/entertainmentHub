import React, { useState, useEffect } from "react"

import { Pagination } from "antd";
import Modal from "../components/Modal";
import MediaItem from "../components/MediaItem"
import "../styles/Series.css"

function Series() {
  const [seriesData, setSeriesData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalId, setModalId] = useState(0)
  const [mediaType, setMediaType] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [genreData, setGenreData] = useState([])
  const [selectedGenre, setSelectedGenre] = useState([]);
  const url = `https://api.themoviedb.org/3/discover/tv?api_key=7b642aed2489a8f6bfc80d04a2421e1c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}&with_genres=${selectedGenre}`
  const genreUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=7b642aed2489a8f6bfc80d04a2421e1c&language=en-US`

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setSeriesData(data.results)
      })
  }, [currentPage, selectedGenre, url])

  useEffect(() => {
    fetch(genreUrl)
      .then(response => response.json())
      .then(data => {
        setGenreData(data.genres)
      })
  })

  function toggleModal(id, media_type) {
    setIsModalVisible(!isModalVisible)
    setModalId(id)
    setMediaType(mediaType)
  }

  const displaySeriesData = seriesData.map(media => {
    return (
      <MediaItem key={media.id} media={media} toggleModal={toggleModal}/>
    )
  })

  function handleClick(genre, e) {
    if (selectedGenre?.includes(e.target.value)) {
      setSelectedGenre((prevState) => {
        return prevState.filter((state) => state !== e.target.value);
      });
    } else {
      setSelectedGenre((prevState) => [...(prevState || []), e.target.value]);
    }
  }

  const displayGenre = genreData.map((genre) => {
    return (
      <button
      
        onClick={(e) => {
          handleClick(genre, e);
        }}
        value={genre.id}
        key={genre.id}
        className={selectedGenre.includes((genre.id).toString()) ? 'selected' : ""}
      >
        {genre.name}
      </button>
    );
  });

  return (
    <div className="series">
      <h2 className="title">DISCOVER SERIES</h2>
      <div className="genres-container">
        <div className="genres">
          {displayGenre}
        </div>
      </div>
      <div className="media-items">
        {displaySeriesData}
      </div>
      <div>
        {/* <button value={'12'} onClick={(e)=> {console.log(e.target.value)}}>'aaaaaaaaaaaaaa</button> */}
      </div>
      <Pagination defaultCurrent={1} total={100} onChange={(value) => setCurrentPage(value)}/>
      <div className={isModalVisible ? 'overlay show' : 'overlay'} onClick={() => toggleModal(false)}></div>
      {isModalVisible ? <Modal id={modalId} mediaType={mediaType}/> : null}
      

    </div>
  )
}

export default Series