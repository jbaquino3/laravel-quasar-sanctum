import { api } from 'boot/axios'

export const _get = async (url, params = {}) => {
    var error = null;

    const response = await api.get(url, {params: params}).catch(err => {
        error = err;
    });

    return error ? handleError(error) : {
        status: true,
        data: response.data
    };
}

export const _post = async (url, data, params = {}) => {
    var error = null;

    await api.get('/sanctum/csrf-cookie');
    const response = await api.post(url, data, {params: params}).catch(err => {
        error = err;
    });

    return error ? handleError(error) : {
        status: true,
        data: response.data
    };
}

export const _put = async (url, data, params = {}) => {
    var error = null;

    await api.get('/sanctum/csrf-cookie');
    const response = await api.put(url, data, {params: params}).catch(err => {
        error = err;
    });

    return error ? handleError(error) : {
        status: true,
        data: response.data
    };
}

export const _delete = async (url, params = {}) => {
    var error = null;

    await api.get('/sanctum/csrf-cookie');
    const response = await api.delete(url, {params: params}).catch(err => {
        error = err;
    });

    return error ? handleError(error) : {
        status: true,
        data: response.data
    };
}

function handleError(err) {
    if(err.response.data ) {
        if(typeof err.response.data === 'object') {
            return {
                status: false,
                data: err.response.data.message
            };
        } else {
            return {
                status: false,
                data: err.response.data
            };
        }
    } else {
        return {
            status: false,
            data: err.message
        };
    }
}