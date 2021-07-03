import axios from 'axios';

export const initialState = {
    basket: [],
    loggedIn: false,
    token: localStorage.getItem('token'),
    user: [],
    // { // Data of User Info Table in DB
	// 	id: 1, // AutoIncrement in DB
	// 	username: "ayelen", // One Username in the DB
	// 	firstname: "fernandez", // One FirstName in DB
	// 	lastname: "pepe", // One LastName in DB
	// 	email: "ayee_012live.com", // One Email in DB
    //     password: '', // One Password in DB
    //     image: '', // One Image with Blob Datatype in DB
    //     address: '', // One Address in DB
    //     gender: '', // One Gender in DB
    //     status: '', // One Status in DB (Update Frequently when Login or Logout)
	// },
    screenwidth: window.innerWidth,
    SingleUser: {},
    Products: [], 
    // [{ // Data of Product Table in DB
    //     ProductName: 'Apple', // One Product name in DB
    //     cate: 'Fruits', // One Category in DB
    //     des: 'Apple', // One Description in DB
    //     color:['1', '2'], // Array[] of Color in DB
    //     size:[['Small','Large', ''], ['XXL', 'Am', '']], // Array[ Array[], Array[] ] of Size in DB
    //     qty:[[1,2], [3,4]], // Array[ Array[], Array[] ] of Stock in DB
    //     price:[[10,20], [30,40]], // Array[ Array[], Array[] ] of Price in DB
    //     images:[[], []] // Array[ Array[], Array[] ] of images in DB
    // },
    // {
    //     ProductName: 'Banana',
    //     cate: 'Fruits',
    //     des: 'Banana',
    //     color:['3', '4'],
    //     size:[['Small', ''], ['XL', '']],
    //     qty:[[1], [3]],
    //     price:[[10], [30]],
    //     images:[[], []]
    // },
    // {
    //     ProductName: 'Juice',
    //     cate: 'Fruits',
    //     des: 'Juice',
    //     color:['5', '6'],
    //     size:[['Large', ''], ['XXXL', '']],
    //     qty:[[1], [3]],
    //     price:[[10], [30]],
    //     images:[[], []]
    // }],
    Revenue: [[12, 19, 3, 5, 2, 3, 9], [6, 39, 20, 10, 8, 1, 4]], // Total Earning each Day (Check Admin info For earning in DB)
    Completed: [[6, 39, 20, 10, 8, 1, 4], [15, 5, 13, 40, 2, 9, 6]], // Total Dilevered Product (Check Order Status in DB)
    Pending: [[15, 5, 13, 40, 2, 9, 6], [12, 19, 3, 5, 2, 3, 9]], // Total Pending Product (Check Order Status in DB)
    
    Orders: [
    { // Data of Order in DB
        Date: '21-01-2021', // One Date of Order in DB 
        ClientName: 'Thomas', // One Username access with UserID from User info Table in DB 
        Address: '203, Park Evenue, New York', // One Address access with UserID from User info Table in DB
        ProductName: ['Men Shirt', 'Watch', 'Shoes'], // Array[] of Products and each product will have its own entry in the DB and will be access and store in one Array[]
        Price: [15, 20, 25], // Array[] of Price and each product price will be access and store in one Array[]
        Qty: [3, 1, 1], // Array[] of Price and each product qty ordered will be access and store in one Array[]
        Discount: 10, // Discount ordered will be access
        Status: 'Delivered' // one Status in DB (Update when Delivered or Pending or Return)
    },
    {
        Date: '22-01-2021',
        ClientName: 'Jane',
        Address: 'DC, New York',
        ProductName: ['Men Sun-Glasses', 'Sneakers'],
        Price: [20, 45],
        Qty: [2,5],
        Status: 'Pending'
    },
    {
        Date: '23-01-2021',
        ClientName: 'Hulk',
        Address: 'Washington, New York',
        ProductName: ['Rainbow'],
        Price: [85],
        Qty: [6],
        Status: 'Return'
    }
    ],
    Review:[] ,
    /* [{ // Data of Feedback in DB
        ClientName: 'Jane doe', // One Username from User info in DB
        feedback: 'Admin Dashboard UI Kit is the perfect choice for your next dashboard/KPI design concept. All the ready-made icons and art-boards will make the work really easy when designing. Due', // One Feedback in DB
        email: 'janedoe@gmail.com', // One Email Address from User Info in DB
        date: '17-02-2021' // One date in DB
    },
    {
        ClientName: 'Thomas christan',
        feedback: 'Admin Dashboard UI Kit is the perfect choice for your next dashboard/KPI design concept. All the ready-made icons and art-boards will make the work really easy when designing. Due',
        email: 'thomaschristan@gmail.com',
        date: '18-02-2021'
    },
    {
        ClientName: 'Jonathan',
        feedback: 'Admin Dashboard UI Kit is the perfect choice for your next dashboard/KPI design concept. All the ready-made icons and art-boards will make the work really easy when designing. Due',
        email: 'jonathan@gmail.com',
        date: '18-02-2021'
    },
    {
        ClientName: 'Elbert',
        feedback: 'Admin Dashboard UI Kit is the perfect choice for your next dashboard/KPI design concept. All the ready-made icons and art-boards will make the work really easy when designing. Due',
        email: 'elbert@gmail.com',
        date: '19-02-2021'
    },
    {
        ClientName: 'James',
        feedback: 'Admin Dashboard UI Kit is the perfect choice for your next dashboard/KPI design concept. All the ready-made icons and art-boards will make the work really easy when designing. Due',
        email: 'james@gmail.com',
        date: '20-02-2021'
    }], */

    TotalViews: [[2, 2, 2, 3,4, 4, 5, 5, 5, 5,5, 2, 3,]], // Total Views for each day from Website info in DB
    ProductsSold: [[6, 9, 2, 10, 8, 1, 4, 5, 5, 5,5, 2, 3,]], // Total Product Sold each Day (Check Product info For Sold and Total in DB)
    TotalEarnings:[ [6, 9, 2, 10, 8, 1, 4, 5, 5, 5,5, 2, 3,]], // Total Earning each Day (Check Admin info For earning in DB)

// -----------------------dashboard admin------------------------------
    completedD: [[2]], // I have to Figure out
    urgentD: [[6]], // I have to Figure out
    normalD:[ [6]], // I have to Figure out
// ---------------------------------------------------------------------
    Website: { // Data of Website Info in DB
        hero_img: '', // Hero Banner in DB
        Top_img: '', // Top Banner in DB
        Logo: '', // Logo Image in DB
    },
    Services: [], // Data of Services in DB
    Offer: {}, // dict of Offers in DB
    Single: null, // Top Banner in DB
    CategoryAdd: [], // Data of Category Table in DB
    Aboutus: '', // One About us content is from Admin Table in DB
    Notification: [{ // Data from Notification Table in DB
        name: 'Jane Doe', // One Username from User Ingo Table in DB
        message: 'Apple was purchase on 01/02/2021 12:00 PM from New York', // One message in DB
        cat: 'Sales' // One Category from Category Table in DB
    },
    {
        name: 'Sherlock Homes',
        message: 'The Products are the best and they delivery it in time. The clothes material is very good. I am satisfy with the services',
        cat: 'Reviews'
    },
    {
        name: 'Lucifer',
        message: 'I have got the Wrong Product can you please Replace it?',
        cat: 'Returns'
    },
    {
        name: 'Mona lisa',
        message: 'Mona Lisa just subscribe',
        cat: 'Subscriber'
    }
    ],
    Message: [{ // Data os Push_notify Table in DB
        sent: 'I blocked you because of your message', // one Message in DB
        user: 'CyberFriend', // One UserName or selected username or All in DB
        status: 'Successfully Sent', // One Status in DB (Update when Reached)
        reached: '1', // One user Reached message in DB
        date: '8-1-2021 9:04 AM' // one Date in DB
    },
    {
        sent: 'Hi, There is a message for you :)',
        user: 'SaveGirls',
        status: 'Pending',
        reached: '0',
        date: '8-1-2021 9:04 AM'
    },
    {
        sent: 'Special Promotion only for Today !!!',
        user: 'All',
        status: 'Failed',
        reached: '0',
        date: '8-1-2021 9:04 AM'
    }]
};

