import React, { Component } from 'react';
import {Col, Row} from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'

@observer
class FeedbackForm extends Component {

  @observable name = '';
  @observable comments = '';

  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCommentsChange = this.handleCommentsChange.bind(this);
  }

  @action
  handleNameChange(event) {
    this.name = event.target.value;
  }

  @action
  handleCommentsChange(event) {
    this.comments = event.target.value;
  }


  render() {
    return (
      <Col lg={{ size: 4, offset: 4 }}>
        <Form>
          <FormGroup>
            <Label for="name">Your name:</Label>
            <Input type="text" name="name" id="name"
                   value={this.name} onChange={this.handleNameChange} />
          </FormGroup>
          <FormGroup>
            <Label for="comments">Comments</Label>
            <Input type="textarea" name="comments" id="comments"
                   value={this.comments} onChange={this.handleCommentsChange} />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </Col>
    )
  }
}

export default FeedbackForm;
