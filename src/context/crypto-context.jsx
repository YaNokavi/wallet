import { createContext, useEffect, useState } from "react";
import { fetchCryptoAssets, fetchCryptoData } from "../api";
import { percentDifference } from "../utils";

const CryptoContext = createContext({
  cryptoData: [],
  cryptoAssets: [],
  loading: false,
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState();
  const [cryptoAssets, setCryptoAssets] = useState([]);
  const [cryptoData, setCryptoData] = useState({ result: [] });

  function mapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id);
      return {
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
        ...asset,
      };
    });
  }

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const cryptoAssets = await fetchCryptoAssets();
      const { result } = await fetchCryptoData();

      setCryptoAssets(mapAssets(cryptoAssets, result));
      setCryptoData({ result });
      setLoading(false);
    }
    preload();
  }, []);

  function addAsset(newAsset) {
    setCryptoAssets((prev) =>
      mapAssets([...prev, newAsset], cryptoData.result)
    );
  }

  return (
    <CryptoContext.Provider
      value={{ cryptoData, cryptoAssets, loading, addAsset }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;
