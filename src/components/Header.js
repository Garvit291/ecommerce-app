import React from 'react'
import Image from 'next/image';
import {
    MenuIcon ,
    SearchIcon,
    ShoppingCartIcon,
} from "@heroicons/react/outline";




import {signin, signIn ,signOut ,useSession} from 'next-auth/client';
import router, {useRouter} from "next/router";
import { selectItems } from '../slices/basketSlice';
import { useSelector } from 'react-redux';




function Header() {

    const [session] = useSession();
    const router = useRouter();
    const items = useSelector(selectItems);
    return (
        <header className="">
            {/* top nav */}
            <div className = "flex items-center flex-grow p-1 py-1 bg-amazon_blue">
                {/* logo */}
                <div className="flex items-center flex-grow mt-2 sm:flex-grow-0">
                    <Image
                    onClick={()=>router.push('/')}
                    src="https://links.papareact.com/f90"
                    width={150}
                    height={40}
                    objectFit = 'contain'
                    className = "cursor-pointer "

                    />
                </div>
                {/* search */}

                <div className="items-center flex-grow hidden h-10 bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 sm:flex" >
                    <input type="text" className="flex-grow flex-shrink w-6 h-full p-2 px-4 rounded-l-md focus:outline-none" />
                    <SearchIcon className="h-12 p-4" />
                </div> 

                {/* right part */}

                <div className="flex items-center mx-6 space-x-6 text-xs text-white whitespace-nowrap"  >
                    <div onClick={session ? signOut : signIn} className="link">
                        <p> 
                            { session ? `Hii ${session.user.name}` : "Sign In" }
                        </p>
                        <p className="font-extrabold md:text-sm"> Accoubt & lists</p>
                    </div>
                    <div className="link" onClick={()=>router.push('/orders')}>
                        <p> Returns</p>
                        <p className="font-extrabold md:text-sm">Orders</p>
                    </div> 
                    <div className="relative flex items-center link" onClick={()=>router.push('/checkout')}>
                        <span className="absolute top-0 right-0 w-4 h-4 font-bold text-center text-black bg-yellow-400 rounded-full md:right-10 ">{items.length}</span>
                        <ShoppingCartIcon className="h-10"/>  
                        <p className="hidden font-extrabold md:inline md:text-sm">Basket</p>       
                    </div>
                </div>
            </div>

            {/* bottom nav */}
            <div className="flex items-center p-2 pl-6 space-x-3 text-sm text-white bg-amazon_blue-light">
                <p className="flex items-center link">
                    <MenuIcon className="h-6 mr-1"/>
                    All
                </p>
                <p className=" link"> Prime Video</p>
                <p className=" link"> Amazon Bussiness</p>
                <p className=" link"> Today's Deals</p>
                <p className="hidden link lg:inline-flex"> Electronics</p>
                <p className="hidden link lg:inline-flex"> Food & Grocery</p>
                <p className="hidden link lg:inline-flex"> Prime</p>
                <p className="hidden link lg:inline-flex"> Buy Again </p>
                <p className="hidden link lg:inline-flex"> Shopper Toolkit</p>
                <p className="hidden link lg:inline-flex"> Health & Personal Care</p>
            </div>
        </header>
    )
}

export default Header
