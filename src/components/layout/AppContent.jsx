import { Layout, Typography } from "antd";
import { useContext } from "react";
import CryptoContext from "../../context/crypto-context";
import PortfolioChart from "../PortfolioChart";
import AssetsTable from "../AssetsTable";

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100dvh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

export default function AppContent() {
  const { cryptoAssets, cryptoData } = useContext(CryptoContext);

  const cryptoPriceMap = cryptoData.result.reduce((acc, c) => {
    acc[c.id] = c.price;
    return acc;
  }, {});

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={2} style={{ textAlign: "left", color: "#fff" }}>
        Portfolio{" "}
        {cryptoAssets
          .map((asset) => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, v) => (acc += v), 0)
          .toFixed(3)}
        $
        <PortfolioChart />
        <AssetsTable />
      </Typography.Title>
    </Layout.Content>
  );
}
