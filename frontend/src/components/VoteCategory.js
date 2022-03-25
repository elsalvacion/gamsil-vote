import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../actions/userAction";
import store from "../store";
const VoteCategory = ({ category }) => {
  const [loading, setLoading] = useState(false);
  const [candidates, setCandidates] = useState(null);
  const [errors, setErrors] = useState(null);
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
        err.response.data.errors.forEach((error) => {
          if (
            error.msg === "Not Authorized: No Token" ||
            error.msg === "Not Authorized: Invalid User" ||
            error.msg === "Not authorized as an admin"
          ) {
            dispatch(logoutUser());
          }
        });
        setErrors(err.response.data.errors);
        setLoading(false);
      }
    };
    fetchCandidates();
  }, [category]);
  return (
    <div className="rounded w-11/12 md:9/12 mx-auto mt-4 bg-gray-50 p-3">
      <h2 className="my-2 font-semibold text-xl uppercase">{category}</h2>
      <div className="flex flex-wrap justify-center items-stretch">
        {loading ? (
          <p>loading ...</p>
        ) : (
          candidates &&
          candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="w-5/12 md:w-72 rounded-md shadow-md m-2 bg-white"
            >
              <img
                src={candidate.image}
                className="w-28 h-28 rounded-full mx-auto  object-cover p-2"
              />
              <div className="p-2 flex justify-center items-center">
                <p className="uppercase text-center">{candidate.name}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VoteCategory;
