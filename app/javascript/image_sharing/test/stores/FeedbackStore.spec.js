import { FeedbackStore } from "../../stores/FeedbackStore";
import { expect } from "chai";
import React from "react";

describe('<FeedbackStore />', () => {
  let feedbackStore;

  beforeEach(() => {
    feedbackStore = new FeedbackStore();
  });

  it('store has name and comments', () => {
    expect(feedbackStore.name).to.not.equal(null);
    expect(feedbackStore.comments).to.not.equal(null);
  });
});
