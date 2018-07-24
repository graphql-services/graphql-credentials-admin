import * as React from 'react';
import { Layout, LoginForm, RouteComponentProps } from 'webpanel-antd';
import { Auth, AuthContentProps, AuthFormProps } from 'webpanel-auth';

import { users } from './pages/users';

const layout = (props: AuthContentProps) => (
  <Layout
    menu={[
      <Layout.MenuItem
        key="/"
        path="/"
        title="Dashboard"
        icon="exclamation-circle-o"
      />,
      <Layout.MenuItem path="/users/" key="/users/" title="Users" icon="user" />
    ]}
    structure={{
      '/': {
        content: 'Hello world, welcome in demo app.',
        name: 'Dashboard'
      },
      '/users': { name: 'Users', content: users },
      '/users/:id': {
        content: (route: RouteComponentProps<any>) => {
          return `This is detail page for user ${route.match.params.id}`;
        },
        name: 'Users'
      }
    }}
    logout={props.logout}
  />
);

console.log(process.env); // tslint:disable-line
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
