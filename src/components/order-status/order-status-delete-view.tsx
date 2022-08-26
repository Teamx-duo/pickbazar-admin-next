import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState,
} from '@components/ui/modal/modal.context';
import { useDeleteOrderStatusMutation } from '@data/order-status/order-status-delete.mutation';

const OrderStatusDeleteView = () => {
  const { mutate: deleteOrderStatus, isLoading: loading } =
    useDeleteOrderStatusMutation();
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  async function handleDelete() {
    deleteOrderStatus(data);
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

export default OrderStatusDeleteView;
