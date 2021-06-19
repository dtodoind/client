const initialState = {
    basket: JSON.parse(localStorage.getItem('basket')) === null ? [] : JSON.parse(localStorage.getItem('basket')),
    loggedIn: false,
    SingleUser: {},
    reviews: [],
    CategoryAdd: [],
    Aboutus: null,
    user: [],
    Notification: [],
    PendingD: [[2]],
    ShippingD: [[6]],
    DeliveryD:[[6]],
    PickupD:[[9]],
    Products:[],
    Revenue: [[12, 19, 3, 5, 2, 3, 9], [6, 39, 20, 10, 8, 1, 4]],
    Completed: [[6, 39, 20, 10, 8, 1, 4], [15, 5, 13, 40, 2, 9, 6]],
    Pending: [[15, 5, 13, 40, 2, 9, 6], [12, 19, 3, 5, 2, 3, 9]],
    Orders: [],
    Services: [],
    Offer: [],
    Single: null,
    Hero_img: [],
    TotalViews: [[2, 2, 2, 3,4, 4, 5, 5, 5, 5,5, 2, 3,]],
    ProductsSold: [[6, 9, 2, 10, 8, 1, 4, 5, 5, 5,5, 2, 3,]],
    TotalEarnings:[ [6, 9, 2, 10, 8, 1, 4, 5, 5, 5,5, 2, 3,]],
    Message: [],
    Delivery: []
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_TO_BASKET':
            localStorage.setItem('basket', JSON.stringify([...state.basket, action.item]))
            return {
                ...state,
                basket: [...state.basket, action.item]
            };
        
        case 'QUANTITY':
            const i = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let bas = [...state.basket];
            // if(i >= 0) {
            //     bas[i].qty = action.qty
            //     bas[i].totalprice = bas[i].price * bas[i].qty
            // }
            bas[i].qty = action.qty
            bas[i].Stock = bas[i].oneSt - action.qty
            bas[i].totalprice = bas[i].price * bas[i].qty
            localStorage.setItem('basket', JSON.stringify(bas))
            return {
                ...state,
                basket: bas
            };

        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket];

            if(index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(
                    `Cant remove product (id ${action.id}) as its not in basket`
                )
            }
            localStorage.removeItem('basket')
            localStorage.setItem('basket', JSON.stringify(newBasket))
            return {
                ...state,
                basket: newBasket
            };

        case 'LOGGEDIN':
            if(action.item === 'true') {
                localStorage.removeItem('token')
                localStorage.removeItem('SingleUser')
                return {
                    ...state,
                    loggedIn: false,
                    SingleUser: {}
                }
            } else {
                localStorage.setItem('token', action.item.token)
                localStorage.setItem('SingleUser', action.item.result)
                return {
                    ...state,
                    loggedIn: action.item.loggedIn,
                    SingleUser: action.item.result
                };
            };

        case 'REVIEWS':
            if(Array.isArray(action.item)) {
                return {
                    ...state,
                    reviews: action.item
                }
            } else {
                return {
                    ...state,
                    reviews: [
                        ...state.reviews,
                        action.item
                    ]
                };
            };
        
        case 'CATEGORYADD':
            if(Array.isArray(action.item)) {
                return {
                    ...state,
                    CategoryAdd: action.item
                }
            }
            return {
                ...state,
                CategoryAdd: [
                    ...state.CategoryAdd,
                    action.item
                ]
            };
        
        case 'SET_USER':
            return {
                ...state,
                user: action.item
            };

        case 'NOTIFICATION':
            if(Array.isArray(action.item)) {
                return {
                    ...state,
                    Notification: action.item
                }
            }
            return {
                ...state,
                Notification: [
                    ...state.Notification,
                    action.item
                ]
            };

        case 'PRODUCTS':
            if(typeof action.item === 'object') {
                return {
                    ...state,
                    Products: action.item
                }
            }
            return {
                ...state,
                Products: [
                    ...state.Products,
                    action.item
                ]
            };
        
        case 'ORDERS':
            if(typeof action.item === 'object') {
                return {
                    ...state,
                    Orders: action.item
                }
            }
            return {
                ...state,
                Orders: [
                    ...state.Orders,
                    action.item
                ]
            };

        case 'REVENUE':
            return {
                ...state,
                Revenue: action.item
            };
        
        case 'COMPLETED':
            return {
                ...state,
                Completed: action.item
            };

        case 'PENDING':
            return {
                ...state,
                Pending: action.item
            };

        case 'CONTENT':
            return {
                ...state,
                Website: action.item
            };

        case 'HEROIMG':
            if(typeof action.item === 'object') {
                return {
                    ...state,
                    Hero_img: action.item
                }
            }
            return {
                ...state,
                Hero_img: [
                    ...state.Hero_img,
                    action.item
                ]
            };

        case 'SERVICES':
            if(typeof action.item === 'object') {
                return {
                    ...state,
                    Services: action.item
                }
            }
            return {
                ...state,
                Services: [
                    ...state.Services,
                    action.item
                ]
            };

        case 'OFFERS':
            return {
                ...state,
                Offer: action.item
            };

        case 'TOPIMG':
            return {
                ...state,
                Single: action.item
            };

        case 'ABOUTUS':
            return {
                ...state,
                Aboutus: action.item
            };
        
        case 'MESSAGE':
            if(Array.isArray(action.item)) {
                return {
                    ...state,
                    Message: action.item
                }
            }
            return {
                ...state,
                Message: [
                    ...state.Message,
                    action.item
                ]
            };

        case 'COUNT':
            return {
                ...state,
                PendingD: action.item.PendingD,
                ShippingD: action.item.ShippingD,
                DeliveryD: action.item.DeliveryD,
                PickupD: action.item.PickupD
            };

        case 'DELIVERY':
            if(Array.isArray(action.item)) {
                return {
                    ...state,
                    Delivery: action.item
                }
            }
            return {
                ...state,
                Delivery: [
                    ...state.Delivery,
                    action.item
                ]
            };
        default:
            return state
    }
}

export default rootReducer