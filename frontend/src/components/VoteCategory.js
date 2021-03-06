import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutUser } from "../actions/userAction";
import store from "../store";

const VoteCategory = ({ category }) => {
  const [loading, setLoading] = useState(false);
  const [candidates, setCandidates] = useState(null);

  const [vote, setVote] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);

        const {
          userLogin: { userInfo },
        } = store.getState();
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get(
          `/candidate?category=${category}`,
          config
        );

        setCandidates(data.msg);
        setLoading(false);
      } catch (err) {
        console.log(err.response);
        if (err.response.data && err.response.data.errors)
          err.response.data.errors.forEach((error) => {
            if (
              error.msg === "Not Authorized: No Token" ||
              error.msg === "Not Authorized: Invalid User" ||
              error.msg === "Not authorized as an admin"
            ) {
              dispatch(logoutUser());
            }
          });

        setLoading(false);
      }
    };
    fetchCandidates();
  }, [category, dispatch]);

  const handleVote = (id) => {
    setVote(id);
    const votes = localStorage.getItem("votes")
      ? Array.from(JSON.parse(localStorage.getItem("votes")))
      : [];

    const newCandidate = {
      candidate: id,
      category,
    };

    if (votes.length > 0) {
      const isExist = votes.find((v) => v.category === category);

      if (isExist) {
        const filtered = votes.map((v) =>
          v.category === category ? newCandidate : v
        );
        localStorage.setItem("votes", JSON.stringify(filtered));
      } else {
        votes.push(newCandidate);
        localStorage.setItem("votes", JSON.stringify(votes));
      }
    } else {
      votes.push(newCandidate);
      localStorage.setItem("votes", JSON.stringify(votes));
    }
  };

  return candidates && candidates.length > 0 ? (
    <div className="rounded w-11/12 md:9/12 mx-auto mt-4 bg-gray-50 p-3 ">
      <h2 className="my-2 font-semibold text-xl uppercase">{category}</h2>
      <div className="flex flex-wrap justify-center items-stretch">
        {loading ? (
          <p className="my-5 font-semibold text-xl">loading ...</p>
        ) : (
          candidates &&
          candidates.map((candidate) => (
            <div
              key={candidate.id}
              className={`mb-6 cursor-pointer w-5/12 md:w-72 relative rounded-md shadow-md hover:shadow-lg m-2 bg-white ${
                vote === candidate.id &&
                " border-2 outline-2 outline-green-700 border-green-700 shadow-green-700 drop-shadow-md "
              }`}
              onClick={() => handleVote(candidate.id)}
            >
              {vote === candidate.id && (
                <div className="absolute rounded -top-4 -right-4 p-2 bg-green-700">
                  <FaCheck fontSize={20} className="text-white" />
                </div>
              )}
              <img
                src={candidate.image}
                className="w-28 h-28 rounded-full mx-auto  object-cover p-2"
                alt={candidate.name}
              />
              <div className="p-2 flex justify-center items-center">
                <p className="uppercase text-center">{candidate.name}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  ) : null;
};

export default VoteCategory;
