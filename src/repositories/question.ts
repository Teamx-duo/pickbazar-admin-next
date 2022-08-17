import Base from './base';

import { AnswerQuestionInput, CreateQuestionInput } from '@ts-types/generated';

class Question extends Base<CreateQuestionInput, CreateQuestionInput> {
  answer = async (url: string, variables: AnswerQuestionInput) => {
    return this.http<AnswerQuestionInput>(url, 'put', variables);
  };
}

export default new Question();
