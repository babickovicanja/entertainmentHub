import React from "react"

import "../styles/MediaItem.css"

function MediaItem(props) {
  function displayRating(rating) {
    if (rating >= 6) {
      return "media-rating media-rating-purple"
    } else if (rating < 6 && rating) {
      return "media-rating media-rating-red"
    } else if (!rating) {
      return null
    }
  }

  return (
    <div className="media-item" key={props.media.id} onClick={() => props.toggleModal(props.media.id, props.media.media_type)} >
      <span className={displayRating(props.media.vote_average)}>{props.media.vote_average ? props.media.vote_average : null}</span>
      <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${props.media.poster_path}`} />
      <p className="media-title">{props.media.name || props.media.title}</p>
      <div className="media-item-date-type">
        <p>{props.media.media_type}</p>
        <p>{props.media.release_date || props.media.first_air_date}</p>
      </div>
    </div>
  )
}

export default MediaItem
