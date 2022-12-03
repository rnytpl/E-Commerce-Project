import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useSelector } from "react-redux";

export const WidgetSm = () => {
  const { users } = useSelector((state) => state.user);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users &&
          users.map((user) => {
            return (
              <li className="widgetSmListItem" key="asdasdasd">
                <img
                  src={
                    user.img || "https://img.icons8.com/android/512/user.png"
                  }
                  alt="useravatar"
                  className="widgetSmImg"
                />
                <div className="widgetSmUser">
                  <span className="widgetSmUsername">{user.username}</span>
                  <span className="widgetSmUserTitle">Software Engineer</span>
                </div>
                <button className="widgetSmButton">
                  <Visibility className="widgetSmIcon" />
                  Display
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
