import { Card, Form } from 'antd';
import * as React from 'react';
import {
  Input,
  InputTextArea,
  ResourceForm,
  RouteComponentProps
} from 'webpanel-antd';
import {
  Resource,
  // ResourceCollection,
  // ResourceCollectionLayer,
  ResourceLayer
} from 'webpanel-data';

import { api } from '../model/api';

export const roleDetail = (route: RouteComponentProps<any>, id?: string) => (
  <Card title="Role">
    <ResourceLayer
      name="role"
      id={id && parseInt(id, 10)}
      dataSource={api}
      onCreate={(resourceId: string) => {
        route.history.push(`${resourceId}`);
      }}
      fields={['name', 'permissions']}
      render={(detail: Resource) => {
        return (
          <ResourceForm formResource={detail}>
            <Form.Item label="Name">
              <Input name="name" placeholder={'Name'} />
            </Form.Item>
            <Form.Item label="Permissions">
              <InputTextArea name="permissions" placeholder="Permissions" />
            </Form.Item>
          </ResourceForm>
        );
      }}
    />
  </Card>
);
