import moment from 'moment';
import React from 'react'
import Currency from 'react-currency-formatter';

function Order({id ,amount , amountShipping , items, timeStamp , images}) {
    let totalItems=0
    const getTotalItems=()=>{

        items.forEach(item => {
            totalItems += item.quantity;
        });
    }
    return (
        <div className="relative border rounded-md ">
            <div className="flex items-center p-5 space-x-10 text-sm text-gray-500 bg-gray-100 ">
                <div className="">
                    <p className="text-xs font-bold"> ORDER PLACED</p>
                    <p>{moment.unix(timeStamp).format("DD MM YYYY")}</p>
                </div>
                <div className="">
                    <p className="text-xs font-bold ">TOTAL</p>
                    <p>
                        <Currency quantity={amount} currency={"GBP"}/> - Next Day Delivery {" "}
                        <Currency quantity={amountShipping} currency={"GBP"}/> 
                        
                    </p>


                </div>
                    {getTotalItems()}
                    <p className="self-end flex-1 text-sm text-right text-blue-500 whitespace-nowrap sm:text-xl">{totalItems} items </p>
                    <p className="absolute w-40 text-xs truncate top-2 right-2 lg:w-72 whitespace-nowrap ">
                        ORDER #{id}
                    </p>
            </div>

            <div className="p-5 sm:p-10 ">
                <div className="flex space-x-6 overflow-x-auto">
                    {images.map((image,i)=>{
                        return(
                            <img src={image} key={i} alt="" className="object-contain h-20 sm:h-32"/>
                    )
                    })}
                </div>
            </div>


            
        </div>
    )
}

export default Order
