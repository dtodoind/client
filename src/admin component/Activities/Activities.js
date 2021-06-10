import React from "react";
import "./Activities.scss";
// import { IoIosPeople } from "react-icons/io";
import Notify from '../../admin component/Notify/Notify';
import male from '../../assets/profile_pic.svg'
import { BsFillBellFill } from "react-icons/bs";
import { Scrollbars } from "react-custom-scrollbars";
// import { TiTick } from "react-icons/ti";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { connect } from 'react-redux'

function Activities(props) {

	const { Notification }= props

	// var meeting = [
	// 	{
	// 		num: 19,
	// 		text: "Australia vknlrknglkrnl",
	// 	},
	// 	{
	// 		num: 29,
	// 		text: "India dfghjk loremknvlfknvlk",
	// 	},
	// 	{
	// 		num: 30,
	// 		text: "Argentina asdfghjklqwertyuixcvbn",
	// 	},
	// 	{
	// 		num: 30,
	// 		text: "Argentina asdfghjklqwertyuixcvbn",
	// 	},
	// ];

	window.addEventListener('resize', () => {
		if(window.innerWidth >= 768) {
			document.getElementsByClassName('scrollhei')[0].style.height = 'calc(100% - 55px)'
		} else {
			document.getElementsByClassName('scrollhei')[0].style.height = '400px'
		}
	})

	return (
		<div className="activities-container">
			<p className="a-header">Activities</p>
			<Scrollbars style={{ width: "100%", height: window.innerWidth >= 900 ? 'calc(100% - 55px)' : '400px' }} className="scrollhei">
				<VerticalTimeline layout={"1-column-left"}>
					{/* <VerticalTimelineElement
						className="vertical-timeline-element--work content"
						iconStyle={{ background: "#f8f9fa", color: "#ffc107" }}
						contentArrowStyle={{ borderRight: '0' }}
						icon={<IoIosPeople />}
					>
						<div className="meeting">
							<p className="title">Meetings</p>
							<div>
								{meeting.map((p,i) => (
									<div className="item-meet" key={i}>
										<p>
											<TiTick className="icon-tick" />
										</p>
										<p className="p-text"> {p.text}</p>
									</div>
								))}
							</div>
						</div>
					</VerticalTimelineElement> */}
					<VerticalTimelineElement
						className="vertical-timeline-element--work content"
						iconStyle={{ background: "#f8f9fa", color: "#BF5151" }}
						contentArrowStyle={{ borderRight: '0' }}
						icon={<BsFillBellFill />}
					>
						<div className="notification">
							<p className="title">Notifications</p>
							<div className="item-notification">
								{
									Notification?.slice(0).reverse().map((m,i) => 
										i < 5
										? <Notify name={m.FullName} key={i} message={m.Message} profile={male} cat={m.Notify_cate} index={i} drop='true'/>
										: null
									)
								}
							</div>
						</div>
					</VerticalTimelineElement>
				</VerticalTimeline>
			</Scrollbars>
		</div>
	);
}

const mapStateToProps = (state) => {
    return {
        Notification: state.Notification
    }
}

export default connect(mapStateToProps)(Activities);
