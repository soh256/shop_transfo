import React, { useEffect } from "react";
import { Table } from "../../components/private";
const { useState } = React;
import OrderService from "../../Services/Order.service";
import CustomerService from "../../Services/Customer";
import { ContentOrders } from "../public";

export const TabsAccountPrivate = ({ data }) => {
  const tabItems = [
    {
      id: 1,
      title: "Nouvelle ",
    },
    {
      id: 2,
      title: "Attente",
    },
    {
      id: 3,
      title: "Terminer",
    },
    {
      id: 4,
      title: "Annulée(s)",
    },
  ];

  const [active, setActive] = useState(1);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = ["cmdNum", "Montant", "Client", "statut", "date"];

  useEffect(() => {
    let filteredOrders = [];
    if (active !== 4) {
      filteredOrders = data.filter(
        (order) => order.statut === active - 1 && order.annuler === 0
      );
    } else {
      filteredOrders = data.filter((order) => order.annuler !== 0);
    }
    setOrders(filteredOrders);
  }, [active]);
  const posTexte = "text-center";
  return (
    <div className="w-full lg:m-3 ">
      <div className="flex justify-center">
        {tabItems.map(({ id, title }) => (
          <TabItemComponent
            key={title}
            title={title}
            onItemClicked={() => setActive(id)}
            isActive={active === id}
          />
        ))}
      </div>
      <div className="text-center mt-3 lg:text-sm ">
        <Table
          loading={loading}
          setLoading={setLoading}
          datas={orders}
          name={"orders"}
          columns={columns}
          setOrders={setOrders}
          active={active}
          aligne={posTexte}
        />
      </div>
    </div>
  );
};

const TabItemComponent = ({
  title = "",
  onItemClicked = () => console.error("You passed no action to the component"),
  isActive = false,
}) => {
  return (
    <div
      className={
        isActive
          ? "border-b-3 cursor-pointer w-full h-full text-center text-blue-600 p-3 border-blue-600 flex flex-col justify-center  "
          : "border-b-3 cursor-pointer w-full h-full text-center p-3  flex flex-col justify-center opacity-30 "
      }
      onClick={onItemClicked}
    >
      <p className="bg-white mx-2 text-sm font-medium">{title}</p>
    </div>
  );
};
