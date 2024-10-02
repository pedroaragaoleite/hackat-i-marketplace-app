const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    const type = event.queryStringParameters.type; // Obtener el tipo de la query string
    const url = `https://bored-api.appbrewery.com/filter?type=${type}`; // URL correcta

    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error fetching activities by type' }),
        };
    }
};