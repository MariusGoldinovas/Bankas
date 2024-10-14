import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import axios from "axios";

const Accounts = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/account/`);
      const sortedData = response.data.sort((a, b) =>
        a.surname.toLowerCase() > b.surname.toLowerCase() ? 1 : -1
      );
      setData(sortedData);
    } catch (err) {
      console.error("Error fetching accounts:", err);
      setMessage({
        data: "Failed to load accounts",
        status: "danger",
      });
    }
  };

  const handleRemoveAccount = async (id, balance) => {
    if (balance > 0) {
      setMessage({
        data: "Account cannot be deleted balance is not zero",
        status: "danger",
      });
      return;
    }

    try {
      const response = await axios.delete(`${BASE_URL}/api/account/${id}`);
      setMessage({
        data: response.data.message,
        status: "success",
      });
      fetchAccounts();
    } catch (err) {
      console.error("Error removing account:", err);
      setMessage({
        data: "Failed to remove account",
        status: "danger",
      });
    }
  };

  const handleAddMoney = (id) => {
    navigate(`/moneyAdd/${id}`);
  };

  const handleRemoveMoney = (id) => {
    navigate(`/moneyRemove/${id}`);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Accounts List</h1>
      {message && (
        <div className={`alert alert-${message.status}`}>{message.data}</div>
      )}

      {data.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="text-center">
              <tr>
                <th>Name</th>
                <th>Last Name</th>
                <th>Account Number</th>
                <th>Bank Code</th>
                <th>IBAN</th>
                <th>ID Number</th>
                <th>ID Photo</th>
                <th>Balance</th>
                <th>Account Opened</th>
                <th>Last Update</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((account) => (
                <tr key={account._id}>
                  <td>{account.name}</td>
                  <td>{account.surname}</td>
                  <td>{account.accountNumber}</td>
                  <td>{account.bankCode}</td>
                  <td>{account.iban}</td>
                  <td>{account.idNumber}</td>
                  <td>
                    <img
                      src={`${BASE_URL}/photos/${account.idPhoto}`}
                      alt="ID Photo"
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td>{account.money} EUR</td>
                  <td>{new Date(account.createdAt).toLocaleString()}</td>
                  <td>{new Date(account.updatedAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleRemoveAccount(account._id, account.money)
                      }
                      title="Remove account"
                    >
                      <i className="bi bi-trash"> Remove Acc</i>
                    </button>
                    <button
                      className="btn"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleAddMoney(account._id)}
                      title="Add money"
                    >
                      <i className="bi bi-plus-circle"> Add Eur</i>
                    </button>
                    <button
                      className="btn"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRemoveMoney(account._id)}
                      title="Remove money"
                    >
                      <i className="bi bi-dash-circle"> Take out Eur </i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>{message ? message.data : "No accounts available"}</p>
      )}
    </div>
  );
};

export default Accounts;
