import React from 'react'
import { useAppContext } from '../context/appContext'

function SelectedProduct() {
  const {selectedProduct} = useAppContext()

  return (
    <div className='selectedProduct'>
      <button>SelectedProduct</button>

<img src={selectedProduct.image_link} alt="" />
<h2 className='font-bold text-xl'>{selectedProduct.name}</h2>
<p>{selectedProduct.brand}</p>
<p className='text-red-900'>{selectedProduct.price} &euro;</p>


<details className="collapse collapse-arrow">
  <summary className="collapse-title text-xl font-medium focus:outline-none focus:ring-2 focus:ring-black">Description</summary>
  <div className="collapse-content"> 
    <p className='pt-2.5'>{selectedProduct.description}</p>
  </div>
</details>


<div className='cartFixed fixed bottom-0 left-0 right-0 flex justify-center'><button className="btn self-center w-11/12 bg-zinc-300">Add to cart</button></div>

    </div>
  )
}

export default SelectedProduct