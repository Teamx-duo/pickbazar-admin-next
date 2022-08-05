import Pagination from '@components/ui/pagination';
import Image from 'next/image';
import { Table } from '@components/ui/table';
import ActionButtons from '@components/common/action-buttons';
import { siteSettings } from '@settings/site.settings';
import usePrice from '@utils/use-price';
import Badge from '@components/ui/badge/badge';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import {
  IPaginator,
  Product,
  ProductPaginator,
  ProductType,
  Shop,
} from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';

export type IProps = {
  products?: IPaginator<Product>;
  onPagination: (current: number) => void;
};

const ProductList = ({ products, onPagination }: IProps) => {
  const { data, paginatorInfo } = products! ?? {};

  const router = useRouter();
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();

  let columns = [
    {
      title: t('table:table-item-image'),
      dataIndex: 'image',
      key: 'image',
      align: alignLeft,
      width: 74,
      render: (image: any, { name }: { name: string }) => (
        <Image
          src={image ?? siteSettings.product.placeholder}
          alt={name}
          layout="fixed"
          width={42}
          height={42}
          className="rounded overflow-hidden"
        />
      ),
    },
    {
      title: t('table:table-item-title'),
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      width: 200,
      ellipsis: true,
    },
    {
      title: t('table:table-item-group'),
      dataIndex: 'type',
      key: 'type',
      width: 120,
      align: 'center',
      ellipsis: true,
      render: (type: any) => (
        <span className="whitespace-nowrap truncate">{type?.name}</span>
      ),
    },
    {
      title: t('table:table-item-shop'),
      dataIndex: 'shop',
      key: 'shop',
      width: 120,
      align: 'center',
      ellipsis: true,
      render: (shop: Shop) => (
        <span className="whitespace-nowrap truncate">{shop?.name}</span>
      ),
    },
    {
      title: 'Product Type',
      dataIndex: 'product_type',
      key: 'product_type',
      width: 120,
      align: 'center',
      render: (product_type: string) => (
        <span className="whitespace-nowrap truncate">{product_type}</span>
      ),
    },
    // {
    //   title: t('table:table-item-unit'),
    //   dataIndex: 'price',
    //   key: 'price',
    //   align: alignRight,
    //   width: 100,
    //   render: (value: number, record: Product) => {
    //     const { price } = usePrice({
    //       amount: value,
    //     });
    //     const { price: max_price } = usePrice({
    //       amount: record?.max_price as number,
    //     });
    //     const { price: min_price } = usePrice({
    //       amount: record?.min_price as number,
    //     });
    //     if (record?.product_type === ProductType.Variable) {
    //       return (
    //         <span
    //           className="whitespace-nowrap"
    //           title={`${min_price} - ${max_price}`}
    //         >{`${min_price} - ${max_price}`}</span>
    //       );
    //     } else {
    //       return (
    //         <span className="whitespace-nowrap" title={price}>
    //           {price}
    //         </span>
    //       );
    //     }
    //   },
    // },
    {
      title: t('table:table-item-quantity'),
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      width: 100,
    },
    {
      title: t('table:table-item-status'),
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 100,
      render: (status: string) => (
        <Badge
          text={status}
          color={
            status.toLocaleLowerCase() === 'draft'
              ? 'bg-yellow-400'
              : 'bg-accent'
          }
        />
      ),
    },
    {
      title: t('table:table-item-actions'),
      dataIndex: 'slug',
      key: 'actions',
      align: 'center',
      width: 80,
      render: (slug: string, record: Product) => (
        <ActionButtons
          id={record?._id}
          editUrl={`${router.asPath}/${slug}/edit`}
          deleteModalView="DELETE_PRODUCT"
        />
      ),
    },
  ];

  if (router?.query?.shop) {
    columns = columns?.filter((column) => column?.key !== 'shop');
  }

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          /* @ts-ignore */
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={data}
          rowKey="_id"
          scroll={{ x: 900 }}
        />
      </div>

      {!!paginatorInfo.totalDocs && (
        <div className="flex justify-end items-center">
          <Pagination
            total={paginatorInfo.totalPages}
            current={paginatorInfo.pagingCounter}
            pageSize={paginatorInfo.limit}
            onChange={onPagination}
            showLessItems
          />
        </div>
      )}
    </>
  );
};

export default ProductList;
