import React, {useState, useEffect} from "react"

import { Pagination } from "antd";
import Modal from "../components/Modal";
import MediaItem from "../components/MediaItem";
import "../styles/Trending.css"

function Trending() {
  const [trendingData, setTrendingData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalId, setModalId] = useState(0)
  const [mediaType, setMediaType] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const url = `https://api.themoviedb.org/3/trending/all/day?api_key=7b642aed2489a8f6bfc80d04a2421e1c&page=${currentPage}`


  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setTrendingData(data.results)
      })
  }, [currentPage])

  function toggleModal(id, media_type) {
    setIsModalVisible(!isModalVisible)
    setModalId(id)
    setMediaType(media_type)
  }

  const displayTrendingData = trendingData.map(media => {
    return (
      <MediaItem key={media.id} media={media} toggleModal={toggleModal}/>
    )
  })
  
  return (
    <div className="trending">
      <h2 className="title">TRENDING TODAY</h2>
      <div className="media-items">
        {displayTrendingData}
      </div>
      <Pagination defaultCurrent={1} total={100} onChange={(value) => setCurrentPage(value)}/>
      <div className={isModalVisible ? 'overlay show' : 'overlay'} onClick={() => toggleModal(false)}></div>
      {isModalVisible ? <Modal id={modalId} mediaType={mediaType}/> : null}
      

    </div>
  )
}

export default Trending