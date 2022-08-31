import dynamic from 'next/dynamic';
import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  allowedRoles,
  getAuthCredentials,
  hasAccess,
  isAuthenticated,
} from '@utils/auth-utils';
import { SUPER_ADMIN } from '@utils/constants';
import { ROUTES } from '@utils/routes';
import AppLayout from '@components/layouts/app';
import nextI18NextConfig from '../../next-i18next.config';

const AdminDashboard = dynamic(() => import('@components/dashboard/admin'));
const OwnerDashboard = dynamic(() => import('@components/dashboard/owner'));

export default function Dashboard({
  userPermissions,
}: {
  userPermissions: string[];
}) {
  if (userPermissions?.includes(SUPER_ADMIN)) {
    return <AdminDashboard />;
  }
  return <OwnerDashboard />;
}

Dashboard.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  ...ctx
}) => {
  const { token, permissions } = getAuthCredentials(ctx);
  if (
    !isAuthenticated({ token, permissions }) ||
    !hasAccess(allowedRoles, permissions)
  ) {
    return {
      redirect: {
        destination: ROUTES.LOGIN,
        permanent: false,
      },
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(
        locale!,
        ['common', 'table', 'widgets'],
        nextI18NextConfig
      )),
      userPermissions: permissions,
    },
  };
  // return {
  //   props: {
  //     userPermissions: permissions,
  //   },
  // };
};
