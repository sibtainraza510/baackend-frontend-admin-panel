import React from "react";
// import axios from "axios"
import { useAuth } from "../store/Auth";
import {  useNavigate } from "react-router-dom";
import { useState } from "react";
import {toast} from "react-toastify";

const Signin = () =>{
    const[email, setemail] = useState("");
    const[password, setpassword] = useState("");

    const {storeTokeninLS , APIR} = useAuth();
    const navigate = useNavigate();
 
    const handleformsubmit = async  (e) =>{
        e.preventDefault();
        console.log(email, password)
        setpassword("");
        setemail("");

        try{
            const response = await fetch(`${APIR}/api/auth/login` , {
                method : "POST", headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({email,password})
            });
            

            const res_data = await response.json();
            console.log("res from server", res_data.extraDetails);

            if(response.ok){
                // alert("login successful");
                toast.success("login successful")
                navigate("/");
                // const res_data = await response.json();
                // const res_data =  response.data;
                // console.log(res_data);
                storeTokeninLS( res_data.token)
                // localStorage.setItem("token" , res_data.token)  alternative using context API 
            }else{
                
                alert( res_data.extraDetails ? res_data.extraDetails : res_data.message);

            }
            console.log(response)
        }catch(err){
            console.log("login" , err)
        }
    }



    // return(
    //     <>
    //     <div className="mt-16 flex flex-row place-content-around ">
    //         <div>
    //             <img className="h-100 w-100"  src="/images/login.png"/>
    //         </div>

    //         <div>
    //             <h1 className="pb-8">Login Form</h1>
    //             <form className="flex flex-col gap-y-2" >
    //                 <label htmlFor="email">Email</label>
    //                 <input  className="border-2 rounded-sm border-black border-solid p-1" type="email" name="email" id="email" required value={email} onChange={(e)=>{setemail(e.target.value)}}/>

    //                 <label htmlFor="password">Password</label>
    //                 <input  className="border-2 rounded-sm border-black border-solid p-1" type="password" name="password" id="password" required value={password} onChange={(e)=>{setpassword( e.target.value)}}/>

    //                 <button className="mt-6  border-2 rounded-sm border-black border-solid p-1"  type="submit" onClick={handleformsubmit}>SUBMIT</button>

    //             </form>
    //         </div>
    //     </div>
    //     </>
    // )


    return(
        <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                            <img src="/images/login.png" width="500" height="500"/>
                        </div>

                        <div className="registration-form">
                            <h1 className="main-heading mb-3">Login form</h1>
                            <br></br>

                            <form  >
                                <div>
                                <label htmlFor="email">Email</label>
                                <input  className="border-2 rounded-sm border-black border-solid p-1" type="email" name="email" id="email" required value={email} onChange={(e)=>{setemail(e.target.value)}}/>
                                </div>
                            <div>
                            <label htmlFor="password">Password</label>
                            <input  className="border-2 rounded-sm border-black border-solid p-1" type="password" name="password" id="password" required value={password} onChange={(e)=>{setpassword( e.target.value)}}/>
                            </div>

                            <br></br>
                             <button className="btn btn-submit"  type="submit" onClick={handleformsubmit}>SUBMIT</button>

                             </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
        </>
    )
}
export default Signin;