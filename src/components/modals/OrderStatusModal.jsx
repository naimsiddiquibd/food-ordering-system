"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { updateOrderStatus } from "../../store/slices/orderSlice"
import { getOrderStatus } from "../../api"

const OrderStatusModal = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { orderId, status } = useSelector((state) => state.order)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkOrderStatus = async () => {
      if (!orderId) {
        navigate("/")
        return
      }

      try {
        const orderStatus = await getOrderStatus(orderId)
        dispatch(updateOrderStatus(orderStatus))
        setIsLoading(false)

        if (orderStatus !== "completed") {
          // Check status again after 10 seconds
          setTimeout(checkOrderStatus, 10000)
        }
      } catch (error) {
        console.error("Error fetching order status:", error)
        setIsLoading(false)
      }
    }

    checkOrderStatus()
  }, [orderId, dispatch, navigate])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6">
          <p>Loading order status...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Order Status</h2>
        <p className="mb-4">Order ID: {orderId}</p>
        <p className="mb-4">Status: {status}</p>
        {status === "completed" ? (
          <p>Your order has been completed. Enjoy your meal!</p>
        ) : (
          <p>We're preparing your order. Please wait...</p>
        )}
        <button
          onClick={() => navigate("/")}
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default OrderStatusModal

