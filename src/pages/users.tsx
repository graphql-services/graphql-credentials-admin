import { Button, Card } from 'antd';
import * as React from 'react';
import { Link, ResourceTable } from 'webpanel-antd';
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
    fields={['id', 'username', 'roles { name }']}
    sorting={[{ columnKey: 'username', order: SortInfoOrder.ascend }]}
    render={(resource: ResourceCollection) => {
      return (
        <Card
          title="Users"
          extra={
            <Link to="./new">
              <Button>Add</Button>
            </Link>
          }
        >
          <ResourceTable
            resourceCollection={resource}
            columns={[
              { title: '#', key: 'id' },
              { title: 'Username', key: 'username', sorter: true },
              {
                title: 'Roles',
                key: 'roles',
                render: (value: any[]): React.ReactNode => {
                  return value.map(x => x.name).join(', ');
                }
              }
            ]}
          />
        </Card>
      );
    }}
  />
);
