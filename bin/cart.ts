#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { NestjsStack } from '../infra/nestjs-stack';

const app = new cdk.App();
new NestjsStack(app, 'NestjsStack');
