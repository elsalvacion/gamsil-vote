import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Switch from "react-switch";
import Card from "../components/Card";
import Loading from "../components/Loading";
import Errors from "../components/Errors";
import {
  getStartOStopElection,
  releaseElectionResults,
  startOStopElection,
} from "../actions/voteAction";
// import { START_O_STOP_RESET } from "../reducers/types/voteTypes";

const StartOStopVoteScreen = () => {
  const [releaseResults, setReleaseResults] = useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    loading: releaseLoading,
    success: releaseSuccess,
    errors: releaseErrors,
  } = useSelector((state) => state.releaseResults);

  const {
    loading: getStartOStopLoading,
    isOpen,
    success: getStartOStopSuccess,
    errors: getStartOStopErrors,
  } = useSelector((state) => state.getStartOStop);

  const {
    loading: startElectionLoading,
    success: startElectionSuccess,
    errors: startElectionErrors,
  } = useSelector((state) => state.startOStop);

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!userInfo || !Number(userInfo.isAdmin)) history.push("/");

    if (releaseResults) {
      dispatch(releaseElectionResults());
    }
    if (releaseSuccess) {
      setReleaseResults(false);
    }
    dispatch(getStartOStopElection());
  }, [
    userInfo,
    releaseSuccess,
    history,
    releaseResults,
    dispatch,
    startElectionSuccess,
  ]);

  const handleRelease = () => {
    setReleaseResults(!releaseResults);
  };
  return (
    <div className="h-full flex justify-center">
      <Card>
        {releaseLoading && <Loading text="Sending... election results" />}
        {startElectionLoading && <Loading text="Processing..." />}
        {getStartOStopLoading && (
          <Loading
            text={
              getStartOStopSuccess
                ? isOpen === 0
                  ? "Starting election & sending out email"
                  : "Stoping election"
                : "Checking if election is started"
            }
          />
        )}
        {getStartOStopErrors && <Errors errors={getStartOStopErrors} />}
        {startElectionErrors && <Errors errors={startElectionErrors} />}
        {releaseErrors && <Errors errors={releaseErrors} />}
        <div className="flex flex-col items-center justify-center">
          {getStartOStopSuccess ? (
            <>
              <h2 className="my-2 font-semibold text-center">
                {isOpen === 1 ? "Voting is Open" : "Voting is Close"}
              </h2>
              <Switch
                onChange={() =>
                  dispatch(startOStopElection(isOpen === 1 ? 0 : 1))
                }
                checked={isOpen}
              />
            </>
          ) : null}
          <div className="h-1 bg-gray-500 my-3"></div>
          <h2 className="my-2 font-semibold text-center">
            {releaseResults ? "Releasing election results" : "Release results"}
          </h2>
          <Switch onChange={handleRelease} checked={releaseResults} />
          {releaseSuccess && (
            <p className="text-green-700 my-2 ">
              * Election results send out to all users
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default StartOStopVoteScreen;
