import { Card } from 'antd';
import * as React from 'react';
import { ResourceTable } from 'webpanel-antd';
import { ResourceCollection, ResourceCollectionLayer } from 'webpanel-data';

import { api } from '../model/api';

export const users = (
  <ResourceCollectionLayer
    name="users"
    dataSource={api}
    fields={['id', 'username', 'firstname', 'lastname']}
    render={(resource: ResourceCollection) => {
      return (
        <Card title="Users">
          <ResourceTable
            resourceCollection={resource}
            columns={[
              { title: '#', key: 'id' },
              { title: 'Name', key: 'name' },
              { title: 'Username', key: 'username' }
            ]}
          />
        </Card>
      );
    }}
  />
);
