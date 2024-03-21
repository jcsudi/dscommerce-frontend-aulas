import QueryString from "qs";
import { CredentialsDTO } from "../components/models/auth";
import { CLIENT_ID, CLIENT_SECRET } from "../utils/system";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/request";
import * as accessTokenRepository from '../localstorage/acess-token-repository'; 

export function loginRequest(loginData: CredentialsDTO) {

    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET)

    }

    const requestBody = QueryString.stringify( {...loginData, grant_type: "password"})

    const config: AxiosRequestConfig = {
        method: "Post",
        url: "/oauth/token",
        data: requestBody,
        headers: headers
    }

    return requestBackend(config);  
}

export function logut() {
    accessTokenRepository.remove()

}

export function saveAcessToken(token: string) {
    accessTokenRepository.save(token);

}

export function getAccessToken(){
    accessTokenRepository.get();
}