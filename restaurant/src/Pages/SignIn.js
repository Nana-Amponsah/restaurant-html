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

      fetch('https://tasty-budz-t3xi.onrender.com/login', {
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
               <br/>
               <br/>
               <div class="container">
                     <div class="top-header">
                        <header>
                           Login
                        </header>
                     </div>
                     <br/>
                     <div style={{marginLeft: '50px'}}>
                        <div class="input-field">
                           <input type="text" class='input' placeholder="Username" name='username' required/>
                           <i class="bx bx-user"></i>
                        </div>
                        <br/>
                        <div class="input-field">
                           <input type="password" class='input' placeholder="Password" name='password' required/>
                           <i class="bx bx-lock-alt"></i>
                        </div>
                     </div>
                     <br/>
                     <button type='submit' className='submit'>Login</button>
               </div>
            </form>

         </div>
      </body>
   </div>
  );
}
