import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button,
} from 'reactstrap'
import { observer } from 'mobx-react'

@observer
class FormCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { title, description, link } = this.props

    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>{title}</CardTitle>
            <CardText>{description}</CardText>
            <Link to={link}>
              <Button color={'primary'}>
                  查看
              </Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    )
  }
}

FormCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}

export default FormCard