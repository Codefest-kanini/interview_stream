import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthContext, AuthProvider } from './context';
import Auth  from './auth';

function AppWrapper  () {

    const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY
    
    if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
    }

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
