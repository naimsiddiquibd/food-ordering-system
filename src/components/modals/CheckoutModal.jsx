"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { setUserInfo } from "../../store/slices/userSlice"
import { setOrder } from "../../store/slices/orderSlice"
import { clearCart } from "../../store/slices/cartSlice"
import { placeOrder } from "../../api"

const CheckoutModal = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { items, totalPrice } = useSelector((state) => state.cart)
  const user = useSelector((state) => state.user)

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)

  const handlePlaceOrder = async () => {
    if (!name || !email || !phone) {
      alert("Please fill in all fields")
      return
    }

    dispatch(setUserInfo({ name, email, phone }))

    try {
      const orderData = {
        items,
        totalPrice,
        user: { name, email, phone },
      }

      const response = await placeOrder(orderData)
      dispatch(setOrder({ orderId: response.orderId, status: "pending" }))
      dispatch(clearCart())
      navigate("/order-status")
    } catch (error) {
      console.error("Order placement error:", error)
      alert("An error occurred while placing your order. Please try again.")
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-2">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Order Summary:</h3>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="font-semibold mt-2">Total: ${totalPrice.toFixed(2)}</div>
          </div>
          <button onClick={handlePlaceOrder} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Place Your Order
          </button>
        </form>
        <button
          onClick={() => navigate("/payment")}
          className="w-full mt-2 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
        >
          Back to Payment
        </button>
      </div>
    </div>
  )
}

export default CheckoutModal

