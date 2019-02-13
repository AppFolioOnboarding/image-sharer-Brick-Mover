import React, { Component } from 'react';
import { Col } from "reactstrap";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import postFeedbackService from '../services/PostFeedbackService'

@observer
class FeedbackForm extends Component {
  @action
  setName = (event) => {
    this.props.feedbackStore.name = event.target.value;
  };

  @action
  setComments = (event) => {
    this.props.feedbackStore.comments = event.target.value;
  };

  onSubmit = async (event) => {
    event.preventDefault();
    await postFeedbackService.sendFeedback(this.props.feedbackStore.name,
      this.props.feedbackStore.comments);
  };

  render() {
    return (
      <Col lg={{ size: 4, offset: 4 }}>
        <Form>
          <FormGroup>
            <Label for="name">Your name:</Label>
            <Input type="text" id="name"
                   value={this.props.feedbackStore.name} onChange={this.setName} />
          </FormGroup>
          <FormGroup>
            <Label for="comments">Comments:</Label>
            <Input type="textarea" id="comments"
                   value={this.props.feedbackStore.comments} onChange={this.setComments} />
          </FormGroup>
          <Button onClick={this.onSubmit}>Submit</Button>
        </Form>
      </Col>
    )
  }
}

export default FeedbackForm;
