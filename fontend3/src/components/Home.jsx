import React, { useEffect, useState } from "react";
import "../styles.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Homecard from "./Homecard";
import Navbar from "./Navbar";
import Loading from "./Loading";

function Home() {
  const history = useHistory();
  const username = localStorage.getItem("username");
  const url = "https://first-ki55.onrender.com/home/" + username;
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
    const response = await axios.get(url);
    setCourses(response.data);
    setLoading(false);
  };
  useEffect(() => {
    isLogged();
    getUser();
    // eslint-disable-next-line
  }, []);

  function showCourses(single, index) {
    return (
      <Homecard
        key={index}
        nameOfCourse={single.courseName}
        usersName={username}
        founder={single.username}
        likes={single.totalLikes}
        views={single.totalViews}
      />
    );
  }

  const filterData = (query, data) => {
    if (!query) {
      return data;
    } else {
      return data.filter((d) =>
        d.courseName.toLowerCase().includes(query.toLowerCase())
      );
    }
  };
  const dataFiltered = filterData(searchQuery, courses);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="homeDiv">
          <div>
            <Navbar
              username={username}
              setSearchQ={setSearchQuery}
              searchQ={searchQuery}
            />
          </div>
          {/* <div className="homeUpperDiv">
        <button className="homeButton">Contacts</button>
        <button className="homeButton">About</button>
        <button className="homeButton">Logout</button>
      </div> */}

          <div className="homeCoursesArea">
            <div className="ag-format-container">
              <div className="ag-courses_box">
                {dataFiltered && dataFiltered.map(showCourses)}
              </div>
            </div>
          </div>

          {/* <div className="homeLowerDiv">
        <div className="homeCopyRight">
          <p>Copyrights©️2023</p>
          <p>~Aditya Joshi</p>
        </div>
        <button
          className="homeLowerButton"
          onClick={() => {
            history.push("/insert/" + username);
          }}
        >
          INSERT A COURSE
        </button>
      </div> */}
        </div>
      )}
    </>
  );
}

export default Home;
