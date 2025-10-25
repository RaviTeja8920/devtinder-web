import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  const handleConnectionRequest = async (status, _id) => {
    try {
      console.log(_id);
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h1> no Requests found</h1>;

  return (
    <div>
      <div className="text-center my-10">
        <h1 className="text-bold text-3xl">Requests</h1>
      </div>
      {requests.map((request) => {
        console.log(request);
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div
            className="flex  mx-10 bg-base-200 rounded-lg my-5 w-1/2 mx-auto "
            key={_id}
          >
            <div className=" w-44 h-44 overflow-hidden rounded-xl shadow-lg">
              <img className="w-full h-full object-cover" src={photoUrl} />
            </div>
            <div className="mx-5 my-3">
              <h2>
                {firstName} {lastName && lastName}
              </h2>
              <p>age: {age}</p>
              {gender && <p>gender: {gender}</p>}

              <p>about: {about}</p>
            </div>
            <div className="flex">
              <button
                className="btn btn-primary"
                onClick={() => handleConnectionRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleConnectionRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
