/* eslint-env mocha */
import 'jsdom-global/register';
import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import FeedbackForm from '../../components/FeedbackForm';
import { FeedbackStore } from '../../stores/FeedbackStore';
import { Alert } from 'reactstrap';
import postFeedbackService from "../../services/PostFeedbackService";
import sinon from 'sinon';
import FlashMessages from "../../components/FlashMessages";

configure({ adapter: new Adapter() });

describe('<Alert />', () => {
  let feedbackStore;
  let wrapper;

  beforeEach(() => {
    feedbackStore = new FeedbackStore();
    wrapper = shallow(<FlashMessages feedbackStore={feedbackStore}/>);
  });

  it('flash message is closed when app starts', () => {
    expect(wrapper.find(Alert).prop('isOpen')).to.equal(false);
  });

  it('flash message is open after success', () => {
    feedbackStore.flashMessage = 'message';
    feedbackStore.flashColor = 'success';
    expect(wrapper.find(Alert).prop('isOpen')).to.equal(true);
  });
});
