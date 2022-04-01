import React, { useEffect } from "react";
import Card from "../components/Card";
import { GoUnverified } from "react-icons/go";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const NotVerifiedScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const history = useHistory();
  useEffect(() => {
    if (!userInfo) history.push("/");
    else {
      if (!Boolean(userInfo.isVerfied)) history.push("/not-verified");
    }
  }, [userInfo, history]);
  return (
    <div className="h-full w-full  flex justify-center ">
      <Card>
        <h2 className="my-4 flex items-center justify-center text-xl">
          <span className="mr-2">No verified</span>{" "}
          <GoUnverified className="text-blue-500" />
        </h2>

        <p className="text-blue-700 mb-4">
          Good news you have been registered but not verified. All you have to
          do is head to your IUT gmail and verify your account. Follow the STEPS
          below.
        </p>

        <h2 className="underline text-xl">STEPS</h2>

        <ul className="list-disc px-2">
          <li className="my-2">
            Open your gmail and login with your IUT email.
          </li>
          <li className="my-2">Search for a message from GAMSIL VOTE.</li>
          <li className="my-2">
            Click the link inside the message. <b>Booom see the magic?</b>
          </li>
          <li className="my-2">Login Again.</li>
        </ul>
      </Card>
    </div>
  );
};

export default NotVerifiedScreen;
