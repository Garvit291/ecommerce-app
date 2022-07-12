import moment from 'moment';
import { getSession, useSession } from 'next-auth/client'
import image from 'next/image';
import React from 'react'
import db from '../../firebase';
import Header from '../components/Header';
import Order from '../components/Order';


function orders({orders}) {
    const [session] = useSession();
    console.log(orders)
    return (
        <div >
            <Header/>
            <main className="max-w-screen-lg p-10 mx-auto">
                <h1 className="pb-1 mb-2 text-3xl border-b border-yellow-400 ">Your orders</h1>
                {session ?(
                    <h2> {orders.length} order(s) </h2>
                ):
                (
                    <h2> Please sign in to see your orders </h2>
                )}

                <div className="mt-5 space-y-4"></div>
                    {orders?.map(({id ,amount , amountShipping , items, timeStamp , images})=>{
                        return(

                            <Order
                                key={id}
                                id={id}
                                amount={amount}
                                amountShipping={amountShipping}
                                items={items}
                                timeStamp = {timeStamp}
                                images={images}
                                
                            />
                        )
                    })}
            </main>
        </div>
    )
}

export default orders


export async function getServerSideProps(context){

    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

    //get user credential

    const session = await getSession(context);

    if(!session){
        return{
            props:{
                
            }
        }
    }


    const stripeOrders = await db.collection("users")
    .doc(session.user.email)
    .collection('orders')
    .orderBy("timestamp","desc")
    .get();

    
    const orders = await Promise.all(
        stripeOrders.docs.map( async (order)=>({
            id:order.id,
            amount : order.data().amount,
            amountShipping : order.data().amount_shipping,
            images : order.data().images,
            timeStamp:moment(order.data().timestamp.toDate()).unix(),
            items:(
                await stripe.checkout.sessions.listLineItems(order.id,{
                    limit:100,
                })
            ).data,
        }))
    )

    return {
        props:{
            orders
        }
    }
}