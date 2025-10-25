import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogIn, setIsLogIn] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email: emailId,
          password: password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));

      return navigate("/");
    } catch (err) {
      setErrorMessage(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          email: emailId,
          password: password,
          firstName,
          lastName,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));

      return navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">
              {isLogIn ? "LogIn" : "SignUp"}
            </h2>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email ID:</legend>
                <input
                  type="text"
                  className="input"
                  value={emailId}
                  onChange={(e) => {
                    setEmailId(e.target.value);
                  }}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Password:</legend>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="input"
                />
              </fieldset>
              {!isLogIn && (
                <>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">First Name:</legend>
                    <input
                      type="text"
                      className="input"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Last Name:</legend>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      className="input"
                    />
                  </fieldset>
                </>
              )}
            </div>
            <p className="text-red-100">{errorMessage}</p>
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary"
                onClick={isLogIn ? handleLogin : handleSignUp}
              >
                {isLogIn ? "LogIn" : "SignUp"}
              </button>
            </div>
            <p
              className="text-red-100 text-center cursor-pointer"
              onClick={() => setIsLogIn(!isLogIn)}
            >
              {isLogIn ? "New User? SignUp Here" : "Existing User? LogIn Here"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
