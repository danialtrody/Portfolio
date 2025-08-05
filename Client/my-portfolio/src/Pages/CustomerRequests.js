import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerRequestCard from "../Components/CustomerRequestCard"; 

// const API_BASE_URL = 'http://localhost:5000';
const API_BASE_URL = "https://portfolio-6-5icm.onrender.com" 

function CustomerRequests() {
  const [customerRequests, setCustomerRequests] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/admin/customerMessages`)
      .then((res) => setCustomerRequests(res.data))
      .catch((err) => console.error("Error fetching:", err));
  }, []);


const deleteRequest = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;

    try {
        await axios.delete(`${API_BASE_URL}/api/admin/customerMessages/${id}`);
        setCustomerRequests(prev => prev.filter(req => req.id !== id));
    } catch (error) {
        console.error("Error deleting request:", error);
    }
};

  return (
    <>
      <h1 className="costumer-reequest-header">Customer Requests</h1>
      <div className="container my-5 costumer-reequest-container d-flex flex-wrap gap-4">
        {customerRequests.length === 0 ? (
          <p>No customer messages found.</p>
        ) : (
          customerRequests.map((request) => (
            <CustomerRequestCard
              key={request.id}
              request={request}
              onDelete={deleteRequest}
            />
          ))
        )}
      </div>
    </>
  );
}

export default CustomerRequests;
