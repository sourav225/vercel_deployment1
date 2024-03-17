import React, { useState, useEffect } from "react";
import axios from "axios";

function Todo() {
  const [tobedone, todoTask] = useState("");
  const [listi, setList] = useState([]);
  const [tobedelete, toDelete] = useState("");
  const [tobeedit, toEdit] = useState("");
  const [decision, setDecision] = useState(false);
  const [input, setInput] = useState("");
  const [nCheck, setCheck] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resdet = await axios.get("http://localhost:3550/display");
        setList(resdet.data.reverse());
        console.log(resdet);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [tobedone, tobedelete, decision, input, nCheck]);

  const handleCheck = async (item, task) => {
    console.log(item);
    console.log(task);
    const newCheck = item === "Uncomplete" ? "Complete" : "Uncomplete"; // Determine the new value for check
    setCheck(newCheck);
    console.log(newCheck);
    try {
      const response = await axios.put("http://localhost:3550/checkmark", { check: newCheck, task });
      if (response.data.res === "Success") {
        setCheck("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (item, item2) => {
    if (item2 === "Complete") {
      alert("You cannot edit when Task already completed");
    } else {
      setDecision(true);
      toEdit(item);
    }
  };
  const handleDelete = async (item) => {
    toDelete(item);
    try {
      const response = await axios.delete(`http://localhost:3550/tododelete`, { data: { tobedelete: item } });
      if (response.data.res === "Success") {
        toDelete("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const back = () => {
    setDecision(false);
  };
  const finishEdit = async () => {
    console.log(input);
    const regex = /\S/;
    if (regex.test(input)) {
      try {
        console.log(tobeedit);
        console.log(input);
        const response = await axios.put("http://localhost:3550/tobeedited", { tobeedit: tobeedit, input: input });

        if (response.data.res === "Success") {
          setInput("");
        }
      } catch (error) {
        console.log(error);
      }
    }
    setDecision(false);
  };
  const addtodb = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3550/addtotask", { tobedone });
      if (response.data.res === "Success") {
        todoTask("");
        console.log(response.data.res);
      }
    } catch (err) {
      console.log("Error adding task:" + err);
    }
  };
  return (
    <div>
      <div style={{ border: "2px solid black", padding: "20px", marginTop: "20px", marginLeft: "50px", marginRight: "50px" }} className="topmost">
        <h3 className="d-flex justify-content-center">Todo List</h3>
        <br />
        <div className="d-flex justify-content-center">
          <input type="text" name="todo" id="todo" value={tobedone} onChange={(e) => todoTask(e.target.value)} style={{ width: "500px", marginRight: "20px" }} />
          <button className="btn btn-info" onClick={addtodb}>
            Add to Task
          </button>
          {console.log(tobedone)}
          <br />
        </div>
        <div>
          <br />
          {listi.map((iti) => (
            <div className="everydiv d-flex justify-content-center" key={iti._id}>
              <div style={{ width: "650px", border: "2px solid black", backgroundColor: "#FF33AC", padding: "5px", borderRadius: "10px" }}>
                {iti.mark === "Complete" ? <strike>{iti.task}</strike> : iti.task}
                <div className="d-flex justify-content-end">
                  {decision && iti.task === tobeedit ? (
                    <div>
                      <input type="text" style={{ width: "400px", border: "2px solid black", backgroundColor: "white", padding: "5px" }} className="d-inline" value={input} onChange={(e) => setInput(e.target.value)} />
                      <button className="d-inline-block btn btn-info" style={{ marginRight: "10px", marginLeft: "10px" }} onClick={finishEdit}>
                        Finish Edit
                      </button>
                      <button className="btn btn-danger" onClick={back}>
                        Go Back
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id={`flexSwitchCheck-${iti._id}`} checked={iti.mark === "Complete"} onChange={() => handleCheck(iti.mark, iti.task)} />
                        <label className="form-check-label" htmlFor={`flexSwitchCheck-${iti._id}`} style={{ marginRight: iti.mark === "Complete" ? "35px" : "20px", marginLeft: "20px" }}>
                          {iti.mark}
                        </label>
                      </div>
                      <button className="btn btn-info" style={{ marginRight: "10px" }} onClick={() => handleEdit(iti.task, iti.mark)}>
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(iti.task)}>
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Todo;
