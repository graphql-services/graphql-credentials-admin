import { Card, Form } from 'antd';
import * as React from 'react';
import { Input, ResourceForm, ResourceSelect } from 'webpanel-antd';
import {
  Resource,
  ResourceCollection,
  ResourceCollectionLayer,
  ResourceLayer
} from 'webpanel-data';

import { api } from '../model/api';

const getFieldAutoComplete = (resource: ResourceCollection | Resource, field: string, id: string) => (
  resource &&
  !resource.loading &&
  resource.data ? resource.data[parseInt(id, 10)-1][field] : ''
);

export const userDetail = (id: string) => (
  <ResourceCollectionLayer
    name="user"
    dataSource={api}
    fields={['username', 'password', 'roles_id', 'permissions']}
    render={(user: ResourceCollection) => {
      return (
        <Card title="User">
          <ResourceLayer
            name="user"
            dataSource={api}
            fields={['username', 'password', 'roles_id', 'permissions']}
            render={(detail: Resource) => {
              return <ResourceForm formResource={detail}>
                <Form.Item>
                  <Input
                    name="username"
                    placeholder={'Username'}
                    initialValue={getFieldAutoComplete(user, 'username', id)}
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    name="password"
                    placeholder="Password"
                    initialValue={getFieldAutoComplete(user, 'password', id)}
                  />
                </Form.Item>
                <Form.Item>
                  <ResourceCollectionLayer
                    name="roles"
                    dataSource={api}
                    fields={['id', 'name', 'permissions']}
                    render={(resource: ResourceCollection) => (
                      <ResourceSelect
                        labelKey={(v: any) => `${v.name} (${v.permissions})`}
                        valueKey={(v: any) => `${v.id}`}
                        resourceCollection={resource}
                        mode="default"
                        name="roles_id"
                        placeholder="Role"
                        // initialValue={resource.data && resource.data.find((role: any) => {
                        //   console.log('resiurce', resource); // tslint:disable-line
                        //   return `${role.id}` === `${getFieldAutoComplete(user, 'roles_id', id)}`
                        // })[0].name}
                      />
                      )}
                    />
                </Form.Item>
                <Form.Item>
                  <Input
                    name="permissions"
                    placeholder="Permissions"
                    initialValue={getFieldAutoComplete(user, 'permissions', id)}
                  />
                </Form.Item>
              </ResourceForm>
            }}
          />
        </Card>
      );
    }}
  />
);
