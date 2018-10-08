import * as React from 'react';
import { Admin, Entity } from 'webpanel-admin';

import { AuthSession } from 'webpanel-auth';
import { ENV } from './env';
import { api } from './model/api';

const user: Entity<any> = new Admin.Entity<any>({
  name: 'User',
  dataSource: api
})
  .field('username')
  .field({ name: 'password', visibility: { detail: true } })
  .field({
    name: 'roles_ids',
    type: 'relationship',
    targetEntity: () => role,
    toMany: true,
    visibility: { detail: true }
  })
  .field({
    name: 'roles',
    type: 'relationship',
    targetEntity: () => role,
    toMany: true,
    visibility: { list: true }
  })
  .field({ name: 'permissions', type: 'text' });

const role: Entity<any> = new Admin.Entity<any>({
  name: 'Role',
  dataSource: api
})
  .field('name')
  .field({
    name: 'users_ids',
    type: 'relationship',
    targetEntity: () => user,
    toMany: true,
    visibility: { detail: true }
  })
  .field({
    name: 'permissions',
    type: 'text'
  });

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
        return payload.user && payload.user.username;
      }
    }}
    entities={[user, role]}
  />
);
