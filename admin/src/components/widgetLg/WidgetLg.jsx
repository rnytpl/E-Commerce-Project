import { useSelector } from "react-redux";
import "./widgetLg.css";

export const WidgetLg = () => {
  const { orders } = useSelector((state) => state.order);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders &&
          orders.map((order) => (
            <tr className="widgetLgTr" key={order._id}>
              <td className="widgetLgUser">
                <img
                  src={
                    order.img ||
                    "https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  }
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName">{order.userId.username}</span>
              </td>
              <td className="widgetLgDate">
                {new Date(order.createdAt).toGMTString()}
              </td>
              <td className="widgetLgAmount">{order.amount.toFixed(2)}</td>
              <td className="widgetLgStatus">
                <Button type="Approved" />
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
};