export const test = async () => {
    initialState['CategoryAdd'] = await axios.get('https://dtodo-indumentaria-server.herokuapp.com/category/all').then(res => res.data)
    initialState['Products'] = await axios.get('https://dtodo-indumentaria-server.herokuapp.com/product/all').then(res => 
        res.data.map(r => {
            return {
                Product_id: r.Product_id, 
                ProductName: r.Name,
                cate: r.Category.Name,
                category: r.Category,
                des: r.Description,
                color: JSON.parse(r.Color),
                size: JSON.parse(r.Size),
                qty: JSON.parse(r.Stock),
                price: JSON.parse(r.Price),
                images: JSON.parse(r.Image)
            }
        })
    )
    initialState['user'] = await axios.get('https://dtodo-indumentaria-server.herokuapp.com/users/all').then(res => 
        res.data.map(r => {
            return {
                Users_id: r.Users_id,
                Username: r.Username,
                FirstName: r.FirstName,
                LastName: r.LastName,
                Email: r.Email,
                Password: r.Password,
                Address: JSON.parse(r.Address),
                Gender: r.Gender,
                Image: r.Image,
                Status: r.Status,
                Product_id: r.Product_id
            }
        })
    )
    // initialState['Review'] = await axios.get('https://dtodo-indumentaria-server.herokuapp.com/review/all').then(res => 
    //     res.data.map(r => {
    //         return {
    //             Review_id: r.Review_id, 
    //             Message: r.Message,
    //             Username: r.Username,
    //             createdAt: r.createdAt,
    //             Users_id: r.Users_id,
    //             Users: r.User
    //         }
    //     })
    // )

    if(localStorage.getItem('token') !== null) {
        initialState['SingleUser'] = JSON.parse(localStorage.getItem('SingleUser'))
        // initialState["SingleUser"] =  await axios.get(`https://dtodo-indumentaria-server.herokuapp.com/users/singleuser/1`, {
        //     headers: {
        //         'x-auth-token': localStorage.getItem('token')
        //     }
        // }).then(res => {
        //     if(!res.data) {
        //         localStorage.removeItem('token')
        //     }
        // })
    }

    var new_val = []
    await axios.get(`https://dtodo-indumentaria-server.herokuapp.com/order/all`)
    .then(res => 
        res.data?.map(async (order) => {
            var new_order = {}
            var Productname = []
            var Price = []
            var Qty = []
            new_order['Date'] = order.createdAt.substr(0,10)
            new_order['ClientName'] = order.ClientName
            var address = JSON.parse(order.Address)
            new_order['Address'] = address.join(', ')
            new_order['Discount'] = order.Discount
            new_order['Status'] = order.Status
            await axios.get(`https://dtodo-indumentaria-server.herokuapp.com/orderitem/find/${order.Orders_id}`)
            .then(res1 => 
                res1.data?.map(another => {
                    // Productname.push(another.Product.Name)
                    // Price.push(another.Product.Price) Modify it when I connect to the frontend
                    Price.push(20)
                    Qty.push(2)
                    return 0
                })
            )
            new_order['ProductName'] = Productname
            new_order['Price'] = Price
            new_order['Qty'] = Qty
            new_val.push(new_order)
            return new_val
        })
    )
    initialState['Orders'] = new_val

    var notify_val = []
    await axios.get('https://dtodo-indumentaria-server.herokuapp.com/notification/all').then(res => 
        res.data.map(note => 
            notify_val.push({
                name: note.FullName,
                message: note.Message,
                cate: note.Notify_cate
            })
        )
    )
    initialState['Notification'] = notify_val
}
test()

