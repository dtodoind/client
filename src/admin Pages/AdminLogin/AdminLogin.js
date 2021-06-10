import React from 'react';
import './AdminLogin.scss'
function AdminLogin(){
    return(
        <div className='admin'>
       <div className='title-admin'>
         <p>Admin Login</p> 

        <div className='inputs-admin'>
        <input type="text" placeholder="Email" className="form-control" name="nombre"></input>
        <input type="password" placeholder="Password" className="form-control" name="password"></input>
        </div> 
        <div className='button-admin'>
            <button>Login</button>
        </div>
       </div>
        </div>
    )
}
export default AdminLogin