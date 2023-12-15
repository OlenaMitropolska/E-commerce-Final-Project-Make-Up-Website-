import React, { useEffect} from 'react'
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'



function Cart() {
  const {cartProduct, increaseCart,decreaseCart,removeFromCart, displayCart} = useAppContext()
  useEffect(() => {
    displayCart ()
  }, [])

  return (
    <div className='mainCart'>
      <button onClick={displayCart }>Display Info</button>
      {/* <button onClick={getCartInfo} className='btn'>get Cart Info</button> */}
      {/* <button className='btn' onClick={saveCart }>save cart </button> */}
      
<h2 className='uppercase self-start'>Your shopping cart</h2>
      {cartProduct.length > 0 && cartProduct.map (cartP =>
       <div className="productInCart p-4">
 <div className='h-full w-1/4 flex cartProductPhoto'><img src={cartP.image_link} alt="product" onError={(e) => e.target.src = 'https://media.istockphoto.com/id/1038232966/vector/upset-magnifying-glass-vector-illustration.jpg?s=612x612&w=0&k=20&c=cHpDD-xX8wlruAOi-RsTNpaZKtBYtAjP32GpoRGKEmM='} /></div>
 
 <div className="cartProductText h-full w-3/4 pl-4 flex flex-col gap-1.5"> 
 <p className='text-lg'>{cartP.name}</p>
 <p>{cartP.brand}</p>
 
 <div className="priceCart self-start">
   <button onClick={() => decreaseCart(cartP)} className='border border-solid border-black text-2xl px-3.5 rounded'>-</button>
   <div className='self-center p-3.5'>{cartP.quantity}</div>
   <button onClick={() => increaseCart(cartP)} className='border border-solid border-black text-2xl px-3.5 rounded'>+</button>

 </div>

 <p className='text-lg'>Price pro item: {cartP.price}0 &euro;</p>
 <p onClick={() => removeFromCart(cartP)} className='underline'>X Remove</p>
 </div>
 </div>


      )}

       {/* tablet version */}
       <div className='cartTablet w-full'>
       {cartProduct && cartProduct.map (cartP =>
        <div className="overflow-x-auto">
        <table className="table table-lg">
          <thead>
            <tr className='text-xl'>
              <th>item</th> 
              <th>Price</th> 
              <th>Quantity</th> 
              <th>Subtotal</th> 
            </tr>
          </thead> 
          <tbody>
            <tr>
              <td><div className='tabletItemCard'>
              <img src={cartP.image_link} alt="product" />
              <p>{cartP.name} <br /> {cartP.brand}</p>
                </div>
                </td> 
              <td>{cartP.price}0 &euro;</td> 
              <td>
              <div className="priceCart self-start">
              <button onClick={() => decreaseCart(cartP)} className='border border-solid border-black text-2xl px-3.5 rounded'>-</button>
              <div className='self-center p-3.5'>{cartP.quantity}</div>
              <button onClick={() => increaseCart(cartP)} className='border border-solid border-black text-2xl px-3.5 rounded'>+</button>
            </div>
                </td> 
              <td>{cartProduct.reduce((acc, cur) => (acc += cur.quantity * Number(cur.price)),0).toFixed(2)} &euro;</td> 
            </tr>
          </tbody> 
        </table>
      </div>
        )}
</div>
{/* end */}

<p className='totalCart text-lg'> Total: {cartProduct.reduce((acc, cur) => (acc += cur.quantity * Number(cur.price)),0).toFixed(2)} &euro;</p>
<Link className='btnCartHolder' to={"/purchase"}><button className='btn w-full btnCart'>Purchase</button></Link>

   

   
    </div>
  )
}

export default Cart