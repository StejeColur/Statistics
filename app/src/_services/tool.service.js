export const toolService = {
   getToolInfo,
};

const url = "http://localhost:4000";

function getToolInfo(startDate, endDate) {
    const requestOptions = {
        method: 'GET',
        mode: 'cors'
    };

    return fetch(`${url}/getMachineInfo?start=${startDate}&end=${endDate}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                /*logout();*/
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
