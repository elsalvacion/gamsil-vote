import React, { useEffect } from "react";
import Card from "../components/Card";
import { GoUnverified, GoVerified } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { logoutUser, verifyUser } from "../actions/userAction";
import Errors from "../components/Errors";
import Loading from "../components/Loading";
const VerifyUserScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, errors, success } = useSelector((state) => state.verifyUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (success) {
      if (userInfo) {
        dispatch(logoutUser());
      }
    } else dispatch(verifyUser(id));
  }, [userInfo, id, success, dispatch]);
  return (
    <div className="h-full w-full  flex justify-center">
      <Card>
        {loading && <Loading text="Verifying..." />}
        <h2 className="my-4 flex items-center justify-center text-xl">
          {success ? (
            <>
              <span className="mr-2">Account Verfied</span>
              <GoVerified className="text-green-700" />
            </>
          ) : errors ? (
            <>
              <span className="mr-2">Error occured</span>
              <GoUnverified className="text-blue-700" />
            </>
          ) : (
            <>
              <span className="mr-2">Will soon be verified</span>
              <GoUnverified className="text-blue-700" />
            </>
          )}
        </h2>

        {errors && <Errors errors={errors} />}

        {success && (
          <>
            <p className="mb-4">
              Your account is not verified. Please login to vote.
            </p>

            <button
              className="rounded mx-auto mb-2 text-lg bg-blue-600 hover:bg-blue-900 py-1 px-3 text-white"
              onClick={() => history.push("/")}
            >
              LOGIN
            </button>
          </>
        )}
      </Card>
    </div>
  );
};

export default VerifyUserScreen;
