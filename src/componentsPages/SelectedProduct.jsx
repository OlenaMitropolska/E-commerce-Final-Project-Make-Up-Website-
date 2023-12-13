import React from 'react'
import { useAppContext } from '../context/appContext'

function SelectedProduct() {
  const {selectedProduct} = useAppContext()



  return (
    <div className='selectedProduct'>

<img src={selectedProduct.image_link} onError={(e) => e.target.src = 'https://media.istockphoto.com/id/1038232966/vector/upset-magnifying-glass-vector-illustration.jpg?s=612x612&w=0&k=20&c=cHpDD-xX8wlruAOi-RsTNpaZKtBYtAjP32GpoRGKEmM='} alt="photo" />
<div className='productText'>
<p className='uppercase'>{selectedProduct.brand}</p>  
<h2 className='font-bold text-xl uppercase'>{selectedProduct.name}</h2>
<p className='text-red-900 font-bold text-lg pricep'>{selectedProduct.price} &euro;</p>
<div className='cartFixed fixed bottom-0 left-0 right-0 flex justify-center'><button className="btn self-center w-11/12 bg-zinc-300 cartFixedbtn">Add to cart</button></div>
</div>


<details className="collapse collapse-arrow collapsehide">
  <summary className="collapse-title text-xl font-medium focus:outline-none focus:ring-2 focus:ring-black">Description</summary>
  <div className="collapse-content"> 
    <p className='pt-2.5'>{selectedProduct.description}</p>
  </div>
</details>

<div className='tabletDetails'>
  <h3>Description</h3>
  <p>{selectedProduct.description}</p>
</div>


    </div>
  )
}

export default SelectedProduct