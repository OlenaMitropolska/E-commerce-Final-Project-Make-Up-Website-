import { useAppContext } from '../context/appContext'


function ProductsPage() {
    const {products, selectProduct} = useAppContext()
  
  
  return (
    <div className='main'>
      products page

        {/* products display */}
        <div className='main_products'>
{products && products.slice(0, 50).map((product, j) => <div onClick={() => selectProduct(product)} key={j} className='products_presentation'>
   <img src={product.image_link} alt="products" onError={(e) => e.target.src = 'https://media.istockphoto.com/id/1038232966/vector/upset-magnifying-glass-vector-illustration.jpg?s=612x612&w=0&k=20&c=cHpDD-xX8wlruAOi-RsTNpaZKtBYtAjP32GpoRGKEmM='}/> 
<div className='products_presentation_content'>
<h2> {product.name}</h2>
   <p>{product.brand}</p>
   <p>{product.price} &euro;</p>
</div>
<p className='products_presentation_additional'>*Inkl. MwSr. und zzgl.Versand</p>
<button className='btn'><a className="text-2xl"><ion-icon name="bag-outline"></ion-icon></a></button>
     </div>
  )
     }
     </div>
     {/* end of products display */}
    
    
    </div>
  )
}

export default ProductsPage