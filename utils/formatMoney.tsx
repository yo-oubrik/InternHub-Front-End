import currency from "currency.js";

const formatMoney = (amount: number) => {

  return currency(amount, {
    precision: 2,
    separator: ",",
    decimal: ".",
    symbol : ""
  }).format();
};

export default formatMoney;
