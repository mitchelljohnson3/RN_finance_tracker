import axios from "axios";
const testing = true;
const base_url = testing ? "http://localhost:2000" : "https://testing/url";

const submitTransaction = async (data) => {
  const res = await axios.post(`${base_url}/transaction/new`, data);
  return res;
};

const deleteTransaction = async (data) => {
  const res = await axios.post(`${base_url}/transaction/delete`, data);
  return res;
};

const fetchTransactions = async (query) => {
  const res = await axios.post(`${base_url}/transaction/fetch`, query);
  return res.data;
};

const fetchSummary = async (query) => {
  const { data } = await axios.post(`${base_url}/transaction/summary`, query);
  for (let i = 0; i < data.expense.length; i++) {
    data.expense[i].date = new Date(data.expense[i].date);
  }
  for (let i = 0; i < data.income.length; i++) {
    data.income[i].date = new Date(data.income[i].date);
  }
  return data;
};

// returns the current theme from the database
const fetchTheme = async () => {
  const res = await axios.get(`${base_url}/theme/fetch`);
  return res.data;
};

// updates the current theme on the database
const saveTheme = async (data) => {
  const res = await axios.post(`${base_url}/theme/update`, data);
  return res;
};

export {
  submitTransaction,
  deleteTransaction,
  fetchTransactions,
  fetchSummary,
  fetchTheme,
  saveTheme,
};
