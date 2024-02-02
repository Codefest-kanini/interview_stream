import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthContext, AuthProvider } from './context';
import Auth  from './auth';

function AppWrapper  () {


    return (
      <AuthProvider>
        <AuthContext.Consumer>
            {({ isLoggedIn }) => (isLoggedIn ? <App /> : <Auth />)}
        </AuthContext.Consumer>
      </AuthProvider>
    );
  };

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<AppWrapper />);
