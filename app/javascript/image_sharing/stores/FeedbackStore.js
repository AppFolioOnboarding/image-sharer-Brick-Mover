import {action, observable} from 'mobx'

class FeedbackStore {
  @observable name = '';
  @observable comments = '';

  @action
  handleNameChange = (event) => {
    this.name = event.target.value;
  };

  @action
  handleCommentsChange = (event) => {
    this.comments = event.target.value;
  };
}

const feedbackStore = new FeedbackStore();

export default feedbackStore;
