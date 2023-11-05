import ProductCard from '@/components/ProductCard/ProductCard'

export async function fetchProduct(){
  const res = await fetch('http://localhost:3000/api/product', {cache: 'no-store'})
  return res.json()
}


export default async function Home() {
  const products = await fetchProduct()

  return (
   <main>
    homePage
    {products?.length > 0 && <h2 className='text-center'>Johnnies</h2>}
      {products?.length > 0 
      ? products.map((product) => (
        <ProductCard  key={product._id} product={product} />
      )) : <h3>Loading.......</h3>
      }
   </main>
  )
}
