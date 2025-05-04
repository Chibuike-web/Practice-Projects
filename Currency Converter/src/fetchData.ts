async function fetchData() {
	const apiKey = import.meta.env.VITE_APIKEY;
	try {
		const res = await fetch(`https://api.currencyapi.com/v3/latest?apikey=${apiKey}`);

		if (!res.ok) {
			throw new Error("Issue fetching the exchange rates");
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error("Issue fetching data", error);
	}
}

export default fetchData;
