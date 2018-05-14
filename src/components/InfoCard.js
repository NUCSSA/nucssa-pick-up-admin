import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap'

class InfoCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <h2 className='display-4'>NUCSSA接机管理系统入口</h2>
          <p className='lead'>请慎重使用用户信息 小心泄露</p>
        </Jumbotron>
      </div>
    )
  }
}
export default InfoCard