import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhototUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [errorMessage, setErrorMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      console.log(res);
      notify(res);
    } catch (err) {
      setErrorMessage(err?.response?.data || "Something went wrong");
    }
  };

  const notify = (res) => {
    if (res.status === 200) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name: </legend>
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
                  <legend className="fieldset-legend">Last Name: </legend>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    className="input"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Photo Url: </legend>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => {
                      setPhototUrl(e.target.value);
                    }}
                    className="input"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age: </legend>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                    className="input"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender: </legend>
                  <input
                    type="text"
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                    className="input"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About: </legend>
                  <input
                    type="text"
                    value={about}
                    onChange={(e) => {
                      setAbout(e.target.value);
                    }}
                    className="input"
                  />
                </fieldset>
                <p className="text-red-100">{errorMessage}</p>
              </div>

              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {showNotification && (
        <div className="toast">
          <div className="alert alert-info">
            <span>Profile Updated sucessfulyly</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
