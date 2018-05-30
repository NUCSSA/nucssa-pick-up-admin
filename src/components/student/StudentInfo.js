import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { toJS } from 'mobx'
import JsonSchemaForm from 'react-jsonschema-form'

import { parseTimeInUSEastTimezone, convertStandardTimeToUSEast } from 'src/util'
import {studentFormData} from 'src/data/schema/index'
import 'src/styles/Student.css'


const validate = function (formData, errors) {
  try {
    parseTimeInUSEastTimezone(formData.arrivingTime)
  } catch (err) {
    errors.arrivingTime.addError('Invalid Time')
  }
  return errors
}

@observer
class StudentInfo extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit({ formData }) {
    const { wechatId } = this.props

    formData.arrivingTime = parseTimeInUSEastTimezone(formData.arrivingTime)

    this.props.updateStudentInfo(wechatId, formData)
  }

  render() {
    const { studentInfo }  = this.props

    let jsStudentInfo = toJS(studentInfo)

    jsStudentInfo.arrivingTime = convertStandardTimeToUSEast(jsStudentInfo.arrivingTime)

    return (
      <div>
        <JsonSchemaForm
          schema={studentFormData.JsonSchema}
          formData={jsStudentInfo}
          uiSchema={studentFormData.UISchema}
          validate={validate}
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
    luggageNumber: PropTypes.number.isRequired,
    remark: PropTypes.string,
  }).isRequired,
}

export default StudentInfo