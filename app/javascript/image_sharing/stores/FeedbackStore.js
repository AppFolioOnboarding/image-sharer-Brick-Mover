import { observable } from 'mobx'

export class FeedbackStore {
  @observable name = '';
  @observable comments = '';
  @observable flashMessage = '';
  @observable flashColor = '';
}

const feedbackStore = new FeedbackStore();

export default feedbackStore;
