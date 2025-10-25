import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const userFeed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/feed",

        {
          withCredentials: true,
        }
      );
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!userFeed) return;
  if (userFeed <= 0)
    return <div className="text-center text-bold my-10">No Users</div>;

  return (
    userFeed && (
      <div className="flex justify-center my-10">
        <UserCard user={userFeed[0]} />
      </div>
    )
  );
};

export default Feed;
