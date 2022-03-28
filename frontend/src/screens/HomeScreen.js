import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchCategory } from "../actions/categoryAction";
import { sendVotes } from "../actions/voteAction";
import VoteCategory from "../components/VoteCategory";
import Errors from "../components/Errors";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { SEND_VOTE_RESET } from "../reducers/types/voteTypes";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const history = useHistory();
  const { loading: categoryLoading, categories } = useSelector(
    (state) => state.fetchCategory
  );
  const {
    loading: votingLoading,
    success: votingSuccess,
    errors: votingErrors,
  } = useSelector((state) => state.sendVote);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo) history.push("/");
    else {
      if (!Number(userInfo.isVerified)) history.push("/not-verified");
      if (Number(userInfo.voted)) history.push("/voted");
    }
    if (!categories) {
      dispatch(fetchCategory());
    }
    if (votingSuccess) {
      dispatch({
        type: SEND_VOTE_RESET,
      });
      history.push("/voted");
    }
  }, [userInfo, history, categories, dispatch, votingSuccess]);

  const handleVote = () => {
    const isVotes = localStorage.getItem("votes")
      ? Array.from(JSON.parse(localStorage.getItem("votes")))
      : [];

    if (isVotes.length !== categories.length) {
      alert("Hey you cannot beat the system");
    } else if (window.confirm("Are you sure about your choices?")) {
      dispatch(sendVotes(isVotes));
    }
  };
  return (
    <div
      className="h-full w-full pb-5"
      style={{
        opacity: votingLoading ? 0.5 : 1,
      }}
    >
      {votingLoading && (
        <Loading text="We will be done soon. Sending vote ...." />
      )}
      {votingErrors && (
        <Card>
          <Errors errors={votingErrors} />
        </Card>
      )}
      {categoryLoading ? (
        <h2>Loading ...</h2>
      ) : (
        categories &&
        categories.map((category) => (
          <VoteCategory key={category.id} category={category.title} />
        ))
      )}
      <button
        onClick={handleVote}
        className="border-2 py-2 rounded text-center text-lg block w-1/2 m-3 mx-auto bg-blue-500 text-white hover:bg-blue-700 mb-5"
      >
        VOTE
      </button>
    </div>
  );
};

export default HomeScreen;
