import {
  useModalAction,
  useModalState,
} from '@components/ui/modal/modal.context';
import { useAnswerQuestionMutation } from '@data/question/use-answer-question.mutation';
import { Question } from '@ts-types/generated';
import AnswerQuestionCard from './answer-question-form';

const AnswerQuestionView = () => {
  const { mutate: answerQuestion, isLoading: loading } =
    useAnswerQuestionMutation();
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  async function handleUpdate(answer: string) {
    answerQuestion({ id: data._id, answer });
    closeModal();
  }
  return (
    <AnswerQuestionCard
      onCancel={closeModal}
      onDelete={handleUpdate}
      deleteBtnLoading={loading}
      question={data}
    />
  );
};

export default AnswerQuestionView;
