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
    </div>
  );
};

export default App;
