import React from 'react';
import charity from '../../public/assets/images/charity.jpg';
import '../../public/assets/css/auth/login.css';
import PageLayout from '../../layouts/pageLayout';

const Login=()=>{
    return (
        <PageLayout
        pageTitle="connexion"
        >
            <div className='d-flex justify-content-center align-items-center flex-column  login-body'>
            <div className="login-container position-relative">
        <div className="card w-100 m-0 p-0 blue-violet">
            <div className="card-header d-flex flex-column justify-content-center align-items-center text-white blue-violet">
               <div className="logo-container">
                <img
                src={charity}
                alt="logo"
                className="img-fluid"
                />
               </div>
                <span className="text-center fs-2">
                    Connexion
                </span>
               
            </div>
           
            
            <div className="card-body blue-violet">
               <div className="social-medias">
                <div className="google">
                    <span className="bi bi-google"></span>
                </div>
                <div className="twitter">
                    <span className="bi bi-twitter"></span>
                </div>

               </div>
               <div className="line-container">
                <div className="line-h"></div>
                <span className="text-white">OU</span>
                <div className="line-h"></div>
            </div>
               <div className="form-container">
                <form action="" method="post">
                    <div className="mb-4">
                        <input className="inputer" type="email" placeholder="username or email"/>
                    </div>
                    <div className="mb-4">
                        <input className="inputer" type="password" placeholder="username or email"/>
                    </div>
                    
                    <div className="mb-0">
                        <button className=" btn-log" type="submit">Se connecter</button>
                    </div>
                    
                </form>
               </div>
            </div>
        </div>
        <div className="position-absolue w-100 login-waves">
            <svg xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 320"><path fill="#f8a708" 
            fill-opacity="1" d="M0,32L48,69.3C96,107,192,181,288,192C384,203,480,149,576,122.7C672,96,768,96,864,117.3C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">

            </path></svg>
        </div>
    </div>
            </div>
       
    </PageLayout>
          

    )

}
export default Login;