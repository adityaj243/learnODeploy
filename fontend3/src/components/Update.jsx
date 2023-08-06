import React, { useEffect, useState } from "react";
import "../styles.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UpdateCard from "./UpdateCard";
import UpdateNav from "./UpdateNav";
import Loading from "./Loading";

function Update() {
  const history = useHistory();
  // const location = useLocation();
  const username = localStorage.getItem("username");
  const prevCourse = localStorage.getItem("prevcourse");
  if (prevCourse) {
    localStorage.setItem("coursename", prevCourse);
    localStorage.removeItem("prevcourse");
  }
  const backObj = {
    username: username,
  };
  const url = "https://first-ki55.onrender.com/update/" + username;
  // const url = "https://first-ki55.onrender.com" + location.pathname;
  // const username = location.pathname.slice(8);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  async function isLogged() {
    const logginObj = {
      urlUsername: username,
    };
    try {
      const response = await axios.post(
        "https://first-ki55.onrender.com/islogged",
        logginObj,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      if (!response.data.auth) {
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getUser = async function () {
    setLoading(true);
    const response = await axios.post(url, backObj);
    setCourses(response.data);
    console.log(response.data);
    setLoading(false);
  };
  useEffect(() => {
    isLogged();
    getUser();
    // eslint-disable-next-line
  }, []);

  function showCourses(single, index) {
    return (
      <UpdateCard
        key={index}
        nameOfCourse={single.courseName}
        myUser={username}
      />
    );
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="homeDiv">
          <div>
            <UpdateNav username={username} />
          </div>

          <div className="updateVideoList">
            {courses && courses.map(showCourses)}
          </div>
        </div>
      )}
    </>
  );
}

export default Update;
