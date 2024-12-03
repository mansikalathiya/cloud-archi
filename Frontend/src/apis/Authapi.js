import { getApi, postApi } from "./index"; 

const BASE_URL = process.env.REACT_APP_BASE_URL;


export const getUser = async (email) => { 
    const url = `${BASE_URL}/login/getUser?email=${email}`;
    return getApi(url);
};


export const postUser = async (data) => {
    console.log(data);
    const url = `${BASE_URL}/signup/postUser`;
    return postApi(url, data);
};




