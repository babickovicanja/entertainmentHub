import React from "react"
import {Link} from "react-router-dom"
import { FireOutlined, SearchOutlined, LaptopOutlined, VideoCameraOutlined } from "@ant-design/icons"

import "../styles/Navigation.css"

function Navigation() {
  return(
    <div className="navigation">
      <Link className="nav-link" to="/"><FireOutlined />Trending</Link>
      <Link className="nav-link" to="/movies"><VideoCameraOutlined />Movies</Link>
      <Link className="nav-link" to="series"><LaptopOutlined />TV Series</Link>
      <Link className="nav-link" to="/search"><SearchOutlined />Search</Link>
    </div>
  )
}

export default Navigation