import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../slices/userSlice';

// idhar login ki game chal rhi hai, deets pakki honi chahiyen
export default function Login() 
{
  const [eml, setEml] = React.useState('');
    const [pwd, setPwd] = React.useState('');
  const dsp = useDispatch();
  const nav = useNavigate();
    const cUsr = useSelector(s => s.usr.currUsr);
  const error = useSelector(s => s.usr.error);

  const subLog = async (e) => 
    {
    e.preventDefault();

    if(!/\S+@\S+\.\S+/.test(eml)) return alert("Bhai proper email to likho ajeeb");
      if(pwd.length < 5) return alert("Password too chota, min 5 chars allowed.");

      const payload = { email: eml, password: pwd };
      const resultAction = await dsp(loginUser(payload));
      if (loginUser.fulfilled.match(resultAction)) {
        nav('/dashboard');
      } else {
        alert(resultAction.payload || error || 'Login failed.');
      }
  }

  React.useEffect(() => 
    {
      if(cUsr) nav('/dashboard');
  }, [cUsr, nav]);

  return (
    <div className="mainCont boxCrd">
      <div className="bigText">Login</div>
        <form onSubmit={subLog}>
        <input placeholder="Email" value={eml} onChange={e=>setEml(e.target.value)} />
          <input type="password" placeholder="Password" value={pwd} onChange={e=>setPwd(e.target.value)} />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}