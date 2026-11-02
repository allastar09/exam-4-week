import React, { useEffect, useState } from 'react'
import rastenie from './assets/rastenie.png'
import axios from 'axios'
import { Heart, ShoppingCart } from 'lucide-react'
import { useNavigate } from 'react-router'

const Home = () => {

  const navigate = useNavigate()

  const productImages = [
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500",
    "https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=500",
    "https://images.unsplash.com/photo-1494336934272-f0efcedfc8cf?w=500",
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=500",
    "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=500",
    "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=500"
  ]

  const [catalogs, setCatalogs] = useState([])
  const [price, setPrice] = useState(0)
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const api = 'https://test-swagger-2ph6.onrender.com/catalogs'
  const apiProduct = 'https://test-swagger-2ph6.onrender.com/products'

  async function categories() {
    try {
      const { data } = await axios.get(api)
      setCatalogs(data)
    } catch (error) {
      console.error('problem with categories', error)
    }
  }

  async function getProducts() {
    try {
      const token = localStorage.getItem('token')

      const { data } = await axios.get(apiProduct, {
        params: {
          page: page,
          limit: 8,
          ...(selectedCategory && {
            catalogId: selectedCategory
          })
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setProducts(data.data)
      setTotalPages(data.totalPages)

    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  useEffect(() => {
    categories()
  }, [])

  useEffect(() => {
    getProducts()
  }, [page, selectedCategory])

  async function addFavorite(productId) {
    try {
      let favoriteResponse = JSON.parse(localStorage.getItem('favoriteResponse')) || { id: [] }

      favoriteResponse.id.push(productId)

      localStorage.setItem('favoriteResponse',JSON.stringify(favoriteResponse))

    } catch (error) {
      console.log('Error adding favorite:', error)
    }
  }

  async function addCart(productId) {
    try {
      let cartResponse = JSON.parse(localStorage.getItem('cartResponse')) || { id: [] }

      cartResponse.id.push(productId)

      localStorage.setItem('cartResponse', JSON.stringify(cartResponse))

    } catch (error) {
      console.log('Error adding cart:', error)
    }
  }

  return (
    <div>

      <div className='flex justify-evenly items-center p-[40px]'>
        <div className='flex flex-col gap-[30px]'>
          <h1 className='text-[70px] font-bold w-[530px]'>
            Let’s Make a Better
            <span className="text-green-500"> Planet</span>
          </h1>

          <button className="bg-green-500 text-white px-4 py-2 rounded-md w-[150px]">
            Shop now
          </button>
        </div>

        <div>
          <img src={rastenie} alt="Rastenie" />
        </div>
      </div>

      <div className='flex items-start gap-[50px] p-[40px]'>

        <div className='w-[310px] min-h-[774px] bg-[#FBFBFB] shrink-0'>

          <h2 className='text-[24px] font-bold p-[40px]'>
            Catalog
          </h2>

          <div className='flex flex-col gap-[20px] px-[40px] pb-[30px]'>

            <p
              onClick={() => {
                setSelectedCategory(null)
                setPage(1)
              }}
              className={`cursor-pointer hover:text-green-500 ${
                selectedCategory === null
                  ? 'text-green-500 font-bold'
                  : ''
              }`}
            >
              Все товары
            </p>

            {catalogs.map((elem) => (
              <p
                key={elem.id}
                onClick={() => {
                  setSelectedCategory(elem.id)
                  setPage(1)
                }}
                className={`cursor-pointer hover:text-green-500 ${
                  selectedCategory === elem.id
                    ? 'text-green-500 font-bold'
                    : ''
                }`}
              >
                {elem.name}
              </p>
            ))}

            <div>
              <input
                type="range"
                className='w-full accent-green-500 cursor-pointer'
                min="0"
                max="1000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <div className='flex justify-between'>
                <span className='text-green-500'>{price}$</span>
                <span className='text-green-500'>1000$</span>
              </div>
            </div>

          </div>
        </div>

        <div className='flex-1'>

          <div className='grid grid-cols-3 gap-[30px]'>

            {products.map((el, index) => (
              <div
                key={el.id}
                onClick={() => navigate(`/product/${el.id}`, { state: el })}
                className='w-[258px] min-h-[300px] flex flex-col gap-[15px] p-[15px] hover:shadow-lg transition cursor-pointer'
              >

                <img
                  src={productImages[index % productImages.length]}
                  alt={el.name}
                  className='w-[200px] h-[200px] object-cover'
                />

                <h2 className='font-semibold'>
                  {el.name}
                </h2>

                <p className='text-green-600 font-bold'>
                  {el.price} {el.currency}
                </p>

                <div className='flex items-center justify-between mt-auto'>

                  <Heart
                    size={25}
                    className='cursor-pointer hover:text-green-500'
                    onClick={(e) => {
                      e.stopPropagation()
                      addFavorite(el.id)
                    }}
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      addCart(el.id)
                    }}
                    className='bg-green-500 text-white p-2 rounded-md hover:bg-green-600'
                  >
                    <ShoppingCart size={22} />
                  </button>

                </div>

              </div>
            ))}

          </div>

          <div className='flex gap-5 justify-center p-10'>

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className='bg-green-500 text-white px-5 py-2 rounded disabled:opacity-40'
            >
              Prev
            </button>

            <span className='text-xl font-bold'>
              {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className='bg-green-500 text-white px-5 py-2 rounded disabled:opacity-40'
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Home