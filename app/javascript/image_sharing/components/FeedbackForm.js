import React, { Component } from 'react';
import { Col } from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { observer } from 'mobx-react'

@observer
class FeedbackForm extends Component {
  render() {
    return (
      <Col lg={{ size: 4, offset: 4 }}>
        <Form>
          <FormGroup>
            <Label for="name">Your name:</Label>
            <Input type="text" name="name" id="name"
                   value={this.props.feedbackStore.name} onChange={this.props.feedbackStore.handleNameChange} />
          </FormGroup>
          <FormGroup>
            <Label for="comments">Comments</Label>
            <Input type="textarea" name="comments" id="comments"
                   value={this.props.feedbackStore.comments} onChange={this.props.feedbackStore.handleCommentsChange} />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </Col>
    )
  }
}

export default FeedbackForm;
