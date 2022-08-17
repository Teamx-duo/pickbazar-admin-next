import Card from '@components/common/card';
import Layout from '@components/layouts/admin';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import WithdrawList from '@components/withdraw/withdraw-list';
import { adminOnly } from '@utils/auth-utils';
import { useWithdrawsQuery } from '@data/withdraw/use-withdraws.query';
import { useState } from 'react';
import SortForm from '@components/common/sort-form';
import { SortOrder } from '@ts-types/generated';
import { useReviewsQuery } from '@data/reviews/use-reviews.query';
import ReviewList from '@components/review/review-list';

export default function ReviewsPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState('createdAt');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const {
    data,
    isLoading: loading,
    error,
  } = useReviewsQuery({
    limit: 10,
    page,
    sortedBy,
    orderBy,
  });

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <>
      <Card className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-heading">
            {t('common:sidebar-nav-item-reviews')}
          </h1>
        </div>

        <SortForm
          showLabel={false}
          className="w-full md:w-2/4"
          onSortChange={({ value }: { value: SortOrder }) => {
            setColumn(value);
          }}
          onOrderChange={({ value }: { value: string }) => {
            setOrder(value);
          }}
          options={[
            { value: 'createdAt', label: 'Created At' },
            { value: 'updatedAt', label: 'Updated At' },
          ]}
        />
      </Card>

      <ReviewList reviews={data?.reviews} onPagination={handlePagination} />
    </>
  );
}
ReviewsPage.authenticate = {
  permissions: adminOnly,
};
ReviewsPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
