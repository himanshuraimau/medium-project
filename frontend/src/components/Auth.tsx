
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@eng_himanshu/medium";
import axios from "axios";
import { BACKEND_URL } from "../config"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setpostInputs] = useState < SignupInput > ({
        name: "",
        username: "",
        password: ""
    });

    async function sendRequest() {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,postInputs);
            const jwt = response.data;
            console.log(jwt)
            localStorage.setItem("token", jwt.jwt);
            navigate("/blogs");
        } catch (e) {
            alert("Not signed")
        }
    }



    return <div className="h-screen flex justify-center flex-col">

        <div className="flex justify-center">
            <div className="px-10">
                <div>
                    <div className="text-4xl font-extrabold">
                        Create an account
                    </div>
                    <div className="text-slate-400 pl-7">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </div>
                </div>
                <div className="pt-5">
                    {type === "signup" ? <LabelledInput label="Name" placeholder="Himanshu Rai" onChange={(e) => {
                        setpostInputs({
                            ...postInputs,
                            name: e.target.value,
                        })
                    }} /> : null}
                    <LabelledInput label="Username" placeholder="himanshu" onChange={(e) => {
                        setpostInputs({
                            ...postInputs,
                            username: e.target.value,
                        })
                    }} />
                    <LabelledInput label="Password" type={"password"} placeholder="123456" onChange={(e) => {
                        setpostInputs({
                            ...postInputs,
                            password: e.target.value,
                        })
                    }} />
                </div>
                <div className="flex justify-center pt-5 ">
                    <button onClick={sendRequest} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                  focus:ring-gray-300 font-medium rounded-lg text-normal px-5 py-2.5 me-2 mb-2">
                        {type === "signup" ? "Sign up" : "Sign in"}
                    </button>
                </div>
            </div>
        </div>

    </div>
}

interface LabelledInput {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    type?: string;
}


function LabelledInput({ label, placeholder, onChange, type }: LabelledInput) {
    return <div>
        <div>
            <label className="block mb-2 text-lg font-normal text-black pt-2">{label}</label>
            <input onChange={onChange} type={type || "text"} id=" first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 
            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
            block w-full p-2.5" placeholder={placeholder} required />
        </div>
    </div>
}