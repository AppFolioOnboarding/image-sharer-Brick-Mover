/* eslint-env mocha */
import 'jsdom-global/register';
import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import FeedbackForm from '../../components/FeedbackForm';
import feedbackStore from '../../stores/FeedbackStore';

configure({ adapter: new Adapter() });

describe('<FeedbackForm />', () => {
  it('feedback form has name&comments', () => {
    const wrapper = shallow(<FeedbackForm feedbackStore={feedbackStore}/>);
    let name = wrapper.find('#name');
    let comments = wrapper.find('#comments');

    expect(name).to.have.lengthOf(1);
    expect(comments).to.have.lengthOf(1);
    expect(name.prop('value')).to.equal('');
    expect(name.prop('value')).to.equal('');

    name.simulate('change', { target: { value: 'John Doe' } });
    comments.simulate('change', { target: { value: 'One man’s crappy software is another man’s full time job.'}});
    name = wrapper.find('#name');
    comments = wrapper.find('#comments');

    expect(name.prop('value')).to.equal('John Doe');
    expect(comments.prop('value')).to.equal('One man’s crappy software is another man’s full time job.');
  });
});
