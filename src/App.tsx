import * as React from 'react';
import { Admin, Entity } from 'webpanel-admin';

import { AuthSession } from 'webpanel-auth';
import { SortInfoOrder } from 'webpanel-data';
import { ENV } from './env';
import { api } from './model/api';

export const role = new Entity({
  name: 'Role',
  initialSorting: [{ columnKey: 'name', order: SortInfoOrder.ascend }],
  list: { table: { condensed: true } },
  dataSource: api
})
  .stringField('code', { visible: ['list', 'edit'], sortable: true })
  .stringField('name', { visible: ['list', 'edit', 'search'], sortable: true })
  .textField('permissions', { hidden: ['list'] });

export const user = new Entity({
  name: 'User',
  dataSource: api,
  initialSorting: [
    { columnKey: 'lastname', order: SortInfoOrder.ascend },
    { columnKey: 'firstname', order: SortInfoOrder.ascend }
  ],
  list: { table: { condensed: true } },
  searchable: true,
  render: (data: any | null) =>
    data
      ? `${data.titlePrefix || ''} ${data.firstname} ${
          data.lastname
        } ${data.titleSuffix || ''}`
      : '–'
})
  .stringField('username', {
    visible: ['list', 'edit', 'search'],
    rules: [{ required: true }],
    sortable: true
  })
  .passwordField('password', {
    visible: ['edit'],
    attributes: { type: 'password', autoComplete: 'new-password' }
  })
  .stringField('firstname', {
    visible: ['list', 'edit', 'search'],
    sortable: true
  })
  .stringField('lastname', {
    visible: ['list', 'edit', 'search'],
    sortable: true
  })
  .relationshipField('roles', {
    targetEntity: role,
    type: 'toMany'
  })
  .textField('permissions', { hidden: ['list'] });

export const App = () => (
  <Admin
    auth={{
      type: 'oauth',
      oauthTokenURL: ENV.REACT_APP_TOKEN_URL,
      clientId: ENV.REACT_APP_CLIENT_ID,
      clientSecret: ENV.REACT_APP_CLIENT_SECRET,
      scope: ENV.REACT_APP_SCOPE,
      userNameGetter: (session: AuthSession) => {
        const payload = session.getTokenPayload();
        return payload && payload.user && payload.user.username;
      }
    }}
    entities={[user, role]}
  />
);
