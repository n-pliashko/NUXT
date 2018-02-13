export default {
  apiHost: (state) => state.apiHost,
  currency: (state) => state.currency,
  currencies: (state) => state.currency.allCurrency,
  selectedCurrency: (state) => state.currency.selected,
  basket: (state) => state.basket
}
