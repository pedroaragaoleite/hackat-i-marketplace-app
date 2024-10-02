import fetch from 'node-fetch';

export async function handler(event, context) {
    try {
        const response = await fetch('https://bored-api.appbrewery.com/random');
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error fetching random activity' }),
        };
    }
}