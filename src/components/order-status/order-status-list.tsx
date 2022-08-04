import Pagination from '@components/ui/pagination';
import { Table } from '@components/ui/table';
import ActionButtons from '@components/common/action-buttons';
import { ROUTES } from '@utils/routes';
import {
  IPaginator,
  OrderStatus,
  OrderStatusPaginator,
} from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@utils/locals';

export type IProps = {
  order_statuses: IPaginator<OrderStatus> | undefined | null;
  onPagination: (key: number) => void;
};
const OrderStatusList = ({ order_statuses, onPagination }: IProps) => {
  const { data, paginatorInfo } = order_statuses!;
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();
  const columns = [
    {
      title: t('table:table-item-id'),
      dataIndex: '_id',
      key: '_id',
      ellipsis: true,
      align: 'center',
      width: 100,
    },
    {
      title: t('table:table-item-title'),
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      render: (name: string, record: OrderStatus) => (
        <span className="font-semibold" style={{ color: record?.color! }}>
          {name}
        </span>
      ),
    },
    {
      title: t('table:table-item-serial'),
      dataIndex: 'serial',
      key: 'serial',
      align: 'center',
    },
    {
      title: t('table:table-item-actions'),
      dataIndex: '_id',
      key: 'actions',
      align: alignRight,
      render: (id: string, record: OrderStatus) => (
        <ActionButtons
          id={id}
          editUrl={`${ROUTES.ORDER_STATUS}/edit/${record?._id}`}
          deleteModalView="DELETE_ORDER_STATUS"
        />
      ),
    },
  ];

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={data}
          rowKey="_id"
          scroll={{ x: 380 }}
        />
      </div>

      {!!paginatorInfo.totalPages && (
        <div className="flex justify-end items-center">
          <Pagination
            total={paginatorInfo.totalPages}
            current={paginatorInfo.pagingCounter}
            pageSize={paginatorInfo.limit}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default OrderStatusList;
