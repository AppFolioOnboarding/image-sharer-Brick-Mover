import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Col, Row} from "reactstrap";

class Footer extends Component {
  static propTypes = {
    copyright: PropTypes.string.isRequired
  };

  render() {
    const copyright = this.props.copyright;
    return (
      <div className="text-center">
        <Row>
          <Col lg={{ size: 4, offset: 4 }}>
            <p style={{fontSize: 10}}>
              {copyright}
            </p>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Footer;
