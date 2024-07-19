export async function fetchCoinGeckoData(url: string) {
    const response = await fetch(`${url}`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            "x-cg-demo-api-key": 'CG-LCeYynUJQjxDmuf3QM42BQmt'
        }
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log("made an api call");
    return data;
}