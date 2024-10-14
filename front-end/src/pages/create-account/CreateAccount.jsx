import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { generate, validate } from "../../utils/id.js";
import { BASE_URL } from "../../utils/config.js";

const CreateAccount = () => {
  const [message, setMessage] = useState();
  const [idNumber, setIdNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    axios
      .post(`${BASE_URL}/api/account/create`, data)
      .then((resp) => {
        setMessage({
          data: resp.data.message,
          status: "success",
        });
        setTimeout(() => {
          navigate("/account");
        }, 3000);
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.error || "ID number already exists";
        setMessage({
          data: errorMessage,
          status: "danger",
        });
      });
  };

  const handleGenerate = () => {
    const generatedId = generate();
    setIdNumber(generatedId);
  };

  const handleValidate = () => {
    const result = validate(idNumber);
    if (result.isValid) {
      setMessage({ data: "ID number is valid", status: "success" });
    } else {
      setMessage({
        data: result.error || "Invalid ID number",
        status: "danger",
      });
    }
  };

  return (
    <div className="container w-50">
      <h1>Add new account</h1>
      {message && (
        <div className={"alert alert-" + message.status}>{message.data}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name">Enter name</label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="surname">Enter surname</label>
          <input
            name="surname"
            type="text"
            placeholder="Your surname"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="">Upload copy of ID or passport</label>
          <input type="file" name="idPhoto" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="idNumber">Enter national ID number</label>
          <div className="row gap-5">
            <div className="col-md-4">
              <input
                name="idNumber"
                type="number"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                placeholder="Enter 11 numbers"
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <button
                type="button"
                className="btn btn-org w-100"
                onClick={handleGenerate}
              >
                Generate ID
              </button>
            </div>
            <div className="col-md-3">
              <button
                type="button"
                className="btn btn-org w-100"
                onClick={handleValidate}
              >
                Validate ID
              </button>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="money">
            Enter amount of money to take in account
          </label>
          <input
            type="number"
            name="money"
            defaultValue={0}
            className="form-control"
          />
        </div>
        <button className="btn btn-org ">Submit</button>
      </form>
    </div>
  );
};

export default CreateAccount;
