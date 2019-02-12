import React, { Component } from 'react';
import { Col } from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { observer } from 'mobx-react'
import { action } from 'mobx'

@observer
class FeedbackForm extends Component {

  @action
  handleNameChange = (event) => {
    this.props.feedbackStore.name = event.target.value;
  };

  @action
  handleCommentsChange = (event) => {
    this.props.feedbackStore.comments = event.target.value;
  };


  render() {
    return (
      <Col lg={{ size: 4, offset: 4 }}>
        <Form>
          <FormGroup>
            <Label for="name">Your name:</Label>
            <Input type="text" name="name" id="name"
                   value={this.props.feedbackStore.name} onChange={this.handleNameChange} />
          </FormGroup>
          <FormGroup>
            <Label for="comments">Comments</Label>
            <Input type="textarea" name="comments" id="comments"
                   value={this.props.feedbackStore.comments} onChange={this.handleCommentsChange} />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </Col>
    )
  }
}

export default FeedbackForm;
