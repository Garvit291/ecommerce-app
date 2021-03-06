import { buffer } from "micro";

import * as admin from 'firebase-admin';
// established connection with the firebase backend
const serviceAccount = require('../../../permissions.json')

const app = !admin.apps.length ? admin.initializeApp({

    credential : admin.credential.cert(serviceAccount)
}):admin.app();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_SIGNING_SECRET 


const fullfillOrder = async (session)=>{
    console.log("plaaalalalalalalala");

    return app
    .firestore()
    .collection('users')
    .doc(session.metadata.email)
    .collection("orders").doc(session.id).set({
        amount:session.amount_total /100 ,
        amount_shipping:session.total_details.amount_shipping / 100,
        images : JSON.parse(session.metadata.images),
        timestamp:admin.firestore.FieldValue.serverTimestamp()

    })
    .then(()=>{
        console.log( `sucess order : ${session.id} has fullfilled`);
    })

    
}
export default async (req,res) =>{
    if(req.method==='POST'){
        const requestBuffer = await buffer(req);
        console.log(requestBuffer);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"];

        let event ;

        //verify the stripe send
        
        try {
            event = stripe.webhooks.constructEvent(payload,sig,endpointSecret);

        } catch (error) {
            console.log('Error ' , error.message)
            return res.status(400).send(`Webhook error : ${error.message}`);
        }

        //handle the checkout session completed event 

        if(event.type === 'checkout.session.completed'){
            const session = event.data.object;

            //fullfill the order 
            return fullfillOrder(session).then(()=> res.status(200))
            .catch(err=>res.status(400).send(` webhook error : ${err.message}`));

        }

    }
}

export const config = {
    api:{
        bodyParser:false,
        externalResolver:true
    }
}