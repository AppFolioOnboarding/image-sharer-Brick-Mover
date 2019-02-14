import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { observer } from 'mobx-react';
import { action } from 'mobx';

@observer
class FlashMessages extends Component {
  @action
  onDismiss = () => {
    this.props.feedbackStore.flashMessage = '';
  };

  render() {
    const flashMessage = this.props.feedbackStore.flashMessage;

    return (
      <div>
        <Alert color={this.props.feedbackStore.flashColor}
               isOpen={flashMessage !== ''}
               toggle={this.onDismiss}>
          {flashMessage}
        </Alert>
      </div>
    );
  }
}

export default FlashMessages;
