import fetchData from "./fetchData";
import "./components/select";

const submitBtn = document.getElementById("submit-btn");
const amount = document.getElementById("amount");
const output = document.getElementById("output");
const loading = document.getElementById("loading");

submitBtn?.addEventListener("click", (e) => {
	e.preventDefault();

	const currentSelect = document.querySelector("#current-currency") as HTMLSelectElement;
	const targetSelect = document.querySelector("#target-currency") as HTMLSelectElement;

	const currentValue = currentSelect.value;
	const targetValue = targetSelect.value;

	if (output?.classList.contains("hidden")) {
		if (loading) {
			loading.classList.remove("hidden");
		}
	}

	fetchData()
		.then((data) => calculateExchange(data, currentValue, targetValue))
		.catch((err) => {
			console.error("Fetch error:", err);
			if (loading) loading.innerHTML = `Failed to fetch data.`;
		});
});

function calculateExchange(data: any, currentOption: string, targetOption: string) {
	const rateOne = data.data[currentOption]?.value;
	const rateTwo = data.data[targetOption]?.value;

	if (rateOne && rateTwo) {
		const exchangeRate = rateTwo / rateOne;
		const amountToConvert = (amount as HTMLInputElement)?.value;
		const convertedAmount = Number(amountToConvert) * exchangeRate;
		const formatter = new Intl.NumberFormat("en-US", {
			style: "decimal",
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});

		const formattedInput = formatter.format(Number(amountToConvert));
		const formattedOutput = formatter.format(convertedAmount);

		if (output) {
			loading?.classList.add("hidden");
			output.classList.remove("hidden");
			output.classList.add("flex");
			output.innerHTML = `
			<p class="font-medium tracking-[-0.02em]">Conversion Result</p>
			<h2 class="w-full p-4 bg-black/5 rounded-[8px] font-semibold text-[24px]">
				${formattedInput} ${currentOption} = ${formattedOutput} ${targetOption}
			</h2>
		`;
		}
	} else {
		console.error("One or both currency codes are invalid or missing.");
	}
}
