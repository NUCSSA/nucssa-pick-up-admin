import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { toJS } from 'mobx'
import JsonSchemaForm from 'react-jsonschema-form'
import _ from 'lodash'
import {studentFormData} from 'src/data/schema/index'
import 'src/styles/Student.css'

@observer
class StudentInfo extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit({ formData }) {
    const { wechatId } = this.props
    this.props.updateStudentInfo(wechatId, formData)
  }

  render() {
    const { studentInfo }  = this.props
    return (
      <div>
        <JsonSchemaForm
          schema={studentFormData.JsonSchema}
          formData={toJS(studentInfo)}
          uiSchema={studentFormData.UISchema}
          onSubmit={this.onSubmit}>
        </JsonSchemaForm>
      </div>
    )
  }
}

StudentInfo.propTypes = {
  wechatId: PropTypes.string,
  updateStudentInfo: PropTypes.func,
  studentInfo: PropTypes.shape({
    wechatId: PropTypes.string.isRequired,
    studentSet: MobxPropTypes.observableArray.isRequired,
    arrivingTime: PropTypes.string.isRequired,
    flightNumber: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    luggageNumber: PropTypes.string.isRequired,
    remark: PropTypes.string,
  }).isRequired,
}

export default StudentInfo