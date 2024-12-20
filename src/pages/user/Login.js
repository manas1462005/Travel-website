import React ,{useState} from 'react'
import { jwtDecode } from 'jwt-decode'
import { ToastContainer, toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
import img from '../../asset/login.jpg'
import '../../App.css'
import 'react-toastify/dist/ReactToastify.css'

const YOUR_PERSONAL_TOKEN = 'malikaleemraza'
const SignUpValue = {
    name: '',
    email: '',
    phote: null,
    password : '',
    passwordConform:'',
  }
const LoginValue = {
    email:'',
    password: ''
}  
const Login = () => {

  const navgate = useNavigate()  
  const [acount ,ToggleAccout] = useState('login')
  const [signup , Setsignup] = useState(SignUpValue)
  const [userLogin, SetuserLogin] = useState(LoginValue)
  const [error , SetError] = useState('')

  const SiginUp = ()=>{
   acount === 'signup' ? ToggleAccout("login") : ToggleAccout("signup")
  }

  const showSuccessMessage = () => {
    toast.success("Signup successful!",{
        position: "bottom-left",
      });
};
  
  const InputSignUp = (e)=>{
    Setsignup({...signup ,[e.target.name]:e.target.value})
  }
  const handleImageChange = (e) => {
    Setsignup({
      ...signup,
      phote: e.target.files[0] // Store the selected image file
    });
  };
  const InputLogin = (e)=>{
    SetuserLogin({...userLogin, [e.target.name]: e.target.value})
  }

  const SignUpform = async(e)=>{
    e.preventDefault()
    console.log(signup)
    const {name,email, phote,password,passwordConform} = signup;
    const formData = new FormData();
    // Append form fields to FormData object
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phote', phote);
    formData.append('password', password);
    formData.append('passwordConform', passwordConform);
    //console.log(formData.name)
    const res = await fetch('http://127.0.0.1:8080/api/vi/users/signup', {
        method:"POST",
        headers:{
            'Authorization': `Bearer ${YOUR_PERSONAL_TOKEN}`
        },
        body:formData 
        //JSON.stringify({
            //name:name,
            //email:email,
            //role:role,
            // password:password,
            // passwordConform:passwordConform,
          //  formData
        //})    
    })
    try{
        const  res_data  = await res.json()
        if(res.ok){
            const { token } = res_data;
            console.log('Received token:', token);
            // Save the token in localStorage
            localStorage.setItem('token', token);
            showSuccessMessage()
            setTimeout(() => {
                ToggleAccout('login')
              }, 2000);
        }else{
            console.error('Signup failed:', res_data.error);
            toast.error("Signup failed: " + res_data.error);
        }

    }catch(err){
        console.error('Error:', err);
        toast.error("Error: " + err.message);
    }
  }

  const LoginForm = async (e)=>{
    e.preventDefault()
    const {email, password} = userLogin;
    console.log(email)
    const res = await fetch('http://127.0.0.1:8080/api/vi/users/login',{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            'Authorization': `${YOUR_PERSONAL_TOKEN}`
        },
        body: JSON.stringify({
            email:email,
            password:password,
        })
    })
    try{
        const res_login = await res.json()
        console.log('Response data:', res_login);
        if(res.ok){
            const { token } = res_login;
            console.log('Received token:', token);
            localStorage.setItem('token', token);
            const decode = jwtDecode(token)
            const userRole = decode.role;
            toast.success("login successfully !",{
                position:"top-right"
            })
            setTimeout(()=>{
            if (userRole === 'admin') {
                navgate('/dashboard'); 
            } else {
                navgate("/"); 
            }
            },1000)
        }else{
            console.error('Login  failed:', res_login.error);
            toast.error("Login failed: " + res_login.error,{
                position:"top-right"
            });
        }
    }catch(error){
        console.error('Error:', error);
        toast.error("Error: " + error.message,{
            position:"top-right"
        });

    }
  }
  return (
   <>
<div>
     {
      acount === 'login' ?
<section className="bg-gray-50 dark:bg-gray-900"  style={{backgroundImage: `url(${img})`,backgroundRepeat:"no-repeat",
  backgroundAttachment: "fixed",
  backgroundPosition: "center"}}>
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full backdrop-blur-sm hover:backdrop-blur-lg bg-white/30  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" onChange={(e)=>  InputLogin(e) } name="email" id="email" className=" backdrop-blur-sm bg-white/30  border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" onChange={(e)=> InputLogin(e)} name="password" id="password" placeholder="••••••••" className="backdrop-blur-sm bg-white/30 bg-grborder border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <button type="submit" onClick={LoginForm}   className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">  Login </button>
                  <button onClick={()=> SiginUp()} type="submit" className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
              </form>
          </div>
      </div>
  </div>
</section> 
     :
<section className="bg-gray-50 dark:bg-gray-900"  style={{backgroundImage: `url(${img})`,backgroundRepeat:"no-repeat",
  backgroundAttachment: "fixed",
  backgroundPosition: "center"}}>
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      
      <div className="w-full  backdrop-blur-sm hover:backdrop-blur-lg bg-white/30 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create and account
              </h1>
              <form className="space-y-4 md:space-y-6" enctype="multipart/form-data" method="post" action="/uploads" >
                  <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                      <input type="text" onChange={(e)=> InputSignUp(e)}  name="name" id="name" className="backdrop-blur-sm hover:backdrop-blur-lg bg-white/30 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" required="" />
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" onChange={(e)=> InputSignUp(e)}  name="email" id="email" className="backdrop-blur-sm hover:backdrop-blur-lg bg-white/30 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                  </div>
                  <div>
                      <label htmlFor="phote" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile</label>
                      <input type="file" onChange={(e)=> handleImageChange(e)}  name="phote" id="phote" className="backdrop-blur-sm hover:backdrop-blur-lg bg-white/30 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="file upload" />
                  </div>
            
                  {/* <div>
                  <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                  <select id="role" onChange={(e)=> InputSignUp(e)}  name='role' className="backdrop-blur-sm hover:backdrop-blur-lg bg-white/30 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option>user</option>
                  <option>guide</option>
                  <option>lead-guide</option>
                   <option>admin</option>
                    </select>                  
                  </div> */}
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" onChange={(e)=> InputSignUp(e)}  name="password" id="password" placeholder="••••••••" className="backdrop-blur-sm hover:backdrop-blur-lg bg-white/30 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <div>
                      <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="password" onChange={(e)=> InputSignUp(e)}  name="passwordConform" id="confirm-password" placeholder="••••••••" className="backdrop-blur-sm hover:backdrop-blur-lg bg-white/30 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                
                  <button type="submit" onClick={SignUpform} className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <button type="submit" onClick={()=> SiginUp()}  className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Already have an account</button>
              </form>
              
          </div>
      </div>
  </div>
</section>
   }  
   <ToastContainer />
  </div> 
   </>
  )
}

export default Login
