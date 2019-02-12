import { observable } from 'mobx'

class FeedbackStore {
  @observable name = '';
  @observable comments = '';
}

const feedbackStore = new FeedbackStore();

export default feedbackStore;
