import React, { useEffect, useState } from "react";

import { FaUsers } from "react-icons/fa";
import {MDBRow, MDBCol } from "mdbreact";
import CardGraphic from './../../admin component/CardGraphic/CardGraphic'
import "./Users.scss";
import TableUsers from "../../admin component/TableUsers/TableUsers";
import { connect } from 'react-redux'
import axios from 'axios'

function Users(props) {

	const { allUser, user } = props
    const [lop, setlop] = useState(true)

	useEffect(() => {
		axios.get('https://dtodo-indumentaria-server.herokuapp.com/users/all').then(res => {
			if(user.length !== 0) {
				if(user[user.length - 1].Users_id !== res.data[res.data.length - 1].Users_id) {
					allUser(res.data)
				}
				setlop(true)
			} else {
				if(lop) {
					allUser(res.data)
					setlop(false)
				}
			}
		})
	}, [user, allUser, lop])

	return (
		<div className="users">
			<div className="tag">
				<div className="dash_icon">
					<FaUsers />
				</div>
				<p style={{ fontSize: "18px", margin: "0", fontWeight: "400" }}>
					Users
				</p>
			</div>

			<div className="container-userinfo">
				<div>
					<MDBRow>
						<MDBCol md="4"><CardGraphic titleU='Total Views' amountU='264k'  perU='88,9' data={[12, 1, 3, 5, 2, 3, 9, 9, 9, 9,5, 2, 3,]}/></MDBCol>
						<MDBCol md="4"><CardGraphic titleU='Products Sold' amountU='2470k'  perU='9,99' data={[12, 1, 3, 5, 2, 3, 9, 5, 5, 5,5, 2, 3,]}/></MDBCol>
						<MDBCol md="4"><CardGraphic titleU='Total Earnings' amountU='250k'  perU='77.9' data={[12, 1, 3, 5, 2, 3, 9, 6, 4, 3,5, 2, 3,]}/></MDBCol>
					</MDBRow>
				</div>

				<div className='tableusers'>
						<h1>Users Info</h1>
						<TableUsers/>
				</div>
		
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        allUser: (val) => { 
            dispatch({
                type: 'SET_USER',
                item: val
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
