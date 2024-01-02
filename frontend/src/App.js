import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  // State variables for user input, output data, and visibility of the output box
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  // State variable to store API response data
  const [apiData, setApiData] = useState({});

  // Function to fetch student data from the server
  const getData = async () => {
    try {
      const response = await fetch(
        // Send a GET request to the server with the provided name and roll number as query parameters
        `http://localhost:3001/api/get-student?name=${name}&rollNumber=${roll}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // If the response is successful, parse the JSON data and update the state with the student data
        const responseData = await response.json();
        setApiData(responseData.student);
      } else {
        console.error("GET request failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Function to handle form submission
  const formSubmitHandler = (e) => {
    e.preventDefault();
    getData(); // Call the function to fetch student data
    setShowOutput(true); // Show the output box
  };

  // Effect to log the updated API data when it changes
  useEffect(() => {
    console.log("apiData in useEffect:", apiData);
  }, [apiData]);

  return (
    <div className="outer-container">
      <div className="main-block">
        <h1>Student Portal</h1>
        <form className="input-form" onSubmit={formSubmitHandler}>
          <div className="single-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="single-field">
            <label htmlFor="college">Roll Number</label>
            <input
              type="number"
              name="college"
              placeholder="Roll Number"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              required
            />
          </div>
          <div className="button">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      
      {/* If you want i can put this Output box in a seprate file to make look code better */}
      {showOutput && (
        <div className="right-box">
          <h1>Output Box</h1>
          <div id="objectlist">
            <li className="list-item">
              <div className="key">Name</div>
              <div className="value">{apiData.name}</div>
            </li>
            <li className="list-item">
              <div className="key">College</div>
              <div className="value">{apiData.college}</div>
            </li>
            <li className="list-item">
              <div className="key">Course</div>
              <div className="value">{apiData.course}</div>
            </li>
            <li className="list-item">
              <div className="key">Roll Number</div>
              <div className="value">{apiData.rollNumber}</div>
            </li>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
