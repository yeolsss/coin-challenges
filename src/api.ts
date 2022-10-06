const BASE_URL = 'http://api.coinpaprika.com/v1';

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}
