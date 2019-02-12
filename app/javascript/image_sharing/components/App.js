import React, { Component } from 'react';
import Header from './Header';
import Footer from "./Footer";
import FeedbackForm from './FeedbackForm'
import feedbackStore from '../stores/FeedbackStore'

class App extends Component {
  render() {
    return (
      <div>
        <Header title={'Tell us what you think'} />
        <FeedbackForm feedbackStore={feedbackStore} />
        <Footer copyright={'Copyright: Appfolio Inc. Onboarding'}/>
      </div>
    )
  }
}

export default App;
