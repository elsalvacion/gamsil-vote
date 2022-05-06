import React, { useEffect } from "react";
import { Zoom } from "react-awesome-reveal";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "../components/Card";

const VotedScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const history = useHistory();
  useEffect(() => {
    if (!userInfo) history.push("/");
  }, [userInfo, history]);
  return (
    <div className="h-full w-full  flex justify-center">
      <Card>
        <div className="w-full h-56 md:h-80 relative flex justify-center items-center">
          <div className="absolute top-0 left-0 right-0 bottom-0">
            <img
              src="https://media.giphy.com/media/3oz8xAFtqoOUUrsh7W/giphy.gif"
              alt="Gamsil well done"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <Zoom>
          <p className="text-lg my-5 text-blue-700">
            Please wait for the admin to release the results. Results will be sent to your emai.
          </p>
        </Zoom>
      </Card>
    </div>
  );
};

export default VotedScreen;
