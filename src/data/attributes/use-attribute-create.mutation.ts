import { AttributeInput } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import Attribute from '@repositories/attribute';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { toast } from 'react-toastify';

export interface IAttributeCreateVariables {
  variables: {
    input: AttributeInput;
  };
}

export const useCreateAttributeMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IAttributeCreateVariables) =>
      Attribute.create(API_ENDPOINTS.ATTRIBUTES, input),
    {
      onSuccess: () => {
        router.push(`/${router?.query?.shop}${ROUTES.ATTRIBUTES}`);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.ATTRIBUTES);
      },
      onError: (error: any) => {
        toast.error(
          typeof error?.response?.data?.message === 'string'
            ? error?.response?.data?.message
            : error?.response?.data?.message?.[0]
        );
      },
    }
  );
};
