import React, { useState, useRef } from "react";
import { topologicalSort } from "./TopologicalSort";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const PrerequisiteCourses = () => {
  const [course, setCourse] = useState("");
  const [topoSort, setTopoSort] = useState({
    path: [],
    prevReq: [],
    opens: [],
  });
  const inputRef = useRef(null);
  const el = topoSort.path.map((item) => {
    return item === topoSort.path[0] ? (
      <div key={item.toString()}>{item}</div>
    ) : (
      <div key={item.toString()}>
        <FontAwesomeIcon icon={faArrowRight} />
        <div>{item}</div>
      </div>
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setCourse(inputRef.current.value);
    setTopoSort(new topologicalSort(course.toUpperCase()));
  };

  return (
    <div>
      <div>
        <img src={require("./img/Prequisites.png")} alt="ECE_Prerequisite" />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="course"
          ref={inputRef}
          value={course}
          placeholder="Write the course code..."
          onChange={(e) => setCourse(e.target.value)}
        />
        <input type="submit" value="Show" />
      </form>
      <div>
        <p>You must take these courses in the following order</p>
        <div>
          {topoSort.length === 1
            ? `${course.toUpperCase()} doesn't have any prequisite`
            : el}
        </div>
        <h3>
          <span>{course.toUpperCase()}</span> opens the following courses:
        </h3>
        <div>
          {topoSort.opens.length > 0 ? topoSort.opens.join(", ") : "None"}
        </div>
        <h3>
          <span>{course.toUpperCase()}</span> depends on these courses:
        </h3>
        <div>
          {topoSort.prevReq.length > 0 ? topoSort.prevReq.join(", ") : "None"}
        </div>
      </div>
    </div>
  );
};

export default PrerequisiteCourses;
