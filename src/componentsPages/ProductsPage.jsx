import { useAppContext } from '../context/appContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function ProductsPage() {

    const {products, selectProduct,addCart} = useAppContext()


  
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
  {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button>

<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    
     <ToastContainer />
    </div>
  )
}

export default ProductsPage