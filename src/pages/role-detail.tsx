import { Card, Input as AInput } from 'antd';
import * as React from 'react';
import {
  FormField,
  Input,
  ResourceForm,
  ResourceFormButtons,
  RouteComponentProps
} from 'webpanel-antd';
import {
  Resource,
  // ResourceCollection,
  // ResourceCollectionLayer,
  ResourceLayer
} from 'webpanel-data';

import { FormContext } from '../../node_modules/webpanel-antd/lib/form/form/Form';
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
      render={(detail: Resource) => (
        <ResourceForm
          formResource={detail}
          render={(formContext: FormContext) => (
            <>
              <FormField name="name" label="Name" formContext={formContext}>
                <Input placeholder={'Name'} />
              </FormField>
              <FormField
                label="Permissions"
                name="permissions"
                formContext={formContext}
              >
                <AInput.TextArea placeholder="Permissions" />
              </FormField>
              <ResourceFormButtons formContext={formContext} />
            </>
          )}
        />
      )}
    />
  </Card>
);
