import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "../components/Card";
import { FaPlus, FaRegTrashAlt, FaEdit } from "react-icons/fa";
import Errors from "../components/Errors";
import Loading from "../components/Loading";

import { deleteCandidate, fetchCandidate } from "../actions/candidateAction";
import {
  CREATE_CANDIDATE_RESET,
  DELETE_CANDIDATE_RESET,
  FETCH_SINGLE_CANDIDATE_RESET,
  UPDATE_CANDIDATE_RESET,
  UPLOAD_IMAGE_RESET,
} from "../reducers/types/candidateTypes";
const CandidateScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, candidates, errors } = useSelector(
    (state) => state.fetchCandidate
  );
  const { success: editSuccess } = useSelector((state) => state.editCandidate);
  const { success: createSuccess } = useSelector(
    (state) => state.createCandidate
  );
  const {
    loading: deleteLoading,
    success: deleteSuccess,
    errors: deleteErrors,
  } = useSelector((state) => state.deleteCandidate);

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!userInfo || !Number(userInfo.isAdmin)) history.push("/");
    else {
      if (deleteSuccess)
        dispatch({
          type: DELETE_CANDIDATE_RESET,
        });
      dispatch({
        type: FETCH_SINGLE_CANDIDATE_RESET,
      });

      if (createSuccess || editSuccess) {
        dispatch({
          type: CREATE_CANDIDATE_RESET,
        });
        dispatch({
          type: UPLOAD_IMAGE_RESET,
        });
        dispatch({
          type: UPDATE_CANDIDATE_RESET,
        });
      }
      dispatch(fetchCandidate());
    }
  }, [userInfo, history, dispatch, deleteSuccess, editSuccess, createSuccess]);

  const handleCandidateDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCandidate(id));
    }
  };
  return (
    <div className="h-full w-full  flex justify-center">
      <Card>
        {/* header */}
        <div className="py-3 flex justify-between">
          <h2 className="font-bold">Candidates</h2>
          <button
            onClick={() => history.push("/create-candidate")}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
          >
            <FaPlus fontSize={20} />
          </button>
        </div>

        {loading || deleteLoading ? (
          loading ? (
            <Loading text="Fetch candidates ..." />
          ) : (
            <Loading text="Deleting ..." />
          )
        ) : errors || deleteErrors ? (
          <Errors errors={errors || deleteErrors} />
        ) : (
          <div className="mt-4">
            <table className="table-auto w-full border-collapse border border-gray-400">
              <thead>
                <tr className="mb-3">
                  <th className="text-left border-collapse border border-gray-400 p-2">
                    Name
                  </th>
                  <th className="text-left border-collapse border border-gray-400 p-2">
                    Category
                  </th>
                  <th className="text-left border-collapse border border-gray-400"></th>
                </tr>
              </thead>
              <tbody>
                {candidates && candidates.length > 0 ? (
                  <>
                    {candidates.map((candidate) => (
                      <tr key={candidate.id}>
                        <td className="my-3 border-collapse border border-gray-400 p-2">
                          {candidate.name}
                        </td>
                        <td className="my-3 border-collapse border border-gray-400 p-2">
                          {candidate.category}
                        </td>
                        <td className="flex p-2 items-center my-3">
                          <button
                            className="mx-2"
                            onClick={() =>
                              history.push(`/edit-candidate/${candidate.id}`)
                            }
                          >
                            <FaEdit fontSize={20} />
                          </button>

                          <button
                            className="text-red-500 mx-2"
                            onClick={() => handleCandidateDelete(candidate.id)}
                          >
                            <FaRegTrashAlt fontSize={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <h2>No candidate found</h2>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CandidateScreen;
