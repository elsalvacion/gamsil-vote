import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchCategory } from "../actions/categoryAction";
import { getStartOStopElection, sendVotes } from "../actions/voteAction";
import VoteCategory from "../components/VoteCategory";
import Errors from "../components/Errors";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { SEND_VOTE_RESET } from "../reducers/types/voteTypes";
import VoteHelp from "../components/VoteHelp";

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
  const {
    loading: getStartOStopLoading,
    isOpen,
    success: getStartOStopSuccess,
    errors: getStartOStopErrors,
  } = useSelector((state) => state.getStartOStop);
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

    if (getStartOStopSuccess) {
      if (isOpen === 0) {
        history.push("/voting-not-opened");
      }
    } else {
      dispatch(getStartOStopElection());
    }
  }, [
    userInfo,
    history,
    categories,
    dispatch,
    votingSuccess,
    getStartOStopSuccess,
    isOpen,
  ]);
  const [open, setOpen] = useState(false);
  const handleVote = () => {
    const isVotes = localStorage.getItem("votes")
      ? Array.from(JSON.parse(localStorage.getItem("votes")))
      : [];

    if (isVotes.length !== categories.length) {
      alert("Hey you cannot beat the system. Vote in all categories.");
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
      {open && <VoteHelp open={open} close={() => setOpen(!open)} />}
      <div
        className={`my-3 mx-auto p-3 ${
          categories && categories.length ? "flex items-center" : "hidden"
        }`}
      >
        <p className="text-white mr-3 font-semibold">Having trouble voting.</p>
        <button
          className="p-1 rounded bg-gray-100"
          onClick={() => setOpen(!open)}
        >
          Click here
        </button>
      </div>

      {getStartOStopLoading && <Loading text="Checking if voting is open" />}
      {votingLoading && (
        <Loading text="We will be done soon. Sending vote ...." />
      )}
      {votingErrors && (
        <Card>
          <Errors errors={votingErrors} />
        </Card>
      )}
      {getStartOStopErrors && (
        <Card>
          <Errors errors={getStartOStopErrors} />
        </Card>
      )}
      {categoryLoading ? (
        <Loading text="Fetching vote categories" />
      ) : (
        categories &&
        categories.map((category) => (
          <VoteCategory key={category.id} category={category.title} />
        ))
      )}
      <button
        onClick={handleVote}
        className={` border-2 py-2 px-20 rounded text-center text-lg ${
          categories && categories.length > 0 ? "block" : "hidden"
        } m-3 mx-auto bg-blue-500 text-white hover:bg-blue-700 mb-5`}
      >
        SUBMIT
      </button>
    </div>
  );
};

export default HomeScreen;
