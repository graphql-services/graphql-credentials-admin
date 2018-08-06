import { Button, Card } from 'antd';
import * as React from 'react';
import { Link, ResourceTable } from 'webpanel-antd';
import {
  ResourceCollection,
  ResourceCollectionLayer,
  SortInfoOrder
} from 'webpanel-data';

import { api } from '../model/api';

export const roles = (
  <ResourceCollectionLayer
    name="roles"
    dataSource={api}
    fields={['id', 'name']}
    sorting={[{ columnKey: 'name', order: SortInfoOrder.ascend }]}
    render={(resource: ResourceCollection) => {
      return (
        <Card
          title="Roles"
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
              { title: 'Name', key: 'name', sorter: true }
            ]}
          />
        </Card>
      );
    }}
  />
);
