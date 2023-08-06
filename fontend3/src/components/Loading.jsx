import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        display: "flex",
      }}
    >
      {/* <h2>Loading in ReactJs - GeeksforGeeks</h2> */}
      <h1 style={{ display: "inline", margin: "0", marginRight: "5px" }}>
        Loading
      </h1>
      <ReactLoading type="balls" color="#0000FF" height={100} width={50} />
      {/* <ReactLoading type="bars" color="#0000FF" height={100} width={50} />
      <ReactLoading type="bubbles" color="#0000FF" height={100} width={50} />
      <ReactLoading type="cubes" color="#0000FF" height={100} width={50} />
      <ReactLoading type="cylon" color="#0000FF" height={100} width={50} />
      <ReactLoading type="spin" color="#0000FF" height={100} width={50} />
      <ReactLoading type="spokes" color="#0000FF" height={100} width={50} /> */}
      {/* <ReactLoading
        type="spinningBubbles"
        color="#0000FF"
        height={100}
        width={50}
      /> */}
    </div>
  );
}
