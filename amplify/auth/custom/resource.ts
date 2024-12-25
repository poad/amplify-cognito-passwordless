import * as cognito from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

interface PaasswordLessPolicyProps {
  userPool: cognito.IUserPool;
  client: cognito.IUserPoolClient;
}

export class PaasswordLessPolicy extends Construct {
  constructor(scope: Construct, id: string, props: PaasswordLessPolicyProps) {
    super(scope, id);

    const { userPool, client } = props;

    const cfnUserPool = userPool.node.defaultChild as cognito.CfnUserPool;
    cfnUserPool.addPropertyOverride('Policies.SignInPolicy', {
      AllowedFirstAuthFactors: ['PASSWORD', 'EMAIL_OTP'],
    });

    const cfnClient = client.node.defaultChild as cognito.CfnUserPoolClient;
    cfnClient.addPropertyOverride('ExplicitAuthFlows', ['ALLOW_CUSTOM_AUTH', 'ALLOW_REFRESH_TOKEN_AUTH', 'ALLOW_USER_AUTH']);
  }
}