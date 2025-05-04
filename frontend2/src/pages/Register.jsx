import React from "react";
import {useNavigate} from "react-router-dom"
import { useAuth } from "../store/Auth";
import { useState } from "react";
import {toast} from "react-toastify";
const Register = () =>{
    const[input, setinput] = useState({
        fullname : "", username: "", password: "", phone: "",email: ""
    })

    const handleclick =  (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        setinput({...input, [name]: value})
    }

    const navigate = useNavigate();
    const {storeTokeninLS} = useAuth()

    const handleformsubmit = async (e) =>{
        e.preventDefault();
        setinput({
            fullname:"",  username: "", password: "", phone: "",email: ""
        })
        try{
            const response = await fetch("http://localhost:8000/api/auth/register" , {
                method : "POST", headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(input)
            });

            const res_data = await response.json();
            console.log("res from server", res_data.extraDetails);

            if(response.ok){
                // alert("register successful");
                toast.success("registration successful")
                navigate("/")
                // const res_data = await response.json();
                // console.log(res_data);
                storeTokeninLS( res_data.token)
                // localStorage.setItem("token" , res_data.token)  alternative using context API 
            }else{
            //    alert( res_data.extraDetails ? res_data.extraDetails : res_data.message);
            toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
            console.log(response)
           

        }catch(err){
            console.log("register", err)

        }

    }



    // return(
    //     <>
    //     <div className=" mt-16 flex flex-row place-content-around ">

    //         <div className=""><img className="h-100 w-100" src="/images/register.png" alt=""  /></div>
    //         <div>
    //             <h1 className="pb-8">Registration Form</h1>
    //             <form className="flex flex-col gap-y-2" onSubmit={handleformsubmit}>
    //                 <label htmlFor="fullname">Fullname</label>
    //                 <input className="border-2 rounded-sm border-black border-solid p-1" type="text" name="fullname" id="fullname" required value={input.fullname} onChange={handleclick}/>

    //                 <label htmlFor="username">Username</label>
    //                 <input  className="border-2 rounded-sm border-black border-solid p-1" type="text" name="username" id="username" required value={input.username} onChange={handleclick}/>

    //                 <label htmlFor="password">Password</label>
    //                 <input  className="border-2 rounded-sm border-black border-solid p-1" type="password" name="password" id="password" required value={input.password} onChange={handleclick}/>

    //                 <label htmlFor="phone">Phone</label>
    //                 <input  className="border-2 rounded-sm border-black border-solid p-1" type="number" name="phone" id="phone" required value={input.phone} onChange={handleclick}/>

    //                 <label htmlFor="email">Email</label>
    //                 <input  className="border-2 rounded-sm border-black border-solid p-1" type="email" name="email" id="email" required value={input.email} onChange={handleclick}/>

    //                 <button className="mt-6  border-2 rounded-sm border-black border-solid p-1"  type="submit" onClick={handleformsubmit}>SUBMIT</button>
    //             </form>

    //         </div>
    //     </div>
    //     </>
    // )



    return (
        <>
          <section>
            <main>
              <div className="section-registration">
                <div className="container grid grid-two-cols">
                  <div className="registration-image">
                    <img
                      src="/images/register.png"
                      alt="a girl is trying to do registration"
                      width="500"
                      height="500"
                    />
                  </div>
    
                  {/* let tackle registration form  */}
                  <div className="registration-form">
                    <h1 className="main-heading mb-3">Registration form</h1>
                    <br />
    
                    <form onSubmit={handleformsubmit}>
                        <div>
                    <label htmlFor="fullname">Fullname</label>
                     <input  type="text" name="fullname" id="fullname" required value={input.fullname} onChange={handleclick}/>
                        </div>

                        <div>
                     <label htmlFor="username">Username</label>
                    <input  className="border-2 rounded-sm border-black border-solid p-1" type="text" name="username" id="username" required value={input.username} onChange={handleclick}/>
                    </div>

                    <div>
                    <label htmlFor="password">Password</label>
                    <input  className="border-2 rounded-sm border-black border-solid p-1" type="password" name="password" id="password" required value={input.password} onChange={handleclick}/>
                    </div>

                    <div>
                     <label htmlFor="phone">Phone</label>
                    <input  className="border-2 rounded-sm border-black border-solid p-1" type="number" name="phone" id="phone" required value={input.phone} onChange={handleclick}/>
                    </div>

                    <div>
                     <label htmlFor="email">Email</label>
                     <input  className="border-2 rounded-sm border-black border-solid p-1" type="email" name="email" id="email" required value={input.email} onChange={handleclick}/>
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
      );
}
export default Register;