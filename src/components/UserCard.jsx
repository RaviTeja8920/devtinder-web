import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
    user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, toUserId) => {
    try {
      const URL = BASE_URL + "/request/send/" + status + "/" + toUserId;
      const res = await axios.post(
        URL,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUserFromFeed(toUserId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm py-5">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{age + ", " + gender}</p>
        <p>{about}</p>
        {skills && <p>{"Skills: " + skills.join(", ")}</p>}
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-secodary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
