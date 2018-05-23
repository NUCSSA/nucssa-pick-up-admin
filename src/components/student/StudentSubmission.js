import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import _ from 'lodash'

import 'src/styles/Student.css'

@observer
class StudentSubmission extends Component {
  constructor(props) {
    super(props)
    this.renderStudent = this.renderStudent.bind(this)
  }

  renderStudent() {
    let { studentSet } = this.props.studentSubmission
    return _.map(studentSet, (s) => {
      let {
        name,
        degree,
        email,
        wechatId,
        phone,
      } = s
      return (
        <ListGroup key={s.wechatId} bsClass='student-card' xs={6} md={4}>
          <ListGroupItem>姓名: { name }</ListGroupItem>
          <ListGroupItem>就读项目: { degree }</ListGroupItem>
          <ListGroupItem>邮箱: { email }</ListGroupItem>
          <ListGroupItem>微信: { wechatId }</ListGroupItem>
          <ListGroupItem>电话: { phone }</ListGroupItem>
        </ListGroup>
      // <ListGroupItem key={s.wechatId}>姓名: { s.name }</ListGroupItem>
      )
    })
  }

  render() {
    let {
      wechatId,
      studentSet,
      arrivingTime,
      flightNumber,
      address,
      luggageNumber,
      remark,
    } = this.props.studentSubmission
    return (
      <div>
        <ListGroup>
          <ListGroupItem>主要负责人微信: { wechatId }</ListGroupItem>
          <ListGroupItem>
              人数: { studentSet.length }
          </ListGroupItem>
          <ListGroupItem>
            <ListGroup bsClass='students'>
              {this.renderStudent()}
            </ListGroup>
          </ListGroupItem>

          <ListGroupItem>到达时间: { arrivingTime }</ListGroupItem>
          <ListGroupItem>航班号: { flightNumber }</ListGroupItem>
          <ListGroupItem>地址: { address }</ListGroupItem>
          <ListGroupItem>行李箱总数: { luggageNumber }</ListGroupItem>
          {
            remark && <ListGroupItem>备注: { remark }</ListGroupItem>
          }
        </ListGroup>
      </div>
    )
  }
}

StudentSubmission.propTypes = {
  studentSubmission: PropTypes.shape({
    wechatId: PropTypes.string.isRequired,
    studentSet: MobxPropTypes.observableArray.isRequired,
    arrivingTime: PropTypes.string.isRequired,
    flightNumber: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    luggageNumber: PropTypes.string.isRequired,
    remark: PropTypes.string,
  }).isRequired,
}

export default StudentSubmission