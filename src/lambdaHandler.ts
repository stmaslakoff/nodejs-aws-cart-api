
import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@codegenie/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';
import { actionName } from 'aws-cdk-lib/pipelines/lib/private/identifiers';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  try {
    console.info('CartAPI Lambda initialization');

    server = server ?? (await bootstrap());
    return server(event, context, callback);
  } catch (error) {
    console.error('Error during Lambda initialization', error);
    throw error;
  }
};
