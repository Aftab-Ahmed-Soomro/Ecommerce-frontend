import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import summaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

const App = () => {

  const dispatch = useDispatch();
  const [cartProductCount, setcartProductCount] = useState(0);

  const fetchUserDetails = async() => {
    const dataResponse = await fetch(summaryApi.current_user.url,{
      method : summaryApi.current_user.method,
      credentials : "include"
    })

    const dataApi = await dataResponse.json()

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data))
    }

    // console.log("user-data", dataResponse);
  }

  const fetchUserAddToCart = async() => {
    const dataResponse = await fetch(summaryApi.addToCartProductCount.url,{
      method : summaryApi.addToCartProductCount.method,
      credentials : "include"
    })

    const dataApi = await dataResponse.json()

    console.log("dataApi",dataApi)
    setcartProductCount(dataApi?.data?.count)
  }

  useEffect(()=> {
    // user Details
    fetchUserDetails();

    // user 
    fetchUserAddToCart(); 
  },[])

  return (
    <>
      <Context.Provider value={{
        fetchUserDetails, //user details fetch
        cartProductCount, // current user add to cart product count
        fetchUserAddToCart
      }}>
        <ToastContainer 
         position='top-center'
        />
        <Header />
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  )
}

export default App
