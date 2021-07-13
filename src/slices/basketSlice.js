import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  // actions
  reducers: {
    addToBasket: (state, action) => {
      let duplicateProductIndex=-1;
      if(state.items.some((product,index)=>{
        // console.log(product)
        if(product.id===action.payload.id){
          duplicateProductIndex=index;
          return true;
        }
        return false;
      })){
        
        // let duplicateProduct=JSON.parse(JSON.stringify(state.items[duplicateProductIndex]));
        // duplicateProduct.count++;
        // let duplicateProducts=JSON.parse(JSON.stringify(state.items));
        let duplicateProducts=[...state.items];
        let originalPrice=duplicateProducts[duplicateProductIndex].price/duplicateProducts[duplicateProductIndex].count;
        duplicateProducts[duplicateProductIndex].count++;
        duplicateProducts[duplicateProductIndex].price=originalPrice*duplicateProducts[duplicateProductIndex].count;
        state.items=duplicateProducts;
        return;
      }
      state.items = [...state.items , action.payload]

    },

    
    removeFromBasket: (state, action) => {
        const index = state.items.findIndex(
          (item)=>item.id===action.payload.id 
        );

        let newBasket = [...state.items];

        if(index >= 0){
              newBasket.splice(index,1)
        }
        else{
          console.warn('Cant remove product ')
        }

        state.items = newBasket;

    },

    decrement :(state,action) =>{
      let duplicateProductIndex=-1;
      if(state.items.some((product,index)=>{
        // console.log(product)
        if(product.id===action.payload.id){
          duplicateProductIndex=index;
          return true;
        }
        return false;
      })){
        
        // let duplicateProduct=JSON.parse(JSON.stringify(state.items[duplicateProductIndex]));
        // duplicateProduct.count++;
        // let duplicateProducts=JSON.parse(JSON.stringify(state.items));
        let duplicateProducts=[...state.items];
        let originalPrice=duplicateProducts[duplicateProductIndex].price/duplicateProducts[duplicateProductIndex].count;
        duplicateProducts[duplicateProductIndex].count--;
        duplicateProducts[duplicateProductIndex].price=originalPrice*duplicateProducts[duplicateProductIndex].count;
        state.items=duplicateProducts;
        return;
      }
    }
  },
});

export const { addToBasket, removeFromBasket ,decrement } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotalAmount = (state) => state.basket.items.reduce((total,item)=> total + item.price ,0);
export const selectTotalItems = (state) => state.basket.items.reduce((total,item)=> total + item.count ,0);


export default basketSlice.reducer;
