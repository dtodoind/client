import React, { useEffect, useState } from "react";
// import Aboutimg from "./../../assets/Aboutimg.jpg";
import "./AboutUs.scss";
// import ReviewSlider from "../../component/ReviewSlider/ReviewSlider";
import ReactPlayer from "react-player/lazy";
import { MDBCard, MDBCardBody, MDBCol, MDBRow } from "mdbreact";
import { FaInstagram } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { BiPhone } from "react-icons/bi";
import video from "../../assets/video.mp4";
// import { VscMute, VscUnmute } from "react-icons/vsc";
import { connect } from "react-redux";
import axios from "axios";

import TopBanner from "../../component/Top Banner/TopBanner";

import categoryimg from "../../assets/banner-girls.png";

function AboutUs(props) {
	const [mute] = useState(true);

	const { About, aboutus } = props;

	useEffect(() => {
		axios.get("http://localhost:5000/aboutus/all").then(res => {
			if(res.data.length !== 0) {
				aboutus(res.data[0].Content)
			}
		});
	});

	// function novol() {
	// 	if (mute === true) {
	// 		setmute(false);
	// 	} else {
	// 		setmute(true);
	// 	}
	// }

	return (
		<div className="AboutUs">
			{/* <img src={Aboutimg} alt="About" className="About-img" />
			<div className='name-about'>
				<h3>About Us</h3>
			</div> */}
			<TopBanner img={categoryimg} name="NOSOTROS" />
			<div className="contact-cards">
				<MDBRow className="contact-cards">
					<MDBCol lg="4">
						{" "}
						<MDBCard border="dark" className="text-center">
							<MDBCardBody>
								<GoLocation className="about-icon" /> Zufriategui 830,
								Ituzaingo. Argentina
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
					<MDBCol lg="4">
						{" "}
						<MDBCard border="dark" className="text-center">
							<MDBCardBody>
								<BiPhone className="about-icon" />
								+54 115760-3236
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
					<MDBCol lg="4">
						{" "}
						<MDBCard border="dark" className="text-center">
							<MDBCardBody>
								<FaInstagram className="about-icon" /> dtodoind
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
			</div>
			<div className="about-info">
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg">
							<ReactPlayer
								url={video}
								className="react-player"
								controls={false}
								height="500px"
								width="100%"
								muted={mute}
								playing
								loop
							/>
							{/* <button className="muted" onClick={() => novol()}>
								{mute ? (
									<VscMute fontSize="30px" />
								) : (
									<VscUnmute fontSize="30px" />
								)}
							</button> */}
						</div>
						<div className="col-lg py-3 d-flex justify-content-center about-text-container">
							<div className="about-text">
								<h5 className="title-text">
								Bienvenido a DTODO una tienda online 
								</h5>
								<p>
									{/* Somos una tienda de ropa donde nos gusta dejar satisfechos a
									nuestros clientes y puedan encontrar todo lo que buscan en
									nuestro local, por eso ofrecemos ropa para niños, niñas, bebes
									y juveniles. siempre llenamos los interiores de nuestro local
									con mercaderia que ustedes solicitan para que se vayan felices
									y satisfechos de haber encontrado lo que buscaban y a un buen
									precio. */}
									{About}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				{/* <ReviewSlider /> */}
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		About: state.Aboutus,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		aboutus: (val) => {
			dispatch({
				type: "ABOUTUS",
				item: val,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
