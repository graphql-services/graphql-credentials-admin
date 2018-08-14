import { Card, Input as AInput } from 'antd';
import * as React from 'react';
import {
  FormField,
  Input,
  ResourceForm,
  ResourceSelect,
  RouteComponentProps
} from 'webpanel-antd';
import {
  Resource,
  ResourceCollection,
  ResourceCollectionLayer,
  ResourceLayer
} from 'webpanel-data';

import { FormContext } from '../../node_modules/webpanel-antd/lib/form/form/Form';
import { api } from '../model/api';

export const userDetail = (route: RouteComponentProps<any>, id?: string) => (
  <Card title="User">
    <ResourceLayer
      name="user"
      id={id && parseInt(id, 10)}
      dataSource={api}
      onCreate={(resourceId: string) => {
        route.history.push(`${resourceId}`);
      }}
      fields={['username', 'password', 'roles_id', 'permissions']}
      render={(detail: Resource) => (
        <ResourceForm
          formResource={detail}
          render={(formContext: FormContext) => (
            <>
              <FormField
                formContext={formContext}
                label="Username"
                name="username"
                rules={[{ required: true }]}
              >
                <Input placeholder={'Username'} />
              </FormField>
              <FormField
                formContext={formContext}
                name="password"
                label="Password [sha-512]"
                rules={[{ required: true }]}
              >
                <Input placeholder="Password" />
              </FormField>
              <ResourceCollectionLayer
                name="roles"
                dataSource={api}
                fields={['id', 'name']}
                render={(resource: ResourceCollection) => (
                  <FormField
                    formContext={formContext}
                    label="Roles"
                    name="roles_id"
                  >
                    <ResourceSelect
                      labelKey={(v: any) => `${v.name}`}
                      valueKey={(v: any) => v.id}
                      resourceCollection={resource}
                      mode="multiple"
                    />
                  </FormField>
                )}
              />
              <FormField
                formContext={formContext}
                label="Permissions"
                name="permissions"
              >
                <AInput.TextArea placeholder="Permissions" />
              </FormField>
            </>
          )}
        />
      )}
    />
  </Card>
);
