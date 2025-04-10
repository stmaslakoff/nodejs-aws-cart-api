import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';
import 'dotenv/config';

export const getCommonHandlerProps = (): Partial<NodejsFunctionProps> => ({
  runtime: lambda.Runtime.NODEJS_22_X,
  handler: 'handler',
  tracing: lambda.Tracing.ACTIVE,
  bundling: {
    // minify: true,
    // sourceMap: true,
    externalModules: [
      'class-transformer',
      'class-validator',
      '@nestjs/websockets',
      '@nestjs/microservices',
      '@nestjs/websockets/socket-module',
      '@nestjs/microservices/microservices-module'
    ],
  },
});

const HANDLERS_FOLDER = '../src';

export class NestjsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const commonHandlerProps = getCommonHandlerProps();

    const handler = new NodejsFunction(this, 'CartHandler', {
      ...commonHandlerProps,
      entry: path.join(__dirname, `${HANDLERS_FOLDER}/lambdaHandler.ts`),
      memorySize: 1024,
      timeout: cdk.Duration.seconds(30),
      environment: {
        NODE_ENV: process.env.NODE_ENV ?? 'development',
        DB_HOST: process.env.DB_HOST ?? '',
        DB_PORT: process.env.DB_PORT ?? '',
        DB_USERNAME: process.env.DB_USERNAME ?? '',
        DB_PASSWORD: process.env.DB_PASSWORD ?? '',
        DB_DATABASE: process.env.DB_DATABASE ?? '',
      },
    });

    const api = new apigateway.RestApi(this, 'CartAPI', {
      restApiName: 'CartAPI Service',
      description: 'CartAPI Gateway',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS
      }
    });

    const integration = new apigateway.LambdaIntegration(handler);

    api.root.addProxy({
      defaultIntegration: integration,
      anyMethod: true
    });

    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'API Gateway endpoint URL'
    });
  }
}
