import logo from './logo.svg';
import './App.css';
import { Amplify, API} from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css';
import { useAuthenticator, withAuthenticator } from '@aws-amplify/ui-react';



Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: '2h5npnh7tq7trnqd3rl9keo0pm',
      userPoolId: 'us-east-1_IzAYAefOk',
      region: 'us-east-1'
    }
  }
});

function App() {
  async function callApi() {
    const user = await Auth.currentAuthenticatedUser()
    const token = user.signInUserSession.idToken.jwtToken
    console.log("token: ", token)

    const requestData = {
      headers: {
        Authorization: token
      }
    }
    const data = await API.get('rahasakappauthapi', '/documents', requestData)
    console.log("data: ", data)
  }

  const { signOut } = useAuthenticator()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={callApi}>Call API</button>
        <button onClick={() => signOut()}>Log Out</button>
      </header>
    </div>
  );
}

export default withAuthenticator(App);