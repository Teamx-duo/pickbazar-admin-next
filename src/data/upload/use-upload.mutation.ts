import { useMutation, useQueryClient } from 'react-query';
import Attachment from '@repositories/upload';
import { API_ENDPOINTS } from '@utils/api/endpoints';

type upload =
  | 'product'
  | 'coupon'
  | 'type'
  | 'category'
  | 'tag'
  | 'attribute'
  | 'variation'
  | 'tax'
  | 'user';

export const useUploadMutation = (uploadType?: upload) => {
  const queryClient = useQueryClient();

  return useMutation(
    (input: any) => {
      return Attachment.upload(
        uploadType === 'product'
          ? API_ENDPOINTS.PRODUCT_ATTACHMENTS
          : uploadType === 'category'
          ? API_ENDPOINTS.CATEGORY_ATTACHMENTS
          : uploadType === 'type'
          ? API_ENDPOINTS.TYPE_ATTACHMENTS
          : uploadType === 'tag'
          ? API_ENDPOINTS.TAG_ATTACHMENTS
          : uploadType === 'user'
          ? API_ENDPOINTS.USER_ATTACHMENTS
          : API_ENDPOINTS.ATTACHMENTS,
        input
      );
    },
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.SETTINGS);
      },
    }
  );
};
