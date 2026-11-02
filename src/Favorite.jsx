
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Trash2 } from 'lucide-react'
import { Navigate } from 'react-router'

const Favorite = () => {

  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" />
  }

  const [favorites, setFavorites] = useState({ id: [] })
  const [data, setData] = useState([])

  const productImages = [
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500",
    "https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=500",
    "https://images.unsplash.com/photo-1494336934272-f0efcedfc8cf?w=500",
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=500",
    "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=500",
    "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=500"
  ]

  useEffect(() => {
    const productFavorites = JSON.parse(localStorage.getItem('favoriteResponse')) || { id: [] }
    setFavorites(productFavorites)
  }, [])

  async function addFavorite() {
    try {
      const token = localStorage.getItem('token')

      const { data } = await axios.get(
        'https://test-swagger-2ph6.onrender.com/products',
        {
          params: {
            page: 1,
            limit: 100
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setData(data.data.filter(el => favorites.id.includes(el.id)))

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (favorites.id.length > 0) {
      addFavorite()
    } else {
      setData([])
    }
  }, [favorites])

  function deleteFavorite(id) {
    const newFavorites = favorites.id.filter(el => el !== id)

    localStorage.setItem(
      'favoriteResponse',
      JSON.stringify({ id: newFavorites })
    )

    setFavorites({ id: newFavorites })
    setData(data.filter(el => el.id !== id))
  }

  return (
    <div className="p-[40px]">

      <h1 className="text-[30px] font-bold mb-[30px]">
        Favorites
      </h1>

      <table className="w-full">

        <thead>
          <tr className="border-b">
            <th className="text-left p-4">Products</th>
            <th className="text-left p-4">Price</th>
            <th className="text-left p-4">Delete</th>
          </tr>
        </thead>

        <tbody>
          {data.map((el, index) => (
            <tr key={el.id} className="border-b">

              <td className="p-4">
                <div className="flex items-center gap-5">
                  <img
                    src={productImages[index % productImages.length]}
                    alt={el.name}
                    className="w-[100px] h-[100px] object-cover"
                  />

                  <span>{el.name}</span>
                </div>
              </td>

              <td className="p-4 text-green-600 font-bold">
                {el.price} {el.currency}
              </td>



              <td className="p-4">
                <Trash2
                  className="cursor-pointer hover:text-red-500 "
                  onClick={() => deleteFavorite(el.id)}
                />
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

export default Favorite
