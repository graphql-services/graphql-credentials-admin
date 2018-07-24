import { Card } from 'antd';
import * as React from 'react';
import { ResourceTable } from 'webpanel-antd';
import { ResourceCollection, ResourceCollectionLayer } from 'webpanel-data';

import { api } from '../model/api';

export const users = (
  <ResourceCollectionLayer
    name="users"
    dataSource={api}
    fields={['id', 'firstname', 'lastname']}
    render={(resource: ResourceCollection) => {
      return (
        <Card title="Users">
          <ResourceTable
            resourceCollection={resource}
            columns={[
              { title: '#', dataIndex: 'id' },
              { title: 'Name', dataIndex: 'name' },
              { title: 'Username', dataIndex: 'username' }
            ]}
          />
        </Card>
      );
    }}
  />
);
