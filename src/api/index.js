import axios from "axios"

const API_BASE_URL = "https://api.example.com" // Replace with your actual API base URL

export const fetchFoods = async () => {
  const response = await axios.get(`${API_BASE_URL}/foods`)
  return response.data
}

export const fetchCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/categories`)
  return response.data
}

export const placeOrder = async (orderData) => {
  const response = await axios.post(`${API_BASE_URL}/orders`, orderData)
  return response.data
}

export const getOrderStatus = async (orderId) => {
  const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`)
  return response.data
}

export const processPayment = async (paymentData) => {
  const response = await axios.post(`${API_BASE_URL}/payment`, paymentData)
  return response.data
}

