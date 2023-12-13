import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'


function SelectedProduct() {
  const {selectedProduct,addCart} = useAppContext()

  return (
    <div className='selectedProduct'>
      {selectedProduct && selectedProduct.map(selectedP => 
<>

<img src={selectedP.image_link} onError={(e) => e.target.src = 'https://media.istockphoto.com/id/1038232966/vector/upset-magnifying-glass-vector-illustration.jpg?s=612x612&w=0&k=20&c=cHpDD-xX8wlruAOi-RsTNpaZKtBYtAjP32GpoRGKEmM='} alt="photo" />
<div className='productText'>
<p className='uppercase'>{selectedP.brand}</p>  
<h2 className='font-bold text-xl uppercase'>{selectedP.name}</h2>
<p className='text-red-900 font-bold text-lg pricep'>{selectedP.price} &euro;</p>
<div className='cartFixed fixed bottom-0 left-0 right-0 flex justify-center'><button onClick={() => addCart(selectedP)} className="btn self-center w-11/12 bg-zinc-300 cartFixedbtn">Add to cart</button></div>
</div>

<details className="collapse collapse-arrow collapsehide">
  <summary className="collapse-title text-xl font-medium focus:outline-none focus:ring-2 focus:ring-black">Description</summary>
  <div className="collapse-content"> 
    <p className='pt-2.5'>{selectedP.description}</p>
  </div>
</details>

<div className='tabletDetails'>
  <h3>Description</h3>
  <p>{selectedP.description}</p>
</div> 
</>
        )}


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
      <Link to={"/cart"} className='btn'><button className="btn px-8">Go to Cart</button></Link> 
    </div>
  </div>
</dialog>
{/* end of modal */}


    </div>
  )
}

export default SelectedProduct