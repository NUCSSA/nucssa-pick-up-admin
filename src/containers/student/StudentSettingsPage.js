import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { ListGroupItem } from 'react-bootstrap'
import _ from 'lodash'
import StudentInfo from 'src/components/student/StudentInfo'
import StudentOrder from '../../components/order/StudentOrder'


@inject(stores => {
  const { studentStore, studentOrderStore } = stores
  const {
    getStudentInfo,
    studentInfo,
    updateStudentInfo,
    loading,
    error,
  } = studentStore
  const { studentOrder, getStudentOrder, cancelOrder, loadingOrder } = studentOrderStore
  // const { cancelOrder }  = orderStore
  return {
    getStudentInfo,
    studentOrder,
    getStudentOrder,
    cancelOrder,
    studentInfo,
    updateStudentInfo,
    loading,
    loadingOrder,
    error,
  }
})
@observer
class StudentSettingsPage extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    getStudentInfo: PropTypes.func,
    getStudentOrder: PropTypes.func,
    studentInfo: PropTypes.object,
    studentOrder: PropTypes.object,
    cancelOrder: PropTypes.func,
    updateStudentInfo: PropTypes.func,
    match: PropTypes.object,
    loading: PropTypes.bool,
    loadingOrder: PropTypes.bool,
  }

  componentWillMount() {
    const { studentWechatId }  = this.props.match.params
    this.props.getStudentInfo( { studentWechatId })
    this.props.getStudentOrder({ studentWechatId })
  }
  //
  render() {
    const {
      studentInfo,
      studentOrder,
      cancelOrder,
      loading,
      loadingOrder,
      updateStudentInfo,
    } = this.props
    //
    if (loading === true || loadingOrder === true) {
      return (<h3>Loading...</h3>)
    }

    if (_.isNil(studentInfo)) {
      return (<h3>Student not exist</h3>)
    }
    const { wechatId } = studentInfo
    return (
      <div>
        <ListGroupItem><b>主要联系人ID</b>: {wechatId}</ListGroupItem>
        <ListGroupItem>
          <b>接单司机</b>:
          <StudentOrder
            studentOrder={studentOrder}
            studentWechatId={wechatId}
            cancelOrder={cancelOrder}
          />
        </ListGroupItem>
        <ListGroupItem>
          <StudentInfo
            wechatId={wechatId}
            updateStudentInfo={updateStudentInfo}
            studentInfo={studentInfo}/>
        </ListGroupItem>
      </div>
    )
  }
}
export default StudentSettingsPage