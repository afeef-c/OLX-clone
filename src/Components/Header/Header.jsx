import React, {useContext} from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import {AuthContext} from '../../store/Context';
import { logout, signup } from '../../firebase/Config';
import {useNavigate} from 'react-router-dom';


function Header() {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>
        <div className="loginPage">
          <span>{user ? `${user.displayName}` : <span onClick={() => navigate('/signup')}>Login</span>}</span>
          <hr />
        </div>
        {user&&<span className='logout' onClick={logout} style={{cursor:'pointer'}}>Logout</span>}

        <div className="sellMenu">
          <SellButton />
          <div className="sellMenuContent" onClick={()=>{
            navigate('/create')
          }}>
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
