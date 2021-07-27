import React, { lazy, Suspense, useEffect } from 'react'
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import loader from './assets/Infinity-1s-200px.gif'

import ScrollToTop from './component/ScrollToTop/ScrollToTop';
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
import ReactGa from 'react-ga'

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

	useEffect(() => {
		ReactGa.initialize('G-P8EVSKJD4B')

		// To report page views
		ReactGa.pageview('/')
	}, [])

	return (
		<div className="App">
			<Switch>
				{/* Admin Pages */}
				<Route path="/dtodoadmin159753">
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<Navi />
					</Suspense>
				</Route>

				{/* Client Pages */}
				<Route path = "/confirm/:token">
					<ScrollToTop />
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<Welcome  />
					</Suspense>
				</Route>
				<Route path="/exchange">
					<ScrollToTop />
					<Navigation />
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<Exchange/>
					</Suspense>
					<Footer />
				</Route>
				<Route path="/detail/:id">
					<ScrollToTop />
					<Navigation />
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<CardDetail/>
					</Suspense>
					<Footer />
				</Route>
				<Route path="/shipping">
					<ScrollToTop />
					<Navigation />
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<ShippingInfo />
					</Suspense>
					<Footer />
				</Route>

				<Route path="/account/:tabs">
					<ScrollToTop />
					<Navigation />
					{/* <Myaccount /> */}
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<Account/>
					</Suspense>
					<Footer /> 
				</Route>

				<Route path="/checkout">
					<ScrollToTop />
					<Navigation />
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<Checkout />
					</Suspense>
					<Footer />
				</Route>

				<Route path="/shopcart">
					<ScrollToTop />
					<Navigation />
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<Shopcart />
					</Suspense>
					<Footer />
				</Route>

				<Route path="/search/:searchitem">
					<ScrollToTop />
					<Navigation />
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<Search />
					</Suspense>
					<Footer />
				</Route>

				<Route path="/resetpassword">
					<ScrollToTop />
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<ResetPassword />
					</Suspense>
				</Route>

				<Route path="/forgotpassword">
					<ScrollToTop />
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<ForgotPassword />
					</Suspense>
				</Route>

				<Route path="/loginregister">
					<ScrollToTop />
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<LoginRegister />
					</Suspense>
				</Route>

				<Route path="/aboutus">
					<ScrollToTop />
					<Navigation />
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<AboutUs />
					</Suspense>
					<Footer />
				</Route>

				<Route path="/review">
					<ScrollToTop />
					<Navigation />
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<Review />
					</Suspense>
					<Footer />
				</Route>

				<Route path="/category">
					<ScrollToTop />
					<Navigation />
					<Suspense fallback={<div className="load"><div style={{width: '100px'}}><img src={loader} alt="loader" style={{width: '100%'}} /></div></div>}>
						<Category />
					</Suspense>
					<Footer />
				</Route>

				<Route exact path="/">
					<ScrollToTop />
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
