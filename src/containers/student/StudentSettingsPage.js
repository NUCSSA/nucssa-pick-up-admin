import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { ListGroupItem } from 'react-bootstrap'
import _ from 'lodash'
import { ToastContainer, toast } from 'react-toastify'
import StudentInfo from 'src/components/student/StudentInfo'
import StudentOrder from '../../components/order/StudentOrder'


@inject(stores => {
  const { studentStore, studentOrderStore } = stores
  const {
    getStudentInfo,
    studentInfo,
    updateStudentInfo,
    loading,
    message,
    error,
  } = studentStore
  const { studentOrder, getStudentOrder, cancelDriverOrder, loadingOrder } = studentOrderStore
  // const { cancelOrder }  = orderStore
  return {
    getStudentInfo,
    studentOrder,
    getStudentOrder,
    cancelDriverOrder,
    studentInfo,
    updateStudentInfo,
    loading,
    message,
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
    cancelDriverOrder: PropTypes.func,
    updateStudentInfo: PropTypes.func,
    match: PropTypes.object,
    loading: PropTypes.bool,
    message: PropTypes.string,
    loadingOrder: PropTypes.bool,
  }

  componentWillMount() {
    const { studentWechatId }  = this.props.match.params
    this.props.getStudentInfo( { studentWechatId })
    this.props.getStudentOrder({ studentWechatId })
  }

  componentWillReceiveProps(nextProp) {
    if (this.props.message !== nextProp.message && !_.isNil(nextProp.message)) {
      toast.info(nextProp.message)
    }
  }

  render() {
    const {
      studentInfo,
      studentOrder,
      cancelDriverOrder,
      loading,
      loadingOrder,
      updateStudentInfo,
    } = this.props

    if (loading === true || loadingOrder === true) {
      return (<h3>Loading...</h3>)
    }

    if (_.isNil(studentInfo)) {
      return (<h3>Student not exist</h3>)
    }
    const { wechatId } = studentInfo
    return (
      <div>
        <ToastContainer />
        <ListGroupItem><b>主要联系人ID</b>: {wechatId}</ListGroupItem>
        <ListGroupItem>
          <b>接单司机</b>:
          <StudentOrder
            studentOrder={studentOrder}
            studentWechatId={wechatId}
            cancelDriverOrder={cancelDriverOrder}
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