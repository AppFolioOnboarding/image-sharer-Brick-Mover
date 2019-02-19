import { post } from "../utils/helper";

export class PostFeedbackService {
  sendFeedback(name, comments) {
    return post('/api/feedbacks', {name: name, comments: comments});
  }
}

const postFeedbackService = new PostFeedbackService();
export default postFeedbackService;
