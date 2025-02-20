export const exerciseOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
};

export const fetchData = async (URL, options) => {
    console.log('API Key being used:', options.headers['X-RapidAPI-Key']); // Para verificar la key
    const response = await fetch(URL, options);
    const data = await response.json();
    return data;
}