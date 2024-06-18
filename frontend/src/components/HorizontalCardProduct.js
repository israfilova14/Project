import React, { useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayCurrency from '../helpers/displayCurrency'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const HorizontalCardProduct = ({category, heading}) => {
    const [data, setData] = useState([])
    const[loading, setLoading] = useState(false)
    const loadingList = new Array(24).fill(null)
    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()
    const fetchData = async() => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        console.log("horizontal data", categoryProduct.data);
        setData(categoryProduct?.data)
    }
    useEffect(() => {
        fetchData()
    },[])
    const scrollRight = () => {
        scrollElement.current.scrollLeft +=320
    }
    const scrollLeft = () => {
        scrollElement.current.scrollLeft -=320
    }
    
  return (
    <div className='container mx-auto px-4 my-4 relative'>
        <h2 className='text-xl font-medium py-4'>{heading}</h2>
        <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
            <button className='bg-white shadow-md rounded-full p-1 absolute left-0 hidden md:block' onClick={scrollLeft}>
                <FaAngleLeft/>
            </button>
            <button className='bg-white shadow-md rounded-full p-1 absolute right-0 hidden md:block' onClick={scrollRight}>
                <FaAngleRight/>
            </button>
        {
            data.map((product, index) => {
            return(
                <div className='w-full min-w-[300px] md:min-w-[340px]  max-w-[300px] md:max-w-[340px] h-36 bg-white rounded-sm shadow-md flex'>
                    <div className='bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px]'>
                       <img src={product?.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all'/>
                    </div>
                    <div className='p-1 flex-cols items-center justify-center'>
                        <div className='p-3 font-medium text-ellipsis grid'> 
                            <h2>{product?.productName}</h2>
                            <p className='capitalize text-slate-400'>{product.category}</p>
                        </div>
                        <div className='flex gap-3'>
                            <p className='text-orange-500 font-medium'>{ displayCurrency( product?.sellingPrice)}</p>
                            <p className='text-slate-400 line-through'>{ displayCurrency( product?.price)}</p>
                        </div>
                        <button className=' text-sm bg-orange-500 m-1 text-white px-4 py-1 rounded-full hover:bg-orange-600'>Add to Cart</button>
                    </div>
               </div>
               )
            })
        }
        </div>
    </div>
  )
}

export default HorizontalCardProduct