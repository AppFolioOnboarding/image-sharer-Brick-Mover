import { observable } from 'mobx'

export class FeedbackStore {
  @observable name = '';
  @observable comments = '';
}

const feedbackStore = new FeedbackStore();

export default feedbackStore;
