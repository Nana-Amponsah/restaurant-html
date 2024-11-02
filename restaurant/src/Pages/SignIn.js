import React from 'react';
import './signin.css'
import { useNavigate } from 'react-router-dom';


export default function SignIn() {
   const navigate = useNavigate();

   const handleSubmit = (event) => {
      event.preventDefault();

      const form = event.target;

      const formData = {
         username: event.target.username.value,
         password: event.target.password.value
      };

      fetch('http://localhost:5000/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(formData)
      })
      .then(respone => {
         if (!respone.ok) {
            throw new Error('User Log-In Failed!');
         }
         return respone.json();
      })
      .then(data => {
         if (data.success) {
            navigate('/inventory', {replace: true});
         } else {
            alert(`Log-In failed Alert: ${data.message}`);
            form.reset()
         }
      })
      .catch((error) => {
         alert(`Log-In failed - Catch: ${error.message}`);
         form.reset();
      })

   }   


  return (
   <div>

      <body>
         <div class="box">

            <form name='login-form' onSubmit={handleSubmit}> 
               <div class="container">
                     <div class="top-header">
                        <span>Have an account?</span>
                        <header>
                           Login
                        </header>
                     </div>
                     <div class="input-field">
                        <input type="text" class='input' placeholder="Username" name='username' required/>
                        <i class="bx bx-user"></i>
                     </div>
                     <div class="input-field">
                        <input type="password" class='input' placeholder="Password" name='password' required/>
                        <i class="bx bx-lock-alt"></i>
                     </div>
                     <button type='submit' className='submit'>Login</button>

                     <div class="bottom">
                        <div class="left">
                           <input type="checkbox" id="check"/>
                           <label for="check">Remember Me</label>
                        </div>
                        <div class="right">
                        <label style={{color:'blue', cursor:'pointer'}}>Forgot Password?</label>
                        </div>
                     </div>
               </div>
            </form>

         </div>
      </body>
   </div>
  );
}
