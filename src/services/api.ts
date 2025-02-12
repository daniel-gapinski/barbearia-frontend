import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";
import { signOut } from "@/contexts/AuthContext";

export function setupAPIClient(ctx = undefined) {
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            Authorization: `Bearer ${cookies["@barber.token"]}`,
        }
    });

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if(typeof window !== undefined) {
            if(typeof window !== undefined) {
                //Deslogar o usuário
                signOut();

            }else{
                return (
                    Promise.reject(new AuthTokenError())
                )
            }
        }

        return Promise.reject(error);
    });

    return api;
}