import React from 'react'
import { useAppContext } from '../context/appContext'



function Cart() {
  const {cartProduct} = useAppContext()

  return (
    <div className='mainCart'>
      
<h2 className='uppercase self-start'>Your shopping cart</h2>
      {cartProduct.length > 0 && cartProduct.map (cartP =>
       <div className="productInCart p-4">
 <div className='h-full w-1/4 flex cartProductPhoto'><img src={cartP.image_link} alt="product" /></div>
 
 <div className="cartProductText h-full w-3/4 pl-4 flex flex-col gap-1.5"> 
 <p className='text-lg'>{cartP.name}</p>
 <p>{cartP.brand}</p>
 
 <div className="priceCart self-start">
   <button className='border border-solid border-black text-2xl px-3.5 rounded'>-</button>
   <div className='self-center p-3.5'>1</div>
   <button className='border border-solid border-black text-2xl px-3.5 rounded'>+</button>
 </div>
 <p>Subtotal: </p>
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
              <td>{cartP.price}</td> 
              <td>
              <div className="priceCart self-start">
              <button className='border border-solid border-black text-2xl px-3.5 rounded'>-</button>
              <div className='self-center p-3.5'>1</div>
              <button className='border border-solid border-black text-2xl px-3.5 rounded'>+</button>
            </div>
                </td> 
              <td>Price for items</td> 
            </tr>
          </tbody> 
        </table>
      </div>
        )}
</div>
{/* end */}

<p className='totalCart'>Total: </p>
<button className='btn w-full btnCart'>Purchase</button>

   

   
    </div>
  )
}

export default Cart