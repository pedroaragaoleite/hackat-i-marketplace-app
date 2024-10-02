import fetch from 'node-fetch';

export async function handler(event, context) {
    try {
        const response = await fetch('https://bored-api.appbrewery.com/random');
        console.log('llamada a la api');
        // Verifica si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('Error in fetching random activity:', error); // Log para ver en Netlify
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error fetching random activity' }),
        };
    }
}