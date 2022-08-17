import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState,
} from '@components/ui/modal/modal.context';
import { useReviewQuestionMutation } from '@data/reviews/review-delete.mutation';

const ReviewDeleteView = () => {
  const { mutate: deleteReview, isLoading: loading } =
    useReviewQuestionMutation();
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  async function handleDelete() {
    deleteReview(data);
    closeModal();
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default ReviewDeleteView;
