import { useAuthStore } from '@/stores';

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method) {
    return (url, body) => {
        const formData = new FormData();
        formData.append('username', 'yannickkonrad@googlemail.com');
        formData.append('password', 'test123');
        console.log(formData)
        const payload = new URLSearchParams(formData);

        const requestOptions = {
            method,
            // headers: authHeader(url)
            body : payload
        };
        if (body) {
            // requestOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            requestOptions.headers = {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
            // requestOptions.body = JSON.stringify(body);
            // requestOptions.body = formData
        }
        console.log("requestOptions")
        console.log(requestOptions)
        return fetch(url, requestOptions).then(handleResponse);
    }
}

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const { user } = useAuthStore();
    const isLoggedIn = !!user?.token;
    const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

async function handleResponse(response) {
    console.log(response)
    const isJson = response.headers?.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    // check for error response
    if (!response.ok) {
        const { user, logout } = useAuthStore();
        if ([401, 403].includes(response.status) && user) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            logout();
        }

        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
    }
    console.log(data)
    return data;
}