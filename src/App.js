import React, { lazy, Suspense } from 'react'
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import loader from './assets/Infinity-1s-200px.gif'

// import LoginRegister from "./Pages/Login_Register/Login_Register";
import Navigation from "./component/Navigation/Navigation";
// import Home from "./Pages/Home/Home";
// import Review from "./Pages/Review/Review";
// import Category from "./Pages/Category/Category";
// import Search from "./Pages/Search/Search";
// import Shopcart from "./Pages/Shopcart/Shopcart";
import Footer from "./component/Footer/Footer";
// import AboutUs from "./Pages/AboutUs/AboutUs";
// import Checkout from "./Pages/Checkout/Checkout";
// import ForgotPassword from "./Pages/Forgot Password/ForgotPassword";
// // import Myaccount from "./Pages/MyAccount/Myaccount";
// import Account from './Pages/MyAccount/Account'
// import Navi from "./admin Pages/Navi/Navi";
// import ShippingInfo from "././Pages/ShippingInfo/ShippingInfo";
// import Exchange from './Pages/Exchange/Exchange'
// import CardDetail from './Pages/CardDetail/CardDetail';
// import ResetPassword from "./Pages/Reset Password/ResetPassword";
// import Welcome from './component/Login/Confirmation'
import "bootstrap/dist/css/bootstrap.css";
//import AdminLogin from "./admin Pages/AdminLogin/AdminLogin";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";

// const Home = lazy(() => import('./Pages/Home/Home'))
const LoginRegister = lazy(() => import('./Pages/Login_Register/Login_Register'));
// const Navigation = lazy(() => import('./component/Navigation/Navigation'));
const Home = lazy(() => import('./Pages/Home/Home'));
const Review = lazy(() => import('./Pages/Review/Review'));
const Category = lazy(() => import('./Pages/Category/Category'));
const Search = lazy(() => import('./Pages/Search/Search'));
const Shopcart = lazy(() => import('./Pages/Shopcart/Shopcart'));
// const Footer = lazy(() => import('./component/Footer/Footer'));
const AboutUs = lazy(() => import('./Pages/AboutUs/AboutUs'));
const Checkout = lazy(() => import('./Pages/Checkout/Checkout'));
const ForgotPassword = lazy(() => import('./Pages/Forgot Password/ForgotPassword'));
const Account = lazy(() => import('./Pages/MyAccount/Account'))
const Navi = lazy(() => import('./admin Pages/Navi/Navi'));
const ShippingInfo = lazy(() => import('././Pages/ShippingInfo/ShippingInfo'));
const Exchange = lazy(() => import('./Pages/Exchange/Exchange'))
const CardDetail = lazy(() => import('./Pages/CardDetail/CardDetail'));
const ResetPassword = lazy(() => import('./Pages/Reset Password/ResetPassword'));
const Welcome = lazy(() => import('./component/Login/Confirmation'))

function App() {

	return (
		<div className="App">
			<Switch>
				{/* Admin Pages */}
				<Route path="/admin">
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<Navi />
					</Suspense>
				</Route>

				{/* Client Pages */}
				<Route path = "/confirm/:token">
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<Welcome  />
					</Suspense>
				</Route>
				<Route path="/exchange">
					<Navigation />
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<Exchange/>
					</Suspense>
					<Footer />
				</Route>
				<Route path="/detail/:id">
					<Navigation />
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<CardDetail/>
					</Suspense>
					<Footer />
				</Route>
				<Route path="/shipping">
					<Navigation />
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<ShippingInfo />
					</Suspense>
					<Footer />
				</Route>

				<Route path="/account/:tabs">
					<Navigation />
					{/* <Myaccount /> */}
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<Account/>
					</Suspense>
					<Footer /> 
				</Route>

				<Route path="/checkout">
					<Navigation />
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<Checkout />
					</Suspense>
					<Footer />
				</Route>

				<Route path="/shopcart">
					<Navigation />
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<Shopcart />
					</Suspense>
					<Footer />
				</Route>

				<Route path="/search/:searchitem">
					<Navigation />
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<Search />
					</Suspense>
					<Footer />
				</Route>

				<Route path="/resetpassword">
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<ResetPassword />
					</Suspense>
				</Route>

				<Route path="/forgotpassword">
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<ForgotPassword />
					</Suspense>
				</Route>

				<Route path="/loginregister">
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<LoginRegister />
					</Suspense>
				</Route>

				<Route path="/aboutus">
					<Navigation />
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<AboutUs />
					</Suspense>
					<Footer />
				</Route>

				<Route path="/review">
					<Navigation />
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<Review />
					</Suspense>
					<Footer />
				</Route>

				<Route path="/category">
					<Navigation />
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<Category />
					</Suspense>
					<Footer />
				</Route>

				<Route exact path="/">
					<Navigation />
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<Home />
					</Suspense>
					<Footer />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
