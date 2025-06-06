import { useEffect, useState } from "react";

interface CoinLayerResponse {
	success: boolean;
	target: string;
	rates: Record<string, number>;
}

export default function Tracker() {
	const [data, setData] = useState<CoinLayerResponse | null>(null);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(
					"https://api.coinlayer.com/live?access_key=f41421a313025c5001b7583103f25114"
				);
				if (!res.ok) throw new Error("Issue fetching data");
				const data = await res.json();
				console.log(data);
				setData(data);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	return (
		<div>
			{data?.rates ? (
				<ul>
					{Object.entries(data.rates)
						.slice(0, 5)
						.map(([currency, rate]) => (
							<li key={currency}>
								{currency}: {rate}
							</li>
						))}
				</ul>
			) : (
				<p> no data available</p>
			)}
		</div>
	);
}
