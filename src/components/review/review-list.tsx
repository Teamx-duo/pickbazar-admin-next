import Pagination from '@components/ui/pagination';
import { Table } from '@components/ui/table';
import ActionButtons from '@components/common/action-buttons';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@utils/locals';
import usePrice from '@utils/use-price';
import { adminOnly, getAuthCredentials, hasAccess } from '@utils/auth-utils';
import { ROUTES } from '@utils/routes';
import {
  IPaginator,
  Product,
  Question,
  Review,
  Shop,
  User,
  Withdraw,
} from '@ts-types/generated';
import { useRouter } from 'next/router';
import Badge from '@components/ui/badge/badge';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Image from 'next/image';
import Like from '@components/icons/like';
import DisLike from '@components/icons/dislike';
import CheckmarkRound from '@components/icons/checkmark-round';
import StarSmall from '@components/icons/star-small';

type IProps = {
  reviews?: IPaginator<Review>;
  onPagination: (current: number) => void;
};

const ReviewList = ({ reviews, onPagination }: IProps) => {
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
      render: (_: any, row: Review) => {
        return (
          <div className="block">
            <div className="mb-3 flex items-center text-xs text-gray-500">
              By{' '}
              <span className="font-semibold capitalize text-heading ltr:ml-1 rtl:mr-1">
                {row.user?.name}
              </span>
              <CheckmarkRound />
            </div>
            <p className="text-sm leading-6 text-heading">{row.comment}</p>
            <div className="mt-3 flex items-center space-x-4">
              <span className="flex items-center text-xs tracking-wider text-gray-400 transition">
                <Like /> {row.positive_feedbacks_count ?? 0}
              </span>
              <span className="flex items-center text-xs tracking-wider text-gray-400 transition">
                <DisLike /> {row.negative_feedbacks_count ?? 0}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: t('table:table-item-title'),
      dataIndex: 'rating',
      key: 'rating',
      align: 'center',
      render: (rating: number) => (
        <div className="inline-flex shrink-0 items-center rounded-full border border-accent px-3 py-0.5 text-base text-accent">
          {rating ?? 0} <StarSmall />
        </div>
      ),
    },
    {
      title: t('table:table-item-products'),
      dataIndex: 'product',
      key: 'product',
      align: 'center',
      render: (product: Product) => product.name,
    },
    {
      title: t('table:table-item-reports'),
      dataIndex: 'abusive_reports_count',
      key: 'abusive_reports_count',
      align: 'center',
      render: (abusive_reports_count: number) => abusive_reports_count,
    },
    {
      title: t('table:table-item-date'),
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
      render: (id: string) => {
        return <ActionButtons deleteModalView={'DELETE_REVIEW'} id={id} />;
      },
    },
  ];
  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={reviews?.data}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </div>

      {!!reviews?.paginatorInfo.totalPages && (
        <div className="flex justify-end items-center">
          <Pagination
            total={reviews?.paginatorInfo.totalPages}
            current={reviews?.paginatorInfo.pagingCounter}
            pageSize={reviews?.paginatorInfo.limit}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default ReviewList;
