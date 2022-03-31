import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import Masonry from "react-masonry-css";
import { fetchCandidate } from "../actions/candidateAction";
import Errors from "../components/Errors";
import "./VotingNotOpenScreen.css";
import { Zoom } from "react-awesome-reveal";
const VotingNotOpen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, candidates, errors } = useSelector(
    (state) => state.fetchCandidate
  );
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo) history.push("/");
    else {
      if (!Number(userInfo.isVerified)) history.push("/not-verified");
      if (Number(userInfo.voted)) history.push("/voted");
      if (!candidates) {
        dispatch(fetchCandidate());
      }
    }
  }, [userInfo, history, candidates, dispatch]);

  const breakpointColumnsObj = {
    default: 4,

    700: 2,
    300: 1,
  };
  return (
    <div className="h-full flex justify-center ">
      {loading ? (
        <Loading text="Fetching candidates" />
      ) : errors ? (
        <Errors errors={errors} />
      ) : (
        <div className="md:bg-gray-50 rounded-md p-3">
          <h2 className="text-center my-3 text-white text-xl md:text-black">
            Your Contestants
          </h2>
          <p className="mb-3 text-gray-50 md:text-blue-700 mx-3">
            * Voting is not opened yet. You will be emailed when it is open, for
            now you can familairize yourself with the contestants.
          </p>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {candidates && candidates.length > 0 ? (
              candidates.map((candidate) => (
                <Zoom key={candidate.id} delay={Math.random() + 500}>
                  <div className={`rounded-md shadow-lg bg-white p-2`}>
                    <img
                      src={candidate.image}
                      className="w-28 h-28 rounded-full mx-auto  object-cover p-2"
                      alt={candidate.name}
                    />
                    <div className="p-2">
                      <p className="uppercase text-center mb-2">
                        {candidate.name}
                      </p>
                      <p>
                        <b>{candidate.category}</b>
                      </p>
                    </div>
                  </div>
                </Zoom>
              ))
            ) : (
              <h2>No contestants </h2>
            )}
          </Masonry>
        </div>
      )}
    </div>
  );
};

export default VotingNotOpen;
