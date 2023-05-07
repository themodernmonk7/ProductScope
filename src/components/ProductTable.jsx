import { useEffect, useState } from "react"
import {LineChart, PieChart} from '../components'
const API_URL = "https://dummyjson.com/products/search?q=phone";

const ProductTable = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [stocks, setStocks] = useState([])
  const [categories, setCategories] =useState([])
  const [productTitle, setProductTitle] = useState([])

  // Fetch product data
  const fetchProducts  = async(url) => {
    setLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      const {products} = data
      const stockData = products.map((product) => product.stock)
      const categoryData = products.map((product) => product.category )
      const productTitleData = products.map((product) => product.title )
      setLoading(false)
      setProducts(products)
      setStocks(stockData)
      setCategories(categoryData)
      setProductTitle(productTitleData)
    } catch (error) {
      console.log(error);
      setLoading(false)
      setError(true)
    }
  }
  useEffect(() => {
    fetchProducts(API_URL)
  }, [])

  if(loading) return <p className=" text-center text-3xl grid place-items-center h-screen font-bold uppercase " >loading...</p>
  if(error) return <p className=" px-5 text-center text-3xl grid place-items-center h-screen font-bold uppercase text-red-500 " >There is an Error, Please try again letter</p>
    
  return (
    <>
    <section className=" container mx-auto mt-10 ">
    <table className=" table-fixed border-collapse border border-slate-500 ">
  <thead>
    <tr className=' bg-gray-200 ' >
          <th className="border border-slate-600 w-36" >ID</th>
          <th className="border border-slate-600 w-36" >Title</th>
          <th className="border border-slate-600 w-1/4 " >Description</th>
          <th className="border border-slate-600 w-36" >Price</th>
          <th className="border border-slate-600 w-36 " >Discount Percentage</th>
          <th className="border border-slate-600 w-36" >Rating</th>
          <th className="border border-slate-600 w-36" >Stock</th>
          <th className="border border-slate-600 w-36" >Brand</th>
          <th className="border border-slate-600 w-36 " >Category</th>
    </tr>
  </thead>
  <tbody>
  {products.map((product) => {
const {id, brand, category, description, discountPercentage,  price, rating, stock, title} = product
    return(
      <tr key={product.id}>
            <td className="border border-slate-600 text-center py-2 " >{id}</td>
            <td className="border border-slate-600 text-center py-2 " >{title}</td>
            <td className="border border-slate-600 text-center py-2 px-5 " >{description}</td>
            <td className="border border-slate-600 text-center py-2  " >{price}</td>
            <td className="border border-slate-600 text-center py-2 " >{discountPercentage}</td>
            <td className="border border-slate-600 text-center py-2 " >{rating}</td>
            <td className="border border-slate-600 text-center py-2 " >{stock}</td>
            <td className="border border-slate-600 text-center py-2 " >{brand}</td>
            <td className="border border-slate-600 text-center py-2 " >{category}</td>
          </tr>
    )
  })
  }
      </tbody>
</table>
</section>
<section className=" container mx-auto flex flex-col md:flex-row justify-between items-start my-10 space-y-10 md:space-y-0 ">
  <LineChart stocks={stocks} productTitle={productTitle} />
  <PieChart categories={categories} stocks={stocks}/>
</section>

    </>
  )
}

export default ProductTable