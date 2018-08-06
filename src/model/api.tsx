import {
  DataSource,
  GraphQLConnector as Connector,
  ResourceCollectionResponse,
  ResourceResponse,
  ResponseDataTransformer
} from 'webpanel-data';

class CustomTransformer extends ResponseDataTransformer {
  public async list(data: any): Promise<ResourceCollectionResponse> {
    // global.console.log('???!!', data);
    // const firstKey = Object.keys(data)[0];
    // const wrapper = data[firstKey];
    // return {
    //   count: wrapper.count,
    //   items: wrapper.items
    // };
    return data;
  }
  public async create(data: any): Promise<ResourceResponse> {
    global.console.log('create??', data);
    return data;
  }
}

const connector = new Connector({
  responseDataTransformer: new CustomTransformer()
});

if (!process.env.REACT_APP_API_URL) {
  throw new Error('REACT_APP_API_URL is not specified');
}

export const api = new DataSource(
  'api',
  connector,
  process.env.REACT_APP_API_URL
);
