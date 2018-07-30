import { Card } from 'antd';
import * as React from 'react';
import { ResourceTable } from 'webpanel-antd';
import { ResourceCollection, ResourceCollectionLayer } from 'webpanel-data';

import { api } from '../model/api';

export const roles = (
  <ResourceCollectionLayer
    name="roles"
    dataSource={api}
    fields={['id', 'name']}
    render={(resource: ResourceCollection) => {
      return (
        <Card title="Roles">
          <ResourceTable
            resourceCollection={resource}
            columns={[
              { title: '#', key: 'id' },
              { title: 'Name', key: 'name' }
            ]}
          />
        </Card>
      );
    }}
  />
);
