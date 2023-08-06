import React, { useEffect, useState } from "react";
import "../styles.css";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import MyContentCard from "./MyContentCard";
import UpdateNav from "./UpdateNav";
import Loading from "./Loading";

function MyContent() {
  const history = useHistory();
  // const location = useLocation();
  const username = localStorage.getItem("username");
  const backObj = {
    username: username,
  };
  const url = "https://first-ki55.onrender.com/mycontent/" + username;

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
    setCourses(() => {
      const arr = response.data.courses;
      return [...arr];
    });
    console.log(response.data.courses);
    setLoading(false);
  };
  useEffect(() => {
    isLogged();
    getUser();
    // eslint-disable-next-line
  }, []);

  function showCourses(single, index) {
    return (
      <MyContentCard
        key={index}
        nameOfCourse={single.courseName}
        myUser={username}
        founder={single.founderName}
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

export default MyContent;
