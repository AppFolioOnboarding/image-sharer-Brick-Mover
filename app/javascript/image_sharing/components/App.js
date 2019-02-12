import React, { Component } from 'react';
import Header from './Header';
import Footer from "./Footer";

class App extends Component {
  /* Add Prop Types check*/
  render() {
    return (
      <div>
        <Header title={'Tell us what you think'} />
        <Footer copyright={'Copyright: Appfolio Inc. Onboarding'}/>
      </div>
    )
  }
}

export default App;
