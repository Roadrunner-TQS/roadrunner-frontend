const BASE_URL = 'http://localhost:8080/api';

export const URLS = {
    pickUp: `${BASE_URL}/pickup`,
    pickUpDetails: (id:string)=> `${BASE_URL}/pickup/${id}`,
    shop: `${BASE_URL}/shop`,
    shopDetails: (id:string)=> `${BASE_URL}/shop/${id}`,
    packages: `${BASE_URL}/package`,
    packageDetails: (id:string)=> `${BASE_URL}/package/${id}`,
    login: `${BASE_URL}/auth/login`,
    register: `${BASE_URL}/auth/signup`,
    me: `${BASE_URL}/auth/me`,
    editPackage: (id:string)=> `${BASE_URL}/shop/package/${id}`,
}