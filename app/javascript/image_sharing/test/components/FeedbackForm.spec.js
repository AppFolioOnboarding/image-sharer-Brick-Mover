/* eslint-env mocha */
import 'jsdom-global/register';
import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import FeedbackForm from '../../components/FeedbackForm';
import { FeedbackStore } from '../../stores/FeedbackStore';
import { Label, Button } from 'reactstrap';
import postFeedbackService from "../../services/PostFeedbackService";
import sinon from 'sinon';

configure({ adapter: new Adapter() });

describe('<FeedbackForm />', () => {
  let feedbackStore;
  let wrapper;

  beforeEach(() => {
    feedbackStore = new FeedbackStore();
    wrapper = shallow(<FeedbackForm feedbackStore={feedbackStore}/>);
  });

  it('feedback form has name&comments', () => {
    let name = wrapper.find('#name');
    let comments = wrapper.find('#comments');

    expect(name).to.have.lengthOf(1);
    expect(comments).to.have.lengthOf(1);
    expect(name.prop('value')).to.equal('');
    expect(comments.prop('value')).to.equal('');

    name.simulate('change', { target: { value: 'John Doe' } });
    comments.simulate('change', { target: { value: 'One man’s crappy software is another man’s full time job.'}});
    name = wrapper.find('#name');
    comments = wrapper.find('#comments');

    expect(name.prop('value')).to.equal('John Doe');
    expect(comments.prop('value')).to.equal('One man’s crappy software is another man’s full time job.');
  });

  it('feedback form renders correctly', () => {
    const labels = wrapper.find(Label);
    const button = wrapper.find(Button);

    expect(labels.at(0).prop('children')).to.equal('Your name:');
    expect(labels.at(1).prop('children')).to.equal('Comments:');
    expect(button.prop('children')).to.equal('Submit');
  });

  it('feedback form setter works', () => {
    wrapper.instance().setName({ target: { value: 'Jane Doe' } });
    wrapper.instance().setComments({ target: { value: 'sleep code eat' } });
    const name = wrapper.find('#name');
    const comments = wrapper.find('#comments');

    expect(name.prop('value')).to.equal('Jane Doe');
    expect(comments.prop('value')).to.equal('sleep code eat');
  });

  it('submit button works', () => {
    const button = wrapper.find(Button);
    let serviceStub = sinon.stub(postFeedbackService, 'sendFeedback')
      .returns({message: 'Thanks for your feedback!'});
    let event = {preventDefault: () => {}};
    let preventDefaultSpy = sinon.spy(event, 'preventDefault');

    button.prop('onClick')(event);

    expect(serviceStub.calledOnceWith('', '')).to.equal(true);
    expect(preventDefaultSpy.calledOnce).to.equal(true);
  });

  it('Flash message after submission succeeds', async () => {
    const button = wrapper.find(Button);
    sinon.stub(postFeedbackService, 'sendFeedback')
      .resolves({message: 'Thanks for your feedback!'});

    await button.prop('onClick')({
      preventDefault: () => {}
    });

    expect(feedbackStore.flashMessage).to.equal('Thanks for your feedback!');
    expect(feedbackStore.flashColor).to.equal('success');
  });

  it('Flash message after submission fails', async () => {
    const button = wrapper.find(Button);
    sinon.stub(postFeedbackService, 'sendFeedback')
      .rejects({message: 'Network failure'});

    await button.prop('onClick')({
      preventDefault: () => {}
    });

    expect(feedbackStore.flashMessage).to.equal('Network failure');
    expect(feedbackStore.flashColor).to.equal('danger');
  });
});
