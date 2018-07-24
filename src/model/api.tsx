import {
  DataSource,
  ResourceCollectionResponse,
  ResponseDataTransformer,
  RestConnector as Connector
} from 'webpanel-data';

class CustomTransformer extends ResponseDataTransformer {
  public async list(data: any): Promise<ResourceCollectionResponse> {
    return {
      count: data.length,
      items: data
    };
  }
}

const connector = new Connector({
  responseDataTransformer: new CustomTransformer()
});

export const api = new DataSource(
  'api',
  connector,
  'http://jsonplaceholder.typicode.com/'
);
