import TrashIcon from '@components/icons/trash';
import Button from '@components/ui/button';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import Image from 'next/image';
import { Question } from '@ts-types/generated';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { questionValidationSchema } from './question-validation-schema';
import TextArea from '@components/ui/text-area';

type FormValues = {
  answer: string;
};

type AnswerQuestionProps = {
  onCancel: () => void;
  onDelete: (answer: string) => void;
  title?: string;
  icon?: any;
  description?: string;
  cancelBtnClassName?: string;
  deleteBtnClassName?: string;
  cancelBtnText?: string;
  deleteBtnText?: string;
  cancelBtnLoading?: boolean;
  deleteBtnLoading?: boolean;
  question: Question;
};
const AnswerQuestionCard: React.FC<AnswerQuestionProps> = ({
  onCancel,
  onDelete,
  icon,
  cancelBtnLoading,
  deleteBtnLoading,
  question,
}) => {
  const { t } = useTranslation('common');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    //@ts-ignore
    defaultValues: { answer: question.answer ?? '' },
    resolver: yupResolver(questionValidationSchema),
  });
  return (
    <div className="m-auto w-full max-w-lg rounded bg-light sm:w-[32rem]">
      <div className="flex items-center border-b border-border-200 p-7">
        <div className="flex-shrink-0 rounded border border-border-100">
          <span
            style={{
              boxSizing: 'border-box',
              display: 'inline-block',
              overflow: 'hidden',
              width: '96px',
              height: '96px',
              background: 'none',
              opacity: 1,
              border: '0px',
              margin: '0px',
              padding: '0px',
              position: 'relative',
            }}
          >
            <Image
              alt="Sun Tropics Organic Mango Nectar,250ml"
              className="overflow-hidden rounded object-fill"
              layout="fill"
              objectFit="contain"
              src={
                question.product?.image ?? '/product-placeholder-borderless.svg'
              }
            />
          </span>
        </div>
        <div className="ms-7">
          <h3 className="mb-2 text-sm font-semibold text-heading md:text-base">
            {question.product?.name}
          </h3>
          <div className="text-sm text-body text-opacity-80">
            Product ID:{' '}
            <span className="font-semibold text-accent">
              {question.product?._id.slice(0, 5)}
            </span>
          </div>
        </div>
      </div>
      <div className="px-7 pt-6 pb-7">
        <div className="mb-4 text-sm font-semibold text-heading md:text-base">
          <span className="me-1 inline-block uppercase">Q:</span>
          {question.question}
        </div>
        <form
          onSubmit={handleSubmit((data) => onDelete(data.answer))}
          className="flex w-full flex-col"
        >
          <div className="mb-4">
            <TextArea
              label={t('form:input-label-answer')}
              {...register('answer')}
              error={t(errors.answer?.message!)}
              variant="outline"
              className="mb-5"
            />
          </div>
          <Button
            data-variant="normal"
            className="inline-flex items-center justify-center flex-shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow focus:ring-1 focus:ring-accent-700 bg-accent text-light border border-transparent hover:bg-accent-hover px-5 py-0 h-12 ms-auto"
            type="submit"
          >
            Reply
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AnswerQuestionCard;
