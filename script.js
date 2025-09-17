const from = document.getElementById("from");
const to = document.getElementById("to");
const result = document.getElementById("result");
const amountInput = document.getElementById("amount");
const convertBtn = document.getElementById("convertBtn");
const apiKey = "0274dab789554349dc057b93";


async function fetchCurrencies() {
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const currencies = data.supported_codes;
    currencies.forEach(([code, name]) => {
      const option1 = new Option(`${code} - ${name}`, code);
      const option2 = new Option(`${code} - ${name}`, code);
      from.appendChild(option1);
      to.appendChild(option2);
    });
    from.value = "USD";
    to.value = "INR";
  } catch (error) {
    console.error("Error fetching currency codes:", error);
    result.textContent = "Error fetching currency list.";
  }
}


async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const fromCurrency = from.value;
  const toCurrency = to.value;

  if (isNaN(amount) || amount <= 0) {
    result.textContent = "Please enter a valid amount.";
    return;
  }

  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const rate = data.conversion_rate;
    const converted = (amount * rate).toFixed(2);
    result.textContent = `${amount} ${fromCurrency} = ${converted} ${toCurrency}`;
  } catch (error) {
    console.error("Error fetching conversion rate:", error);
    result.textContent = "Error fetching conversion rate.";
  }
}

document.addEventListener("DOMContentLoaded", fetchCurrencies);

convertBtn.addEventListener("click", convertCurrency);