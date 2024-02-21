import { Join } from './../Services/api/advert';
import { SignOut } from './../Services/api/auth';
import { SignIn } from "../Services/api/auth";


interface IHTTPMethods {
    SignIn: typeof SignIn,
    SignOut: typeof SignOut,
    Join: typeof Join,
}


export const HTTPMethods: IHTTPMethods = {
    SignIn,
    SignOut,
    Join,
}
