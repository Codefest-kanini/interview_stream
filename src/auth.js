import React, { useContext, useState } from "react";
import { AuthContext } from './context/index';
import supabase from "./supabase.config";
import Screen from "./assets/samplescreen.png"
import Logo from "./assets/logo.png"

export default function Auth() {
    const { setIsLoggedIn } = useContext(AuthContext);
    const [signUp, setSignUp] = useState(false);

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [company, setCompany] = useState('')
    const [password, setPassword] = useState('')
    


    const signUpUser = async() => {
        console.log('signUpUser')

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          })

          alert(JSON.stringify(data))


          if(data && !error) {
            setIsLoggedIn(true);
          }
            
    }

    const signInUser = async() => {
        console.log(name,company)
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        alert(JSON.stringify(data))
        
        if(data && !error) {
            setIsLoggedIn(true);
        }
        
    }
    

    return(
        <div className="globalbg-card " style={{display:'flex', width:'100vw', height:'100vh', color:'#fff', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            {signUp ? (
                <div style={{display:'flex', flexDirection:'column', width:'25vw', paddingTop:'2rem', paddingBottom:'2rem', paddingLeft:'3rem', paddingRight:'3rem', backdropFilter:'blur(20px)', alignItems:'center', justifyContent:'center', height:'100vh', background:'#fff'}} >
                    <div style={{display:'flex', flexDirection:'row-reverse', alignItems:'center', gap:'12px'}}>
                        <img src={Logo} alt="logo" style={{width:'48px', objectFit:'contain', borderRadius:'12px'}} />
                        <img src='https://i.postimg.cc/J0C2PB8K/Whats-App-Image-2024-02-02-at-02-52-37-c3a66afc.jpg' style={{width:'48px', objectFit:'contain', borderRadius:'12px'}} alt="logo" />
                    </div>
                    {/* <h1 style={{textAlign:'start', fontSize:'1.8rem', color:'white', borderBottom:'1px',width:'100%', borderColor:'black', margin:'4px', textDecoration:'underline'}}>
                        Sign Up Form
                    </h1> */}
                    <form style={{margin:'12px',display:'flex', flexDirection:'column', alignItems:'center', gap:'6px' }}>
                        <h1 style={{fontSize:'1.5rem', color:'#090909'}}>Binay Enterprises</h1>
                        <div style={{display:'flex', flexDirection:'column', gap:'8px', marginTop:'10px', marginBottom:'10px', width:'100%'}}>
                            <label htmlFor="email" style={{color:'#090909'}}>Email </label>
                            <input type="email" placeholder="Email" style={{width:'100%', fontFamily:'monospace', padding:'12px', borderRadius:'4px'}} onChange={(e) => setEmail(e.target.value)} />

                            <label htmlFor="password" style={{color:'#090909'}}>Password </label>
                            <input type="password" placeholder="Password" style={{width:'100%', fontFamily:'monospace', padding:'12px', borderRadius:'4px'}} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </form>
                    <button type="button" style={{background:'#1029C5', color:'#f0f0f0', marginBottom:'2px'}} onClick={() => signInUser()}>Sign In</button>
                    <button type="button" style={{background:'transparent', border:'1px solid', borderColor:'black', color:'#090909', marginTop:'4px'}} onClick={() => setSignUp(false)}>Click here to Sign Up instead</button>
                </div>
            ) : (
                <div style={{display:'flex', flexDirection:'column', width:'25vw', paddingTop:'2rem', paddingBottom:'2rem', paddingLeft:'3rem', paddingRight:'3rem', backdropFilter:'blur(20px)', alignItems:'center', justifyContent:'center', height:'100vh', background:'#fff'}} >
                    
                    <div style={{display:'flex', flexDirection:'row-reverse', alignItems:'center', gap:'12px'}}>
                        <img src={Logo} alt="logo" style={{width:'48px', objectFit:'contain', borderRadius:'12px'}} />
                        <img src='https://i.postimg.cc/J0C2PB8K/Whats-App-Image-2024-02-02-at-02-52-37-c3a66afc.jpg' style={{width:'48px', objectFit:'contain', borderRadius:'12px'}} alt="logo" />
                    </div>

                    <form style={{margin:'12px',display:'flex', flexDirection:'column', alignItems:'center', gap:'6px' }}>
                        
                        <h1 style={{fontSize:'1.5rem', color:'#090909'}}>Binay Enterprises</h1>
                        <div style={{display:'flex', flexDirection:'column', gap:'12px', marginTop:'10px', marginBottom:'10px', width:'100%'}}>

                            <label htmlFor="name" style={{color:'#090909'}}>Name </label>
                            <input type="text" placeholder="Name" style={{width:'100%', fontFamily:'monospace', padding:'12px', borderRadius:'4px'}} onChange={(e) => setName(e.target.value)}/>

                            <label htmlFor="Company" style={{color:'#090909'}}>Company </label>
                            <input type="text" placeholder="Company" style={{width:'100%', fontFamily:'monospace', padding:'12px', borderRadius:'4px'}} onChange={(e) => setCompany(e.target.value)}/>

                            <label htmlFor="email" style={{color:'#090909'}}>Email </label>
                            <input type="email" placeholder="Email" style={{width:'100%', fontFamily:'monospace', padding:'12px', borderRadius:'4px'}} onChange={(e) => setEmail(e.target.value)} />

                            <label htmlFor="password" style={{color:'#090909'}}>Password </label>
                            <input type="password" placeholder="Password" style={{width:'100%', fontFamily:'monospace', padding:'12px', borderRadius:'4px'}} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </form>
                    <button type="button" style={{background:'#1029C5', color:'#f0f0f0', marginBottom:'2px'}} onClick={() => signUpUser()}>Sign Up</button>
                    <button type="button" style={{background:'transparent', border:'1px solid', borderColor:'black', color:'#090909', marginTop:'4px'}} onClick={() => setSignUp(true)}>Click here to Sign In instead</button>
                </div>
            )}
            <div style={{width:'100%', display:'flex',flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <img src={Screen} alt="meet asset" style={{width:'auto', height:'700px'}}/>
            </div>
        </div>
    )
}