// Selector
export const getBasketTotal = (basket) => 
basket?.reduce((amount, item) => Number(item.price) + amount, 0);

const reducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            };

        case 'LOGGEDIN':
            localStorage.setItem('token', action.item.token)
            localStorage.setItem('SingleUser', action.item.result)
            return {
                ...state,
                loggedIn: action.item.loggedIn,
                SingleUser: action.item.result
            };
        
        case 'SINGLEUSER':
            return {
                ...state,
                SingleUser: action.item
            }

        case 'QUANTITY':
            const i = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let bas = [...state.basket];
            if(i >= 0) {
                bas[i].qty = action.qty
                bas[i].totalprice = bas[i].price * bas[i].qty
            }
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
            return {
                ...state,
                basket: newBasket
            }
        
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        
        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }

        case 'SCREEN_WIDTH':
            return {
                ...state,
                screenwidth: action.screenwidth
            }

        case 'PRODUCTS':
            return {
                ...state,
                Products: action.item
            }

        case 'REVENUE':
            return {
                ...state,
                Revenue: action.item
            }
        
        case 'COMPLETED':
            return {
                ...state,
                Completed: action.item
            }

        case 'PENDING':
            return {
                ...state,
                Pending: action.item
            }
        
        case 'REVIEW':
            return {
                ...state,
                Review: action.item
            }
        
        case 'CONTENT':
            return {
                ...state,
                Website: action.item
            }

        case 'SERVICES':
            return {
                ...state,
                Services: action.item
            }

        case 'OFFERS':
            return {
                ...state,
                Offer: action.item
            }

        case 'TOPIMG':
            return {
                ...state,
                Single: action.item
            }

        case 'CATEGORYADD':
            
            return {
                ...state,
                CategoryAdd: action.item
            }

        case 'ABOUTUS':
            return {
                ...state,
                Aboutus: action.item
            }

        case 'NOTIFICATION':
            return {
                ...state,
                Notification: action.item
            }

        case 'MESSAGE':
            return {
                ...state,
                Message: action.item
            }

        default:
            return state;
    }
}

export default reducer;