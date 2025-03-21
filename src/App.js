<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [userId, setUserId] = useState(1);
  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState(0);
  const [receiverId, setReceiverId] = useState("");

  useEffect(() => {
    fetchWallet();
  }, [userId]);

  const fetchWallet = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/wallets?userId=${userId}`);
      setWallet(response.data);
    } catch (error) {
      console.error("Error fetching wallet:", error);
    }
  };

  const addMoney = async () => {
    try {
      await axios.post("http://localhost:8083/txns/AddMoney", {
        userId,
        amount: parseFloat(amount),
      });
      fetchWallet();
    } catch (error) {
      console.error("Error adding money:", error);
    }
  };

  const sendMoney = async () => {
    try {
      await axios.post("http://localhost:8083/txns/send", {
        senderUserId: userId,
        receiverUserId: parseInt(receiverId),
        amount: parseFloat(amount),
      });
      fetchWallet();
    } catch (error) {
      console.error("Error sending money:", error);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <h1 style={{ textAlign: "center" }}>Wallet Dashboard</h1>

      <label>User ID:</label>
      <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />

      {wallet && <h2>Wallet Balance: ₹{wallet.balance}</h2>}

      <label>Amount:</label>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />

      <button onClick={addMoney} style={{ backgroundColor: "green", color: "white", padding: "10px", border: "none", cursor: "pointer", width: "100%", marginBottom: "10px" }}>
        Add Money
      </button>

      <label>Receiver User ID:</label>
      <input type="number" value={receiverId} onChange={(e) => setReceiverId(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />

      <button onClick={sendMoney} style={{ backgroundColor: "blue", color: "white", padding: "10px", border: "none", cursor: "pointer", width: "100%" }}>
        Send Money
      </button>
=======

import React, { useState } from "react";

function App() {
  // State for sending money
  const [transaction, setTransaction] = useState({
    senderContact: "",
    receiverContact: "",
    amount: ""
  });

  // State for adding money
  const [addMoneyData, setAddMoneyData] = useState({
    userId: "",
    balance: ""
  });

  // Handle change for send money form
  const handleTransactionChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  // Handle change for add money form
  const handleAddMoneyChange = (e) => {
    setAddMoneyData({ ...addMoneyData, [e.target.name]: e.target.value });
  };

  // Send money API call
  const sendMoney = async () => {
    try {
      const response = await fetch("http://localhost:8083/txns/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          senderContact: parseInt(transaction.senderContact, 10),
          receiverContact: parseInt(transaction.receiverContact, 10),
          amount: parseFloat(transaction.amount)
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.text();
      alert("Transaction Successful: " + result);
    } catch (error) {
      console.error("Error:", error);
      alert("Transaction Failed: " + error.message);
    }
  };

  // Add money API call
  const addMoney = async () => {
    try {
      const response = await fetch("http://localhost:8083/txns/AddMoney", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: parseInt(addMoneyData.userId, 10),
          balance: parseFloat(addMoneyData.balance)
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.text();
      alert("Money Added Successfully: " + result);
    } catch (error) {
      console.error("Error:", error);
      alert("Add Money Failed: " + error.message);
    }
  };

  const containerStyle = {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px"
  };

  const buttonStyle = (bgColor) => ({
    width: "100%",
    padding: "12px",
    backgroundColor: bgColor,
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "20px"
  });

  const sectionStyle = {
    marginBottom: "40px",
    borderBottom: "1px solid #eee",
    paddingBottom: "20px"
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Wallet Dashboard</h1>

      <div style={sectionStyle}>
        <h2 style={{ textAlign: "center", color: "#555" }}>Send Money</h2>
        <input
          type="number"
          name="senderContact"
          placeholder="Sender Contact"
          value={transaction.senderContact}
          onChange={handleTransactionChange}
          style={inputStyle}
          required
        />
        <input
          type="number"
          name="receiverContact"
          placeholder="Receiver Contact"
          value={transaction.receiverContact}
          onChange={handleTransactionChange}
          style={inputStyle}
          required
        />
        <input
          type="number"
          step="0.01"
          name="amount"
          placeholder="Amount"
          value={transaction.amount}
          onChange={handleTransactionChange}
          style={inputStyle}
          required
        />
        <button onClick={sendMoney} style={buttonStyle("blue")}>
          Send Money
        </button>
      </div>

      <div>
        <h2 style={{ textAlign: "center", color: "#555" }}>Add Money</h2>
        <input
          type="number"
          name="userId"
          placeholder="User ID"
          value={addMoneyData.userId}
          onChange={handleAddMoneyChange}
          style={inputStyle}
          required
        />
        <input
          type="number"
          step="0.01"
          name="balance"
          placeholder="Balance"
          value={addMoneyData.balance}
          onChange={handleAddMoneyChange}
          style={inputStyle}
          required
        />
        <button onClick={addMoney} style={buttonStyle("green")}>
          Add Money
        </button>
      </div>
>>>>>>> d3e5b9aba5036d2a1ea2e0ade4c5cb66ee78a866
    </div>
  );
}

export default App;

<<<<<<< HEAD
export default App;
=======
>>>>>>> d3e5b9aba5036d2a1ea2e0ade4c5cb66ee78a866
