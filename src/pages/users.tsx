import { Card } from 'antd';
import * as React from 'react';
import { ResourceTable } from 'webpanel-antd';
import {
  ResourceCollection,
  ResourceCollectionLayer,
  SortInfoOrder
} from 'webpanel-data';

import { api } from '../model/api';

export const users = (
  <ResourceCollectionLayer
    name="users"
    dataSource={api}
    fields={['id', 'username']}
    sorting={[{ columnKey: 'username', order: SortInfoOrder.ascend }]}
    render={(resource: ResourceCollection) => {
      return (
        <Card title="Users">
          <ResourceTable
            resourceCollection={resource}
            columns={[
              { title: '#', key: 'id' },
              { title: 'Username', key: 'username', sorter: true }
            ]}
          />
        </Card>
      );
    }}
  />
);
