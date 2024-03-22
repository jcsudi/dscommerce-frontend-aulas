import QueryString from "qs";
import { AccessTokenPayloadDTO, CredentialsDTO, RoleEnum } from "../components/models/auth";
import { CLIENT_ID, CLIENT_SECRET } from "../utils/system";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/request";
import * as accessTokenRepository from '../localstorage/acess-token-repository'; 
import jwtDecode from "jwt-decode";

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
    return accessTokenRepository.get();
}

export function getAccessTokenPayload(): AccessTokenPayloadDTO | undefined {
    try {
    const token = accessTokenRepository.get();
    return token == null ? undefined : (jwtDecode(token) as AccessTokenPayloadDTO);
    } catch (error) {
    return undefined;
    }
    }

    export function isAuthenticated(): boolean {
        const tokenPayload = getAccessTokenPayload();
        if(tokenPayload && tokenPayload.exp * 1000 > Date.now()){
            return true;
        }
        return false;
       
        }

        export function hasAnyRoles(roles: RoleEnum[]): boolean {
            if (roles.length === 0) {
            return true;
            }
            const tokenPayload = getAccessTokenPayload();
            if (tokenPayload !== undefined) {
            for (let i = 0; i < roles.length; i++) {
            if (tokenPayload.authorities.includes(roles[i])) {
            return true;
            }
            }
            //return roles.some(role => tokenData.authorities.includes(role));
            }
            return false;
            }