
import React from 'react'
import { useLocation, useNavigate } from 'react-router'

const Product = () => {

  const { state: product } = useLocation()
  const navigate = useNavigate()

  if (!product) {
    return <h1>Product not found</h1>
  }

  return (
    <div className="p-[50px]">

      <button
        onClick={() => navigate('/')}
        className="bg-green-500 text-white px-5 py-2 rounded-md mb-8"
      >
        Back
      </button>

      <div className="flex items-start gap-[60px] max-w-[1100px] mx-auto">

        <div className="w-1/2">
          <img
            src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=700"
            alt={product.name}
            className="w-full h-[450px] object-cover rounded-xl"
          />
        </div>

        <div className="w-1/2 flex flex-col gap-[25px]">

          <h1 className="text-[35px] font-bold">
            {product.name}
          </h1>

          <p className="text-green-600 text-[28px] font-bold">
            {product.price} {product.currency}
          </p>

          <p className="text-gray-500 text-[17px]">
            {product.description || 'Beautiful plant for your home.'}
          </p>

          <div>
            <button
            onClick={() => {
              let cartResponse = JSON.parse(
                localStorage.getItem('cartResponse')
              ) || { id: [] }

              cartResponse.id.push(product.id)

              localStorage.setItem(
                'cartResponse',
                JSON.stringify(cartResponse)
              )
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg w-[200px]"
          >
            Add to Cart
          </button>
          
          
          <button
          onClick={()=>{
            let favoriteAdd = JSON.parse(localStorage.getItem('favoriteResponse')|| {id: []})
            
            favoriteAdd.id.push(product.id)

              localStorage.setItem(
                'favoriteResponse',
                JSON.stringify(favoriteAdd)
              )
          }}
          className=" text-green-500 px-8 py-3 rounded-lg w-[200px] border-[green-500] border ml-5"
          >
            Add to Favorite
          </button>
          </div>

        </div>

      </div>


      <div className="max-w-[1100px] mx-auto mt-[60px]">

        <h2 className="text-[28px] font-bold mb-5">
          About this product
        </h2>

        <p className="text-gray-600 text-[17px] leading-8">
          Bring natural beauty and freshness into your home with this
          beautiful plant. Its elegant appearance creates a peaceful
          atmosphere and makes any room feel more comfortable and alive.
          Perfect for decorating your living room, bedroom or office.
          This plant is a wonderful choice for anyone who loves nature
          and wants to make their space more beautiful.
        </p>

      </div>

    </div>
  )
}

export default Product
