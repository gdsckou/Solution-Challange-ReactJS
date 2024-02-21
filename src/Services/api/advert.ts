import axios from "axios";
import { PostMethod } from "../../Types/api";


export const Join: PostMethod = async (endpoint: string, body: any, header: any) => {

    return await axios.post(
        endpoint, 
        body, 
        { 
            headers: 
            {...header}
        }
    );
};
