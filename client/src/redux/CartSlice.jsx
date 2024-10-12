import { createSlice } from '@reduxjs/toolkit';

// Helper function to load state from localStorage
const loadCartFromLocalStorage = () => {
    try {
        const serializedCart = localStorage.getItem('cartItems');
        return serializedCart ? JSON.parse(serializedCart) : [];
    } catch (e) {
        console.warn('Error loading cart from localStorage:', e);
        return [];
    }
};

// Helper function to save state to localStorage
const saveCartToLocalStorage = (cartItems) => {
    try {
        const serializedCart = JSON.stringify(cartItems);
        localStorage.setItem('cartItems', serializedCart);
    } catch (e) {
        console.warn('Error saving cart to localStorage:', e);
    }
};

const calculateTotalQuantity = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
};
const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: loadCartFromLocalStorage(),  // Load from localStorage if available
        totalQuantity: calculateTotalQuantity(loadCartFromLocalStorage()),  // Total number of items (sum of all quantities)
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
            state.totalQuantity = calculateTotalQuantity(state.cartItems);
            saveCartToLocalStorage(state.cartItems);  // Save to localStorage
        },
        decToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            } else {
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
            }
            state.totalQuantity = calculateTotalQuantity(state.cartItems);
            saveCartToLocalStorage(state.cartItems);  // Save to localStorage
        },
        removeFromCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload);
            if (itemIndex >= 0) {
                state.cartItems.splice(itemIndex, 1);
            }
            state.totalQuantity = calculateTotalQuantity(state.cartItems);
            saveCartToLocalStorage(state.cartItems);  // Save to localStorage
        },
    },
});

export const { addToCart, decToCart, removeFromCart } = CartSlice.actions;
export default CartSlice.reducer;
