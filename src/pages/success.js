import { CheckCircleIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import React from 'react'
import Header from '../components/Header'

function success() {

    const router = useRouter();
    return (
        <div className="h-screen bg-gray-100 ">
            <Header/>

            <main className="max-w-screen-lg mx-auto ">
                <div className="flex flex-col p-10 bg-white">
                    <div className="flex items-center mb-5 space-x-2 ">
                        <CheckCircleIcon className="h-10 text-green-500 "/>
                        <h1>Thank You , Your Order has been confirmed!</h1>
                    </div>
              
                    <p>
                        Thank you for shopping with us . We will send a confirmation once your item has shipped.
                        if you would like to check the status of your order(s) please press the link below 
                    </p>
                    <button onClick={()=> router.push('/orders')} className="mt-8 button">Go to my orders</button>
                </div>

            </main>
        </div>
    )
}

export default success