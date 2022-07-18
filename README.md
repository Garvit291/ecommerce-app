<h2 align="center">
    Eshoppers: Amazing e-commerce platform for everyone
 </h2>

Eshoppers is a e commerce Amazon Clone web app built with the Power of latest SSR technology Next.js
with secure Payment integration by Stripe

## ![](https://github.com/Garvit291/ecommerce-app/blob/main/public/screenshots/view.PNG?raw=true)



# Features

### 1. Interactive UI 

![](https://github.com/Garvit291/ecommerce-app/blob/main/public/screenshots/sucessfull%20order.PNG?raw=true)

<br></br>

### 2. Google Sign In
![](https://github.com/Garvit291/ecommerce-app/blob/main/public/screenshots/sign%20in%20button.PNG?raw=true)
    <br></br>
![](https://github.com/Garvit291/ecommerce-app/blob/main/public/screenshots/google%20sign%20in.PNG?raw=true)
<br></br>
    
### 3. Mobile / Tablet Responsive UI
 ![](https://github.com/Garvit291/ecommerce-app/blob/main/public/screenshots/responsive.PNG?raw=true) 

<br></br>

### 4. Checkout allowed to Signed in Customers Only
![](https://github.com/Garvit291/ecommerce-app/blob/main/public/screenshots/checkoutWithUser.PNG?raw=true)

<br></br>

### 5. Secure Payments Integration by Stripe
![](https://github.com/Garvit291/ecommerce-app/blob/main/public/screenshots/Payment.PNG?raw=true)

<br></br>

### 6. Webhooks to Listen Payments 
![](https://github.com/Garvit291/ecommerce-app/blob/main/public/screenshots/Webhooks.PNG?raw=true)

<br></br>

### 6. Adding Data of Successfull Orders to Firebase
![](https://github.com/Garvit291/ecommerce-app/blob/main/public/screenshots/firebase.PNG?raw=true)

<br></br>

# Running on your device 

```json
git clone https://github.com/Garvit291/ecommerce-app/

cd ecommerce-app

npm i 

```
```

<!-- Set .env.local with following details  -->

# Authentication
GOOGLE_ID = <your id>
GOOGLE_SECRET=<your secret>
NEXTAUTH_URL=http://localhost:3000

# Stripe
STRIPE_PUBLIC_KEY=<stripe public key>
STRIPE_SECRET_KEY=<stripe secret key>


# Stripe Terminal/CLI
STRIPE_SIGNING_SECRET=<webhook secret>

#genrated by ->  stripe listen --forward-to localhot:3000/api/webhook

HOST=http://localhost:3000

# Need to add this to... google cloud
# http://localhost:3000/api/auth/callback/google

```
```
npm run dev 

stripe listen --forward-to localhot:3000/api/webhook 

!enjoy!

```

# Built With


* [Next.js](https://nextjs.org/)  - Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed.

* [TailwindCSS](https://tailwindcss.com/)-A utility-first CSS framework packed with classes that provides freedom to make any ui and also make things responsive without using media queries

* [Redux](https://redux.js.org/) -  Redux is a predictable state container designed to help you write JavaScript apps that behave consistently across client, server, and native environments and are easy to test.

* [Stripe](https://stripe.com/in) - Stripe is a payment processor or gateway that allows your customers to safely and efficiently transfer funds from their credit cards or bank accounts in a variety of currencies.

* [Firebase](https://firebase.google.com/) - Firebase is an app development platform that helps you build and grow apps and games users love. Backed by Google used by businesses around the world.

* [Fakestoreapi](https://fakestoreapi.com/) - fakeStoreApi is a free online REST API that you can use whenever you need Pseudo-real data for your e-commerce or shopping website without running any server-side code. It's awesome for teaching purposes, sample codes, tests, etc.





# Future Improvements 
 1. Addition of Features to Navbar
 2. Integration of Models to improve recommendation of product


© [Garvit291](https://github.com/Garvit291)

