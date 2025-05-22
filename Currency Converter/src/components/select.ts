type CurrencyOption = {
	value: string;
	label: string;
};

const currencyOptions: CurrencyOption[] = [
	{ value: "", label: "Select your current currency" },
	{ value: "AED", label: "AED - UAE Dirham" },
	{ value: "AUD", label: "AUD - Australian Dollar" },
	{ value: "BRL", label: "BRL - Brazilian Real" },
	{ value: "CAD", label: "CAD - Canadian Dollar" },
	{ value: "CHF", label: "CHF - Swiss Franc" },
	{ value: "CLP", label: "CLP - Chilean Peso" },
	{ value: "CNY", label: "CNY - Chinese Yuan" },
	{ value: "COP", label: "COP - Colombian Peso" },
	{ value: "CZK", label: "CZK - Czech Koruna" },
	{ value: "DKK", label: "DKK - Danish Krone" },
	{ value: "EGP", label: "EGP - Egyptian Pound" },
	{ value: "EUR", label: "EUR - Euro" },
	{ value: "GBP", label: "GBP - British Pound" },
	{ value: "HKD", label: "HKD - Hong Kong Dollar" },
	{ value: "HUF", label: "HUF - Hungarian Forint" },
	{ value: "IDR", label: "IDR - Indonesian Rupiah" },
	{ value: "ILS", label: "ILS - Israeli Shekel" },
	{ value: "INR", label: "INR - Indian Rupee" },
	{ value: "JPY", label: "JPY - Japanese Yen" },
	{ value: "KRW", label: "KRW - South Korean Won" },
	{ value: "MXN", label: "MXN - Mexican Peso" },
	{ value: "MYR", label: "MYR - Malaysian Ringgit" },
	{ value: "NGN", label: "NGN - Nigerian Naira" },
	{ value: "NOK", label: "NOK - Norwegian Krone" },
	{ value: "NZD", label: "NZD - New Zealand Dollar" },
	{ value: "PHP", label: "PHP - Philippine Peso" },
	{ value: "PKR", label: "PKR - Pakistani Rupee" },
	{ value: "PLN", label: "PLN - Polish Zloty" },
	{ value: "RUB", label: "RUB - Russian Ruble" },
	{ value: "SAR", label: "SAR - Saudi Riyal" },
	{ value: "SEK", label: "SEK - Swedish Krona" },
	{ value: "SGD", label: "SGD - Singapore Dollar" },
	{ value: "THB", label: "THB - Thai Baht" },
	{ value: "TRY", label: "TRY - Turkish Lira" },
	{ value: "TWD", label: "TWD - New Taiwan Dollar" },
	{ value: "USD", label: "USD - United States Dollar" },
	{ value: "VND", label: "VND - Vietnamese Dong" },
	{ value: "ZAR", label: "ZAR - South African Rand" },
];

const root = document.getElementById("app");

const dropDownContainer = document.createElement("div");
dropDownContainer.id = "dropdown-container";
dropDownContainer.className =
	"absolute bottom-[1rem] w-full bg-white h-[360px] overflow-y-auto rounded-[1rem] border border-[#e6e6e6] p-[12px]";

function createDropDown() {
	currencyOptions.forEach(({ value, label }, index) => {
		const dropDownMenu = document.createElement("div");
		dropDownMenu.id = `menu${index + 1}`;
		dropDownMenu.textContent = label;
		dropDownMenu.className = "hover:bg-[#f2f2f2] p-[12px] w-full rounded-[8px]";
		dropDownContainer.appendChild(dropDownMenu);
	});
}

function createSelectBtn() {
	const selectContainer = document.createElement("div");
	selectContainer.className =
		"relative w-full max-w-[500px] mt-8 justify-items-center content-center";
	selectContainer.id = "select-container";

	selectContainer.innerHTML = `
		<button id="selectBtn" class="bg-green-500 w-full block py-4 px-4">
			Select your current currency
		</button>
	`;

	const selectBtn = selectContainer.querySelector("#selectBtn");
	let isDropDownInitialized = false;
	selectBtn?.addEventListener("click", (e) => {
		e.preventDefault();
		const alreadyAppended = selectContainer.contains(dropDownContainer);
		if (alreadyAppended) {
			dropDownContainer.remove();
		} else {
			if (!isDropDownInitialized) {
				createDropDown();
				isDropDownInitialized = true;
			}
			selectContainer.appendChild(dropDownContainer);
		}
	});

	return selectContainer;
}

if (root) {
	root.appendChild(createSelectBtn());
}
