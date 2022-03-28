import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "../components/Card";
const AdminPanelSceen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const history = useHistory();
  useEffect(() => {
    if (!userInfo || !Number(userInfo.isAdmin)) history.push("/");
  }, [userInfo, history]);

  const links = [
    {
      title: "categories",
      path: "/category",
    },
    {
      title: "candidates",
      path: "/candidate",
    },
    {
      title: "start/stop vote",
      path: "/start-or-stop-vote",
    },
    {
      title: "users",
      path: "/user",
    },
  ];
  return (
    <div className="h-full w-full  flex justify-center pt-7">
      <Card>
        <div className="flex flex-col items-center">
          {links.map((link) => (
            <button
              key={link.title}
              className="bg-blue-500 text-white text-center py-3 w-9/12 md:w-64 rounded hover:bg-blue-700 my-3 text-lg uppercase "
              onClick={() => history.push(link.path)}
            >
              {link.title}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminPanelSceen;
