export async function fetchCoinGeckoData(url: string) {
    const apiKey = process.env.API_KEY || ''; // intentionally did it
    const response = await fetch(url, { 
        method: 'GET',
        headers: {
            accept: 'application/json',
            "x-cg-demo-api-key": "CG-LCeYynUJQjxDmuf3QM42BQmt",
        }
    });

    if (response.status === 429) {
        throw new Error('Too Many Requests');
    }
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log("made an api call");
    return data;
}