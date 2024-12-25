import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { PaasswordLessPolicy } from './auth/custom/resource';

const backend = defineBackend({
  auth,
  data,
});

const userPool = backend.auth.resources.userPool;
const client = backend.auth.resources.userPoolClient;
new PaasswordLessPolicy(
  backend.createStack('PaasswordLessPolicy'),
  'PasswordlessPolicy',
  { userPool, client },
);