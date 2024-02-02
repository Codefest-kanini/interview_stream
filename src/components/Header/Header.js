import { useContext } from 'react';
import './Header.css';
import { AuthContext } from '../../context/index';
import supabase from '../../supabase.config';

export default function Header() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log('Error logging out:', error.message) 
    else setIsLoggedIn(false);
  }

  return (
    <header style={{background:'#090909', color:'#fff'}}>
      <div className="header-section">
        {/* <img src="/images/logo.svg" alt="Daily logo" /> */}
        <span className="title">Binay</span>
      </div>
      <div>
        <button type='button' onClick={()=>signOut()}>Sign out</button>
      </div>
    </header>
  );
}
