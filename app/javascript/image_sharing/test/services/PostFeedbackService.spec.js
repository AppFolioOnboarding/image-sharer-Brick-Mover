/* eslint-env mocha */
import 'jsdom-global/register';
import React from 'react';
import { configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { PostFeedbackService } from '../../services/PostFeedbackService';
import * as helper from "../../utils/helper";

configure({ adapter: new Adapter() });

describe('<FeedbackService />', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('service is called with correct parameters', async () => {
    let service = new PostFeedbackService();
    let responsePromise = Promise.resolve('foo');
    let helperStub = sandbox.stub(helper, 'post').returns(responsePromise);

    let response = await service.sendFeedback('name', 'comments');

    expect(helperStub.calledOnceWith('/api/feedbacks', {name: 'name', comments: 'comments'})).to.equal(true);
    expect(response).to.equal('foo');
  });
});
