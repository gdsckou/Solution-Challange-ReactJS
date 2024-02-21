import axios from "axios";
import { PostMethod } from "../../Types/api";


export const SignIn: PostMethod = async (endpoint: string, body: object, header: object) => {
    return await axios.post(endpoint, body, header);
}


export const SignOut: PostMethod = async (endpoint: string, body: object, header: object) => {
    return await axios.post(endpoint, body, header);
}