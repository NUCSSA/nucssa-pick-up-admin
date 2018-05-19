import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import _ from 'lodash'

@observer
class DriverSubmission extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let {
      wechatId,
      name,
      gender,
      huskyEmail,
      email,
      status,
      degree,
      phone,
      carType,
      remark,
    } = this.props.driverSubmission
    return (
      <div>
        <ListGroup>
          <ListGroupItem>主要负责人微信: { wechatId }</ListGroupItem>
          <ListGroupItem>姓名: { name }</ListGroupItem>
          <ListGroupItem>性别: { gender }</ListGroupItem>
          <ListGroupItem>NEU husky邮箱: { huskyEmail }</ListGroupItem>
          {
            remark && <ListGroupItem>邮箱: { email }</ListGroupItem>
          }
          <ListGroupItem>就读状态: { status }</ListGroupItem>
          <ListGroupItem>就读项目: { degree }</ListGroupItem>
          <ListGroupItem>电话: { phone }</ListGroupItem>
          <ListGroupItem>车型: { carType }</ListGroupItem>
          {
            remark && <ListGroupItem>备注: { remark }</ListGroupItem>
          }
        </ListGroup>
      </div>
    )
  }
}

DriverSubmission.propTypes = {
  driverSubmission: PropTypes.shape({
    wechatId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    huskyEmail: PropTypes.string.isRequired,
    email: PropTypes.string,
    status: PropTypes.string.isRequired,
    degree: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    carType: PropTypes.string.isRequired,
    remark: PropTypes.string,
  }).isRequired,
}

export default DriverSubmission