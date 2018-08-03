import { Card, Form } from 'antd';
import * as React from 'react';
import {
  Input,
  InputTextArea,
  ResourceForm,
  ResourceSelect
} from 'webpanel-antd';
import {
  Resource,
  ResourceCollection,
  ResourceCollectionLayer,
  ResourceLayer
} from 'webpanel-data';

import { api } from '../model/api';

export const userDetail = (id: string) => (
  <Card title="User">
    <ResourceLayer
      name="user"
      id={parseInt(id, 10)}
      dataSource={api}
      fields={['username', 'password', 'roles_id', 'permissions']}
      render={(detail: Resource) => {
        return (
          <ResourceForm formResource={detail}>
            <Form.Item label="Username">
              <Input name="username" placeholder={'Username'} />
            </Form.Item>
            <Form.Item label="Password [sha-512]">
              <Input name="password" placeholder="Password" />
            </Form.Item>
            <Form.Item label="Roles">
              <ResourceCollectionLayer
                name="roles"
                dataSource={api}
                fields={['id', 'name']}
                render={(resource: ResourceCollection) => (
                  <ResourceSelect
                    labelKey={(v: any) => `${v.name}`}
                    valueKey={(v: any) => v.id}
                    resourceCollection={resource}
                    mode="multiple"
                    name="roles_id"
                  />
                )}
              />
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
