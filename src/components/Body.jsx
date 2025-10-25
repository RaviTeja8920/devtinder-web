import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/profile/view",

        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }

      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Body;
