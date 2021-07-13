import React , {useState} from 'react';
import Image from 'next/image';
import {StarIcon} from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import { addToBasket } from '../slices/basketSlice';
import { useDispatch } from 'react-redux';
import { StarIcon as Star } from '@heroicons/react/outline'


let MAX_RATING=5;
let MIN_RATING=1;

function Product({id,title,price,description,category,image} ) {
    
    const [rating] =useState(
      Math.floor(Math.random() *(MAX_RATING - MIN_RATING +1)) + MIN_RATING
    );

    const [hasPrime] = useState(Math.random()<0.5);
    const dispatch = useDispatch();
    const count=1;
    
    const addItemtoBasket = () =>{
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

    return (
        <div className="relative z-30 flex flex-col p-8 m-5 bg-white rounded-xl ">
          <p className="absolute text-xs italic text-gray-400 top-2 right-2">{category}</p>
          
          <Image className="transition-all ease-in hover:scale-75 " src={image} height={200} width={200} objectFit='contain' />
          <h4 className="my-3 ">{title}</h4>
          <div className="flex">
            {
              Array(rating)
              .fill()
              .map((x,i)=>{
                return(
                  
                  <StarIcon className="h-5 text-yellow-500" key={i}/>
                )
              })

              
            }
            {Array(5-rating)
                    .fill().map((x,i)=>{
                        return(
                            <Star className="h-5 text-yellow-500" key={i}/>
                        )
                    })}
          </div>

          <p className ="my-2 text-xs line-clamp-2">{description}</p>

          <div className="mb-4 ">
          <Currency 
            quantity={price}
            currency={"GBP"}
          />
          </div>

          {hasPrime && (
            <div className="flex items-center mt-3 space-x-2">
                <img className="w-14" src="https://links.papareact.com/fdw" alt="" />
                <p className ="text-xs text-gray-500 ">FREE Next Day Delivery</p>
            </div> 
          )

          }

          <button onClick={addItemtoBasket} className="mt-auto button">
            Add to Basket
          </button>
        </div>
    );
}

export default Product
