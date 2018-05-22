import { observer, inject } from 'mobx-react'
import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap'
import { FormGroup, ControlLabel, FormControl, Button, Radio } from 'react-bootstrap'
import PropTypes from 'prop-types'
import _ from 'lodash'

@inject(stores => {
  let { studentListStore, driverListStore } = stores
  let { redirectToSettings: redirectToStudentSettings } = studentListStore
  let { redirectToSettings: redirectToDriverSettings } = driverListStore

  return {
    redirectToStudentSettings,
    redirectToDriverSettings,
  }
})
@observer
class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wechatId: '',
      type:'student',
    }

    this.renderQueryPage = this.renderQueryPage.bind(this)
    this.handleChangeType = this.handleChangeType.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static propTypes = {
    redirectToStudentSettings: PropTypes.func,
    redirectToDriverSettings: PropTypes.func,
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({
      wechatId: e.target.value,
    })
  }

  handleChangeType(e) {
    e.preventDefault()
    this.setState({
      type: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    let { redirectToStudentSettings, redirectToDriverSettings } = this.props
    let { wechatId, type } = this.state
    if (type === 'student') {
      redirectToStudentSettings({ 'studentWechatId': wechatId })
    } else if (type === 'driver') {
      redirectToDriverSettings({ 'driverWechatId': wechatId })
    }
  }

  renderQueryPage() {
    return <form onSubmit={this.handleSubmit}>
      <FormGroup
        controlId="queryText"
      >
        <ControlLabel>请输入订单主要负责人微信ID</ControlLabel>
        <FormControl
          type="text"
          value={this.state.wechatId}
          onChange={this.handleChange}
        />
      </FormGroup>
      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Select Type</ControlLabel>
        <FormControl onChange={this.handleChangeType}
          componentClass="select"
          placeholder="student">
          <option value="student">student</option>
          <option value="driver">driver</option>
        </FormControl>
      </FormGroup>
      <Button bsStyle="info" type="submit" block>搜索</Button>
    </form>
  }

  render() {

    return (
      <div>
        <Jumbotron>
          <h3 className='display-4'>订单查询页</h3>
        </Jumbotron>
        {this.renderQueryPage()}

      </div>
    )
  }
}

export default SearchPage
