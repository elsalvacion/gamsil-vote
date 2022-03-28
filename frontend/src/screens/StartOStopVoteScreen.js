import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Switch from "react-switch";
import Card from "../components/Card";
import Loading from "../components/Loading";
import Errors from "../components/Errors";
import { releaseElectionResults } from "../actions/voteAction";

const StartOStopVoteScreen = () => {
  const [isVotingStart, setIsVotingStart] = useState(true);
  const [releaseResults, setReleaseResults] = useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    loading: releaseLoading,
    success: releaseSuccess,
    errors: releaseErrors,
  } = useSelector((state) => state.releaseResults);

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
  }, [userInfo, releaseSuccess, history, releaseResults]);

  const handleRelease = () => {
    setReleaseResults(!releaseResults);
  };
  return (
    <div className="h-screen flex justify-center">
      <Card>
        {releaseLoading && <Loading text="Sending... election results" />}
        {releaseErrors && <Errors errors={releaseErrors} />}
        <div className="flex flex-col items-center justify-center">
          <h2 className="my-2 font-semibold text-center">
            {isVotingStart ? "Voting is Open" : "Voting is Close"}
          </h2>
          <Switch
            onChange={(checked) => setIsVotingStart(!isVotingStart)}
            checked={isVotingStart}
          />
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
