import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayPKRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const HorizontalCardProduct = ({category, heading}) => {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const loadingList = new Array(13).fill(null);
    const scrollElement = useRef();

    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async(e,id) => {
      await addToCart(e,id) 
      await fetchUserAddToCart()
    }

    const fetchData = async() => {
      try {
        setLoading(true);
        setError(null);
        const categoryProduct = await fetchCategoryWiseProduct(category);
        setLoading(false);

        console.log("Horizontal Data",categoryProduct?.data);
        
        if (categoryProduct?.success) {
          setData(categoryProduct?.data || []);
        } else {
          setError(categoryProduct?.message || "Failed to fetch products");
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
        setError("Failed to load products");
        setData([]);
        setLoading(false);
      }
    }

    useEffect(()=> {
      fetchData()
    },[])

    const scrollRight = () => {
      scrollElement.current.scrollLeft += 300
    }

    const scrollLeft = () => {
      scrollElement.current.scrollLeft -= 300
    }

    // Ensure data is always an array
    const safeData = Array.isArray(data) ? data : [];

  return (
    <div className='container mx-auto px-4 my-6 relative'>

        <h2 className='text-2xl font-semibold pb-4'>{heading}</h2>

        {error && (
          <p className='text-red-600 text-center py-4'>{error}</p>
        )}

        <div ref={scrollElement} className='flex items-center gap-4 md:gap-6 overflow-scroll scrollBar-none transition-all'>
          <button onClick={scrollLeft} className='bg-white shadow-md rounded-full p-1 cursor-pointer absolute left-0 text-lg hidden md:block'>
              <FaAngleLeft />
          </button>
          <button onClick={scrollRight} className='bg-white shadow-md rounded-full p-1 cursor-pointer absolute right-0 text-lg hidden md:block'>
              <FaAngleRight />
          </button>
          {
            loading ? (
              loadingList.map((product,index)=> {
                return (
                  <div key={index} className='w-full min-w-[300px] md:min-w-[340px] max-w-[300px] md:max-w-[340px] h-36 bg-white rounded-sm shadow flex'>
                    <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
                        {/* <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all cursor-pointer mix-blend-multiply' /> */}
                    </div>
                    <div className='p-4 grid w-full gap-2'>
                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                        <p className='capitalize text-slate-500 bg-slate-200 animate-pulse p-1 rounded-full'></p>
                        <div className='flex gap-3 w-full'>
                          <p className='text-red-600 font-medium bg-slate-200 w-full animate-pulse p-1 rounded-full'></p>
                          <p className='text-slate-500 line-through bg-slate-200 w-full animate-pulse p-1 rounded-full'></p>
                        </div>
                        <button className='text-sm text-white px-3 py-0.5 w-full bg-slate-200 animate-pulse rounded-full'></button>
                    </div>
                  </div>
                )
              })
            ) : (
              safeData.map((product,index)=> {
                return (
                  <Link key={product?._id || index} to={"/product/"+product?._id} className='w-full min-w-[300px] md:min-w-[340px] max-w-[300px] md:max-w-[340px] h-36 bg-white rounded-sm shadow flex'>
                    <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                        <img src={product?.productImage?.[0]} className='object-scale-down h-full hover:scale-110 transition-all cursor-pointer mix-blend-multiply' />
                    </div>
                    <div className='p-4 grid'>
                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                        <p className='capitalize text-slate-500'>{product?.category}</p>
                        <div className='flex gap-3'>
                          <p className='text-red-600 font-medium'>{displayPKRCurrency(product?.sellingPrice)}</p>
                          <p className='text-slate-500 line-through'>{displayPKRCurrency(product?.price)}</p>
                        </div>
                        <button onClick={(e)=>handleAddToCart(e,product?._id)} className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full cursor-pointer'>Add To Cart</button>
                    </div>
                  </Link>
                )
              })
            )
          }
        </div>

    </div>
  )
}

export default HorizontalCardProduct
