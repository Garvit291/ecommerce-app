import { StarIcon } from '@heroicons/react/solid'
import { StarIcon as Star } from '@heroicons/react/outline'
import Currency from 'react-currency-formatter';
import Image from 'next/image'
import React from 'react'
import { useDispatch } from 'react-redux';
import { addToBasket, decrement, removeFromBasket } from '../slices/basketSlice';



function CheckoutProduct({id,title,price,description,category,image,rating,hasPrime,count}) {



    const dispatch = useDispatch();
    
    

    const incrementCount = () =>{
        const product ={
          id,
          title,
          price,
          description,
          category,
          image,
          hasPrime,
          rating,
          count
        }

        dispatch(addToBasket(product))
        
    }

    const decrementCount =()=>{

        const product ={
            id,
            title,
            price,
            description,
            category,
            image,
            hasPrime,
            rating,
            count
          }

          if(count===1){
              removeItemFromBasket();
          }
          else{
              
              dispatch(decrement(product))
          }


    }

    const removeItemFromBasket=()=>{
        
        dispatch(removeFromBasket({id}));
        
    }
    return (
        <div className="grid grid-cols-5 border-2 borde-gray-100 ">
            
            <Image src={image} height={200} width={200} objectFit='contain' />

            {/* middle section */}

            <div className="col-span-3 mx-5 ">
                <p>{title}</p>
                <div className="flex items-center ">
                    {Array(rating)
                    .fill().map((_,i)=>{
                        return(
                            <StarIcon className="h-5 text-yellow-500" key={i}/>
                        )
                    })}
                    {Array(5-rating)
                    .fill().map((_,i)=>{
                        return(
                            <Star className="h-5 text-yellow-500" key={i}/>
                        )
                    })}
                </div>
                <p className="my-2 text-xs line-clamp-3 ">{description}</p>
                <Currency 
                     quantity={price}
                     currency={"GBP"}
                />
                <div className="absolute flex space-x-3 top-3 right-3">
                    
                {/* <p className="w-8 text-center bg-yellow-200 border-2 border-gray-700 border-solid top-1 right-8">-</p>
                <p className="w-8 text-center bg-yellow-200 border-2 border-gray-700 border-solid top-1 right-10">{count}</p>
                <p className="w-8 text-center bg-yellow-200 border-2 border-gray-700 border-solid top-1 right-10">+</p> */}
                </div>
                {hasPrime && (
                    <div className="flex items-center space-x-2">
                        <img loading="lazy" className="w-14" src="https://links.papareact.com/fdw" alt="" />
                        <p className ="text-xs text-gray-500 ">FREE Next Day Delivery</p>
                    </div> 
                    )

                }
            </div>

            {/* right buttons */}

            <div className="flex flex-col items-center my-auto space-y-2">
                <div className="flex items-center justify-center ">
                    <button className=" button" onClick={decrementCount}>
                        -
                    </button>
                    <p className="text-center button ">{count}</p>
                    <button className= " button" onClick={incrementCount}>
                        +
                    </button>
                </div>
               
            </div>

            
        </div>
    )
}

export default CheckoutProduct
