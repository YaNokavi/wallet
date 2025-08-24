import { cryptoAssets, cryptoData } from "./data";

export function fetchCryptoAssets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 10);
  });
}

export function fetchCryptoData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData);
    }, 10);
  });
}
