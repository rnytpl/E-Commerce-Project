import { useSelector } from "react-redux";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { WidgetSm } from "../../components/widgetSm/WidgetSm";
import { WidgetLg } from "../../components/widgetLg/WidgetLg";
// import { useMemo } from "react";

import { Loader } from "../../components/Loader/Loader";

export default function Home() {
  // const [userStats, setUserStats] = useState([]);
  const { userStats, isLoading } = useSelector((state) => state.user);
  // const MONTHS = useMemo(
  //   () => [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ],
  //   []
  // );

  if (isLoading) {
    return (
      <div className="loading">
        <Loader />
      </div>
    );
  }

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
