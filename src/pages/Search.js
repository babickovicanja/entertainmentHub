import { SearchOutlined } from "@ant-design/icons"
import React, { useState, useEffect } from "react"

import { Pagination } from "antd";
import MediaItem from "../components/MediaItem"
import Modal from "../components/Modal"
import "../styles/Search.css"

function Search() {
  const [inputValue, setInputValue] = useState("")
  const [searchData, setSearchData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalId, setModalId] = useState(0);
  const [mediaType, setMediaType] = useState("movie")
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParam, setSearchParam] = useState("")
  const url =  `https://api.themoviedb.org/3/search/${mediaType}?api_key=7b642aed2489a8f6bfc80d04a2421e1c&language=en-US&query=${searchParam}&page=${currentPage}&include_adult=false`

    useEffect(() => {
      fetch(url)
      .then(response => response.json())
      .then(data => {
        setSearchData(data.results)
      })
    }, [currentPage, searchParam, mediaType])

  function handleChange(e) {
    setInputValue(e.target.value)
  }
  
  function toggleModal(id, media_type) {
    setIsModalVisible(!isModalVisible);
    setModalId(id);
    setMediaType(mediaType);
  }
  
  const displaySearchData = searchData?.map(media => {
    return (
      <MediaItem key={media.id} media={media} toggleModal={toggleModal}/>
      )
    })

  return (
    <div className="search">
      <div className="search-container">
        <form className="input-container" >
          <input type="text" placeholder="Search" onChange={handleChange} value={inputValue}/>
          <button onClick={(e) =>{ 
            e.preventDefault()
            setSearchParam(inputValue)}}><SearchOutlined /></button>
        </form>
        <form className="buttons-container">
          <button onClick={(e) => {
            e.preventDefault()
            setMediaType("movie")}}
            >SEARCH MOVIES</button>
          <button onClick={(e) => {
            e.preventDefault()
            setMediaType("tv")}}>SEARCH TV SERIES</button>
        </form>
        <div className="media-items search-media-items">
        {displaySearchData}
        </div>
      </div>
      {displaySearchData 
      ? <Pagination
        defaultCurrent={1}
        total={100}
        onChange={(value) => setCurrentPage(value)}
      /> 
      : <div className="empty-div"></div>}
      <div
        className={isModalVisible ? "overlay show" : "overlay"}
        onClick={() => toggleModal(false)}
      ></div>
      {isModalVisible ? <Modal id={modalId} mediaType={mediaType} /> : null}
    </div>
  )
}

export default Search