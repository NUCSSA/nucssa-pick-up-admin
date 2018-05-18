import React, { Component } from 'react'
import InfoCard from 'src/components/InfoCard'
import FormCard from 'src/components/FormCard'
import {DRIVER} from 'src/data/route/index'

class AdminHomePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <InfoCard/>
        <FormCard
          title={'学生列表'}
          description={'取消订单, 更改信息, 更换司机'}
          link={'/'}
        />
        <br/>
        <FormCard
          title={'司机列表'}
          description={'取消订单, 更改信息, 验证司机'}
          link={DRIVER}
        />

      </div>
    )
  }
}

export default AdminHomePage
