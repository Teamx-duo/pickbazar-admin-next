import Pagination from '@components/ui/pagination';
import { Table } from '@components/ui/table';
import ActionButtons from '@components/common/action-buttons';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@utils/locals';
import { adminOnly, getAuthCredentials, hasAccess } from '@utils/auth-utils';
import { ROUTES } from '@utils/routes';
import { IPaginator, Product, Question, User } from '@ts-types/generated';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Image from 'next/image';
import Like from '@components/icons/like';
import DisLike from '@components/icons/dislike';

type IProps = {
  questions?: IPaginator<Question>;
  onPagination: (current: number) => void;
};

const QuestionList = ({ questions, onPagination }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const router = useRouter();

  let columns = [
    {
      title: t('table:table-item-image'),
      dataIndex: 'product',
      key: 'product',
      align: alignLeft,
      render: (product: Product) => (
        <Image
          width={50}
          height={50}
          className="rounded-sm"
          src={product.image ?? '/product-placeholder-borderless.svg'}
        />
      ),
    },
    {
      title: t('table:table-item-question-answer'),
      align: 'left',
      render: (_: any, row: Question) => {
        return (
          <div>
            <h3 className="text-left text mb-2 text-sm font-semibold text-heading">
              <span className="me-1 inline-block uppercase">Q:</span>
              {row.question}{' '}
            </h3>
            <p className="text-left text-sm">
              <span className="me-1 inline-block font-semibold uppercase text-heading">
                A:
              </span>
              {row.answer}
            </p>
          </div>
        );
      },
    },
    {
      title: t('table:table-item-title'),
      dataIndex: 'user',
      key: 'user',
      align: 'center',
      render: (user: User) => user.name,
    },
    {
      title: t('table:table-item-products'),
      dataIndex: 'product',
      key: 'product',
      align: 'center',
      render: (product: Product) => product.name,
    },
    {
      title: t('table:table-item-feedbacks'),
      align: 'center',
      render: (_: any, row: Question) => (
        <div className="flex justify-center items-center space-x-4">
          <span className="flex items-center text-xs tracking-wider text-gray-400 transition">
            <Like />
            {row.positive_feedbacks_count}
          </span>
          <span className="flex items-center text-xs tracking-wider text-gray-400 transition">
            <DisLike />
            {row.negative_feedbacks_count}
          </span>
        </div>
      ),
    },
    {
      title: t('table:table-item-created-at'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: (date: string) => {
        dayjs.extend(relativeTime);
        dayjs.extend(utc);
        dayjs.extend(timezone);
        return (
          <span className="whitespace-nowrap">
            {dayjs.utc(date).tz(dayjs.tz.guess()).fromNow()}
          </span>
        );
      },
    },
    {
      title: t('table:table-item-actions'),
      dataIndex: '_id',
      key: 'actions',
      align: 'center',
      render: (id: string, row: Question) => {
        const { permissions } = getAuthCredentials();
        if (hasAccess(adminOnly, permissions)) {
          return (
            <ActionButtons
              editModalView={'ANSWER_QUESTION'}
              deleteModalView={'DELETE_QUESTION'}
              id={id}
              data={row}
            />
          );
        }
        return null;
      },
    },
  ];
  if (router?.query?.shop) {
    columns = columns?.filter((column) => column?.key !== 'actions');
  }
  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={questions?.data}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </div>

      {!!questions?.paginatorInfo.totalPages && (
        <div className="flex justify-end items-center">
          <Pagination
            total={questions?.paginatorInfo.totalPages}
            current={questions?.paginatorInfo.pagingCounter}
            pageSize={questions?.paginatorInfo.limit}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default QuestionList;
