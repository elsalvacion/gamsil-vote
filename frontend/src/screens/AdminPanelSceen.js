import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { ImSwitch } from "react-icons/im";
import { GiPodiumWinner } from "react-icons/gi";
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
      icon: (
        <BiCategory fontSize={50} className="my-3 text-center text-blue-600" />
      ),
    },
    {
      title: "candidates",
      path: "/candidate",
      icon: (
        <GiPodiumWinner
          fontSize={50}
          className="my-3 text-center text-blue-600"
        />
      ),
    },
    {
      title: "start/stop vote",
      path: "/start-or-stop-vote",
      icon: (
        <ImSwitch fontSize={50} className="my-3 text-center text-blue-600" />
      ),
    },
    {
      title: "users",
      path: "/user",
      icon: (
        <FaUsers fontSize={50} className="my-3 text-center text-blue-600" />
      ),
    },
  ];
  return (
    <div className="h-full w-full pt-7">
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 p-3 md:p-7 lg:w-9/12 lg:mx-auto">
        {links.map((link) => (
          <div
            key={link.title}
            className={`flex flex-col items-center bg-white shadow-md hover:shadow-xl hover:rounded-2xl rounded py-7 cursor-pointer`}
            onClick={() => history.push(link.path)}
          >
            {link.icon}
            <h2 className="my-3 text-center uppercase text-2xl">
              {link.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanelSceen;
