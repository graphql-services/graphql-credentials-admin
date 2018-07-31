import * as dotenv from 'dotenv';
dotenv.config({});

const ENV = (window as any).ENV as { [key: string]: string } | undefined;
if (ENV) {
  for (const key of Object.keys(ENV)) {
    process.env[key] = ENV[key];
  }
}
