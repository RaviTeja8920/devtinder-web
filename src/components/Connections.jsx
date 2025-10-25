import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispacth = useDispatch();
  const connections = useSelector((store) => store.connections);

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispacth(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1> no connections found</h1>;

  return (
    <div>
      <div className="text-center my-10">
        <h1 className="text-bold text-3xl">Connections</h1>
      </div>
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div
            className="flex  mx-10 bg-base-200 rounded-xl my-5 w-1/2 mx-auto "
            key={_id}
          >
            <div className=" w-44 h-44 overflow-hidden rounded-xl shadow-lg">
              <img className="w-full h-full object-cover" src={photoUrl} />
            </div>
            <div className="mx-10 my-5">
              <h2>
                {firstName} {lastName && lastName}
              </h2>
              <p>age: {age}</p>
              {gender && <p>gender: {gender}</p>}

              <p>about: {about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
