import { useAuthenticator } from '@aws-amplify/ui-react';
import { confirmSignIn, signIn } from "aws-amplify/auth"
import '@aws-amplify/ui-react/styles.css';
import { FormEvent, useState } from 'react';

interface SignInFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
}

interface SignInForm extends HTMLFormElement {
  readonly elements: SignInFormElements
}

interface OTPFormElements extends HTMLFormControlsCollection {
  challengeResponse: HTMLInputElement
}

interface OTPForm extends HTMLFormElement {
  readonly elements: OTPFormElements
}

function App() {
  const { signOut, authStatus } = useAuthenticator((context) => [
    context.authStatus
  ]);

  const [signInStep, setSignInStep] = useState('SIGN_IN_WITH_EMAIL');

  async function handleSubmitFirst(event: FormEvent<SignInForm>) {
    event.preventDefault();
    const form = event.currentTarget
    // ... validate inputs
    const { nextStep: signInNextStep } = await signIn({
      username: form.elements.email.value,
      options: {
        authFlowType: 'USER_AUTH',
        preferredChallenge: 'EMAIL_OTP',
      },
    });
    setSignInStep(signInNextStep.signInStep);
  }

  async function handleSubmitSecond(event: FormEvent<OTPForm>) {
    event.preventDefault();
    if (signInStep === 'CONFIRM_SIGN_IN_WITH_EMAIL_CODE') {
      const form = event.currentTarget
      // prompt user for otp code delivered via email
      const { nextStep: confirmSignInNextStep } = await confirmSignIn({
        challengeResponse: form.elements.challengeResponse.value,
      });
      setSignInStep(confirmSignInNextStep.signInStep);
    }
  }

  return (
    <main>
      {authStatus === 'authenticated' ? (
        <>
          <h1>Welcome to the app!</h1>
          <button onClick={signOut}>Sign out</button>
          <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
              Review next step of this tutorial.
            </a>
          </div>
        </>
      ) : (
        <>
          {signInStep === 'SIGN_IN_WITH_EMAIL' && (
            <form onSubmit={handleSubmitFirst}>
              <label>
                Email
                <input type="email" name="email" required />
              </label>
              <button type="submit">Sign in</button>
            </form>
          )}
          {signInStep === 'CONFIRM_SIGN_IN_WITH_EMAIL_CODE' && (
            <form onSubmit={handleSubmitSecond}>
              <label>
                OTP
                <input type="text" name="challengeResponse" required />
              </label>
              <button type="submit">Sign in</button>
            </form>
          )}
        </>
      )}
    </main>
  );
}

export default App;
