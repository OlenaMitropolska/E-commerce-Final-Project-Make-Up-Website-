import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'

function ProductsPage() {

    const {products, selectProduct,addCart, saveCart} = useAppContext()


  
  return (
    <div className='main'>
      products page

        {/* products display */}
        <div className='main_products'>
{products && products.slice(0, 50).map((product, j) => <div key={j} className='products_presentation'>
   <img onClick={() => selectProduct(product)}  src={product.image_link} alt="products" onError={(e) => e.target.src = 'https://media.istockphoto.com/id/1038232966/vector/upset-magnifying-glass-vector-illustration.jpg?s=612x612&w=0&k=20&c=cHpDD-xX8wlruAOi-RsTNpaZKtBYtAjP32GpoRGKEmM='}/> 
<div onClick={() => selectProduct(product)} className='products_presentation_content'>
<h2> {product.name}</h2>
   <p>{product.brand}</p>
   <p>{product.price} &euro;</p>
</div>
<p className='products_presentation_additional'>*Inkl. MwSr. und zzgl.Versand</p>
<button id='cartAddBtn' onClick={() => addCart(product)} className='btn'><a className="text-2xl"><ion-icon name="bag-outline"></ion-icon></a></button>
     </div>
  )
     }
     </div>
     {/* end of products display */}
  


  {/* modal */}
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Success!</h3>
    <p className="py-4">The item has been to the cart</p>
    <div className="modal-action flex justify-between">
      <form method="dialog">
        {/* to close the modal */}
        <button className="btn">Continue Shopping</button>
      </form>
      <Link to={"/cart"} onClick={saveCart} className='btn'><button className="btn px-8">Go to Cart</button></Link> 
    </div>
  </div>
</dialog>
{/* end of modal */}
    
    </div>
  )
}

export default ProductsPage