import React, { Component } from 'react'
import InfoCard from "../components/InfoCard";

class HomePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <InfoCard/>
      </div>
    )
  }
}

export default HomePage
