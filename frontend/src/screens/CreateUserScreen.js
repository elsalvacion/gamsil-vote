import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Errors from "../components/Errors";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/userAction";
import Spinner from "../components/Spinner";
import { useHistory } from "react-router-dom";
import { REGISTER_USER_RESET } from "../reducers/types/userTypes";
import Loading from "../components/Loading";
const CreateUserScreen = () => {
  const dispatch = useDispatch();
  const { loading, errors, success } = useSelector(
    (state) => state.registerUser
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  const history = useHistory();
  useEffect(() => {
    if (!userInfo || !Number(userInfo.isAdmin)) history.push("/");
    if (success) history.push("/user");

    dispatch({
      type: REGISTER_USER_RESET,
    });
  }, [success, history, dispatch, userInfo]);
  const [values, setValues] = useState({
    email: "",
    isAdmin: false,
  });

  const [formErrors, setFormErrors] = useState([]);
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors([]);
    if (values.email !== "") {
      const splitEmail = values.email.split("@");
      if (splitEmail[1] !== "iut-dhaka.edu")
        setFormErrors([
          {
            msg: "You must use an IUT email",
          },
        ]);
      else dispatch(registerUser(values.email));
    }
  };
  return (
    <div className="h-full w-full  flex justify-center">
      <Card>
        <h2 className="mb-5 font-bold uppercase text-center text-xl">
          ADD USER
        </h2>

        {formErrors.length > 0 && <Errors errors={formErrors} />}
        {errors && <Errors errors={errors} />}
        {loading && <Loading text="Adding new user ..." />}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block">
            Enter email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="border-2 block w-full py-2 rounded px-2 mb-5"
            value={values.email}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="bg-white border-2  px-3 py-1 text-black rounded flex items-center text-center"
          >
            <span className="mr-3">SUBMIT</span>
            {loading && <Spinner />}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default CreateUserScreen;
