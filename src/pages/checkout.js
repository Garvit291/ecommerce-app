import Image from 'next/image'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CheckoutProduct from '../components/CheckoutProduct'
import Header from '../components/Header'
import { selectItems, selectTotalAmount, selectTotalItems } from '../slices/basketSlice'
import Currency from 'react-currency-formatter';
import { useSession } from 'next-auth/client'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
const stripePromise = loadStripe(process.env.stripe_public_key);
function checkout() {

    const items = useSelector(selectItems);
    const [session] = useSession();
    let totalItems = useSelector(selectTotalItems);
    let totalAmount =useSelector(selectTotalAmount);

    // const countTotal = () =>{
    //     items.forEach(item => {
    //         totalItems = totalItems + item.count ;
    //         totalAmount = totalAmount + item.price
    //     });
    // }

    const createCheckoutSession = async () =>{
        const stripe = await stripePromise ;

        // call backend to create checkout session 

        const checkoutSession = await axios.post("/api/create-checkout-session" ,{
            items:items,
            email: session.user.email
        } )

        // redirect user to stripe checkout 
        const result = await stripe.redirectToCheckout({
            sessionId : checkoutSession.data.id

        })

        if(result.error){
            alert(result.error.message);
        }
        

    }

    return (
        <div className="bg-gray-100 ">
            <Header/>
            <main className="mx-auto lg:flex max-w-screen-2xl">
                {/* left side */}
            <div>
                
                <div className="">
                    <Image
                    src="https://links.papareact.com/ikj"
                    width={1020}
                    height={250}
                    objectFit='contain'
                    />
                </div>

                <div className="flex flex-col p-5 space-y-10 bg-white ">
                    <h1 className="pb-4 text-3xl border-b ">
                        {items.length===0?'Your Shopping Basket is Empty':'Your Shopping Basket'}
                    </h1>

                    {items.map((item,i)=>{
                        return(
                            <CheckoutProduct
                                key={i}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                                image={item.image}
                                hasPrime={item.hasPrime}
                                rating={item.rating}
                                count={item.count}
                            />
                        )
                    })}

                </div>
            </div>  
                {/* right side */}
                <div className="flex flex-col p-10 bg-white shadow-md " >
                    {
                    items.length > 0 && 
                    <>
                        <h2 className=" whitespace-nowrap">Subtotal ({totalItems}) 
                            <span className="font-bold">
                            <Currency 
                                quantity={totalAmount}
                                currency={"GBP"}
                            />
                            </span>
                        </h2>

                        <button
                            role='link'
                            onClick={createCheckoutSession}
                         disabled ={!session}
                        className={` button mt-2 ${ !session && " from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"} `}>
                            {!session ? "Sign in To Checkout" : "Proceed To checkout"}
                        </button>
                    </>
                    }
                </div>

            </main>
        </div>
    )
}

export default checkout
