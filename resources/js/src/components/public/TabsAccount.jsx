import React, { useEffect } from "react";
import { ContentOrders } from ".";
const { useState } = React;

export const TabsAccount = ({ data, setUser }) => {
  const tabItems = [
    {
      id: 1,
      title: "Tout",
    },
    {
      id: 2,
      title: "Attente",
    },
    {
      id: 3,
      title: "Terminer",
    },
  ];
  const columns = ["Numero", "Montant", "Status", "Date", "Action"];

  const [active, setActive] = useState(1);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const filteredOrders = data.filter((order) => {
      switch (active) {
        case 2:
          return order.status === 1;
        case 3:
          return order.status === 2;
        default:
          return true;
      }
    });
    setOrders(filteredOrders);
  }, [active]);
  console.log(orders);
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
        <ContentOrders
          data={orders.filter((order) => order.canceled === 0)}
          name={"orders"}
          columns={columns}
          // ishow={active === tabItems.id}
          setUser={setUser}
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
