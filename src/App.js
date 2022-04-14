import React from "react"
import {Routes, Route} from "react-router-dom"

import Header from "./components/Header"
import Navigation from "./components/Navigation"
import Trending from "./pages/Trending"
import Movies from "./pages/Movies"
import Series from "./pages/Series"
import Search from "./pages/Search"
import 'antd/dist/antd.css'

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Trending />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Navigation />
    </div>
  )
}

export default App