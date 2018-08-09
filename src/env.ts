interface IENV {
  REACT_APP_API_URL: string;
  REACT_APP_TOKEN_URL: string;
  REACT_APP_CLIENT_ID?: string;
  REACT_APP_CLIENT_SECRET?: string;
  REACT_APP_SCOPE?: string;
}

export const ENV: IENV = (window as any).ENV || process.env;

if (!ENV.REACT_APP_API_URL) {
  throw new Error('REACT_APP_API_URL is not specified');
}

if (!ENV.REACT_APP_TOKEN_URL) {
  throw new Error('REACT_APP_TOKEN_URL is not specified');
}
