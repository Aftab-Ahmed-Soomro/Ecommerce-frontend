import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import summaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = async() => {
    const response = await fetch(summaryApi.allProduct.url);
    const dataResponse = await response.json();

    console.log("data response", dataResponse);

    setAllProducts(dataResponse?.data || []);
  }

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className='font-bold text-lg'>
          All Products  
        </h2>
        <button onClick={()=>setOpenUploadProduct(true)} className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full cursor-pointer'>
          Upload Product
        </button>
      </div>

      {/* all products */}
      <div className='flex flex-wrap items-center gap-5 py-4 overflow-y-scroll h-[calc(100vh-190px)] scrollbar-custom'>
        {
          allProducts.map((product,index) => {
            return (
              <AdminProductCard data={product} key={index + "allProduct"} fetchData ={fetchAllProducts} />
            )
          })
        }
      </div>

      {/* Upload Product Component */}
      {
        openUploadProduct && (
          <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProducts}/>
        )
      } 
    </div>
  )
}

export default AllProducts
