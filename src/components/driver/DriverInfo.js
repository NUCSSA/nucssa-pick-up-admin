import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import JsonSchemaForm from 'react-jsonschema-form'
import _ from 'lodash'
import {driverFormData} from 'src/data/schema/index'

@observer
class DriverInfo extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit({ formData }) {
    const { wechatId } = this.props
    this.props.updateDriverInfo(wechatId, formData)
  }

  render() {
    return (
      <div>
        <JsonSchemaForm
          schema={driverFormData.JsonSchema}
          formData={this.props.driverSubmission}
          uiSchema={driverFormData.UISchema}
          onSubmit={this.onSubmit}>
        </JsonSchemaForm>
      </div>
    )
  }
}

DriverInfo.propTypes = {
  updateDriverInfo: PropTypes.func,
  wechatId: PropTypes.string.isRequired,
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
    verified: PropTypes.bool.isRequired,
  }).isRequired,
}

export default DriverInfo