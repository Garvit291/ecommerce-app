
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export default async (req,res) =>{
        const {items , email} = req.body;

        // console.log(items);
        // console.log(email);

        const transformedItems =  items.map((item)=>{
            return{
                description : item.description,
                quantity : item.count,
                price_data : {
                    currency :"gbp",
                    product_data :{
                        name:item.title,
                        images : [item.image]
                    },
                    unit_amount : item.price * 100,

                },
            }
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types :['card'],
            shipping_rates :["shr_1JCl6sSGbMoRzRVXz1u0efYc"],
            shipping_address_collection :{
                allowed_countries:['GB' ,'US','IN' ,'CA'],
            },
            line_items : transformedItems ,
            mode :'payment',
            success_url : `${process.env.HOST}/success`,
            cancel_url : `${process.env.HOST}/checkout`,
            metadata : {
                email,
                images : JSON.stringify(items.map(item=>item.image)),

            }

        })

        res.status(200).json({id : session.id});
};