import * as React from 'react';
import { Layout, LoginForm, RouteComponentProps } from 'webpanel-antd';
import { Auth, AuthContentProps, AuthFormProps } from 'webpanel-auth';

import { roles } from './pages/roles';
import { userDetail } from './pages/user-detail';
import { users } from './pages/users';

const layout = (props: AuthContentProps) => (
  <Layout
    menu={[
      <Layout.MenuItem key="/" title="Dashboard" icon="exclamation-circle-o" />,
      <Layout.MenuItem key="/users/" title="Users" icon="user" />,
      <Layout.MenuItem key="/roles/" title="Roles" icon="key" />
    ]}
    structure={[
      <Layout.StructureItem
        key="/"
        name="Dashboard"
        content={(route: RouteComponentProps<any>) => 'Hello world!'}
      />,
      <Layout.StructureItem key="/users/" name="Users" content={users} />,
      <Layout.StructureItem
        key="/users/new"
        name="Create user"
        content={(route: RouteComponentProps<any>) => userDetail(route)}
      />,
      <Layout.StructureItem
        key="/users/:id"
        name="Edit user"
        content={(route: RouteComponentProps<any>) =>
          userDetail(route, route.match.params.id)
        }
      />,
      <Layout.StructureItem key="/roles/" name="Roles" content={roles} />
    ]}
    logout={props.logout}
  />
);

export const content = (
  <Auth
    oauthTokenURL={process.env.REACT_APP_TOKEN_URL || ''}
    clientId={process.env.REACT_APP_CLIENT_ID}
    clientSecret={process.env.REACT_APP_CLIENT_SECRET}
    scope={process.env.REACT_APP_SCOPE}
    content={layout}
    form={(props: AuthFormProps) => {
      return <LoginForm authorizationInfo={props} />;
    }}
  />
);
