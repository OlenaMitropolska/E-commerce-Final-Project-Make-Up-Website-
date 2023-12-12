import { useAppContext } from '../context/appContext'


function ProductsPage() {
    const {products} = useAppContext()

    // function selectProduct(e) {
    //   console.log(e) add as onclick for the div
    // }
  
  return (
    <div className='main'>
      products page

        {/* products display */}
        <div className='main_products'>
{products && products.slice(0, 50).map((product, j) => <div key={j} className='products_presentation'>
   <img src={product.image_link} alt=""/> 
   {/* onError={() => this.img.hide() } onError={this.style.display='none'} */}
<div className='products_presentation_content'>
<h2> {product.name}</h2>
   <p>{product.brand}</p>
   <p>{product.price} &euro;</p>
</div>
<p className='products_presentation_additional'>*Inkl. MwSr. und zzgl.Versand</p>
<button className='btn'><a className="text-2xl"><ion-icon name="bag-outline"></ion-icon></a></button>
     </div>)}
     </div>
     {/* end of products display */}
    
    
    </div>
  )
}

export default ProductsPage