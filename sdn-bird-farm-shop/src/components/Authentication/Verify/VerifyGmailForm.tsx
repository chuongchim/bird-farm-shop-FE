import React, { useState } from "react";
import ApiService from "../ApiAuthService";
import { basePonitUrl } from "../../../api/ApiConfig";
import CircularIndeterminate from "../../Common/Loading/Loading";

export default function VerifyGmailForm() {
    const baseUrl = basePonitUrl.auth;
    const apiService = new ApiService();

    const storedUserRegister = localStorage.getItem("userRegister");
    const userRegister = storedUserRegister ? JSON.parse(storedUserRegister) : null;
    const [verificationCode, setVerificationCode] = useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    /**
           * handleVerify
           * @param event 
           */
    const handleVerify = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const requestData = {
            email: userRegister.email,
            code: verificationCode,
        };
        console.log(requestData)
        

        const obj = apiService.postData(baseUrl + '/verifyCode', requestData);
        obj.then((res) => {
            setIsLoading(true);
            setTimeout(() => {
             
                    console.log(res);
                    setIsLoading(false);
                    window.location.href = '/auth/login'
                
            }, 2000)
        });
    };


    return (
        <div>
            {isLoading && (<CircularIndeterminate></CircularIndeterminate>)}
            <form onSubmit={handleVerify}>
                <span>A verify code was sent to '{userRegister.email}' . Please check and enter that code in the field</span>
                <input
                    type="text"
                    placeholder="Enter the verification code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                />
                <button type="submit">Verify</button>
            </form>
        </div>
    );
}