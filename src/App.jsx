import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store"
import Home from "./components/Home"
import CartModal from "./components/modals/CartModal"
import PaymentModal from "./components/modals/PaymentModal"
import CheckoutModal from "./components/modals/CheckoutModal"
import OrderStatusModal from "./components/modals/OrderStatusModal"
import StartPage from "./components/StartPage"

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<StartPage />} />
              <Route path="/:restaurantName" element={<Home />} />
              <Route path="cart" element={<CartModal />} />
              <Route path="payment" element={<PaymentModal />} />
              <Route path="checkout" element={<CheckoutModal />} />
              <Route path="order-status" element={<OrderStatusModal />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App