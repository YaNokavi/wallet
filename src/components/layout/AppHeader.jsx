import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useContext, useEffect, useState } from "react";
import CryptoContext from "../../context/crypto-context";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetform from "../AddAssetForm";

const headerStyle = {
  textAlign: "center",
  height: 60,
  width: "100%",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [modal, setModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { cryptoData } = useContext(CryptoContext);

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  function handleSelect(value) {
    setCoin(cryptoData.result.find((c) => c.id === value));
    setModal(true);
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 250 }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        value="press / to open"
        options={cryptoData.result.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space style={{ lineHeight: 0 }}>
            <img
              style={{ width: 20, verticalAlign: "middle" }}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />
      <Button type="primary" onClick={() => setOpenDrawer(true)}>
        Add asset
      </Button>

      <Modal
        closable={{ "aria-label": "Custom Close Button" }}
        onCancel={() => setModal(false)}
        open={modal}
        footer={null}
      >
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer
        destroyOnHidden={true}
        width={600}
        title="Add Asset"
        closable={{ "aria-label": "Close Button" }}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <AddAssetform onClose={() => setOpenDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}
