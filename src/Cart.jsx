
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router'

const Cart = () => {

   const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" />
  }

  const [cart, setCart] = useState([])

  const [name, setName] = useState('')
  const [card, setCard] = useState('')
  const [date, setDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [showReceipt, setShowReceipt] = useState(false)

  const api = 'https://test-swagger-2ph6.onrender.com/products'

  async function getCart() {
    try {
      const cartResponse = JSON.parse(localStorage.getItem('cartResponse')) || { id: [] }

      const token = localStorage.getItem('token')

      const { data } = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const newCart = data.data.filter((item) =>
        cartResponse.id.includes(item.id)
      )

      setCart(newCart)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCart()
  }, [])

  const deleteProduct = (id) => {
    const newCart = cart.filter((item) => item.id !== id)

    setCart(newCart)

    const cartResponse = JSON.parse(localStorage.getItem('cartResponse')) || { id: [] }

    cartResponse.id = cartResponse.id.filter((item) => item !== id)

    localStorage.setItem('cartResponse', JSON.stringify(cartResponse))
  }


  const buyProducts = (e) => {
    e.preventDefault()

    localStorage.removeItem('cartResponse')

    setName('')
    setCard('')
    setDate('')
    setCvv('')
    setShowReceipt(true)
  }


return (
  <div className="min-h-screen bg-green-50 py-12 px-5">

    <h1 className="text-3xl font-bold text-green-900 text-center mb-10">
      My Shopping Cart
    </h1>

    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

      <div className="bg-white p-8 rounded-2xl shadow-md h-fit">

        <h2 className="text-2xl font-bold text-green-800 mb-6">
          Payment Details
        </h2>

        <form onSubmit={buyProducts} className="flex flex-col gap-5">

          <input
            type="text"
            placeholder="Card holder name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-green-200 rounded-xl p-4 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />

          <input
            type="text"
            placeholder="Card number"
            value={card}
            onChange={(e) => setCard(e.target.value)}
            className="w-full border border-green-200 rounded-xl p-4 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />

          <div className="flex gap-4">

            <input
              type="text"
              placeholder="MM/YY"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-1/2 border border-green-200 rounded-xl p-4 outline-none focus:border-green-600"
            />

            <input
              type="password"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="w-1/2 border border-green-200 rounded-xl p-4 outline-none focus:border-green-600"
            />

          </div>

          <div className="border-t border-green-100 pt-5 mt-3">
            <div className="flex justify-between text-lg font-semibold text-green-900 mb-5">
            
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-xl transition duration-300 shadow-md"
            >
              Buy Now
            </button>
          </div>

        </form>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">

        <h2 className="text-2xl font-bold text-green-800 mb-6">
          Your Products
        </h2>

        <div className="flex flex-col gap-4">

{
            cart.map((item) => (

              <div
                key={item.id}
                className="flex items-center gap-4 border border-green-100 p-4 rounded-xl hover:shadow-md transition"
              >

                <div className="flex-1">
                  <h3 className="font-bold text-green-900 text-lg">
                    {item.name}
                  </h3>

                  <p className="text-green-700 font-semibold mt-2">
                    {item.price} {item.currency}
                  </p>

                  <button
                    onClick={() => deleteProduct(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm mt-2 font-medium"
                  >
                    Remove
                  </button>
                </div>

              </div>

            ))}

        </div>

      </div>

    </div>

            {showReceipt && (

  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-5 z-50">

    <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl">

      <div className="text-center border-b border-green-200 pb-5">

        <div className="text-5xl mb-3">
          🎉
        </div>

        <h2 className="text-2xl font-bold text-green-700">
          Спасибо за покупку!
        </h2>

        <p className="text-gray-400 mt-2">
          Your order has been completed
        </p>

      </div>

      <div className="py-5">

        <h3 className="font-bold text-green-900 text-lg mb-4">
          Ваш чек
        </h3>

        <div className="flex flex-col gap-4">

          {cart.map((item) => (

            <div key={item.id} className="flex justify-between gap-3">

              <span className="text-gray-600">
                {item.name}
              </span>

              <span className="font-semibold text-green-700">
                {item.price} {item.currency}
              </span>

            </div>

          ))}

        </div>

        <div className="border-t border-green-200 mt-5 pt-5 flex justify-between">

          <span className="font-bold text-lg">
            Total:
          </span>

          <span className="font-bold text-xl text-green-700">
  {cart.reduce((sum, item) => sum + Number(item.price), 0)} {cart[0]?.currency}
</span>

        </div>

      </div>
<button
  onClick={() => {
    setShowReceipt(false)

    setCart([])
    localStorage.removeItem('cartResponse')

    setName('')
    setCard('')
    setDate('')
    setCvv('')
  }}
  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition"
>
  Закрыть
</button>

    </div>

  </div>

)}

  </div>
)

}

export default Cart