import React, { useEffect, useState } from 'react';
import {Table} from 'react-bootstrap'
import { connect } from 'react-redux'

import './TableUser.scss'
function TableUsers(props){

	const user = props.user
    const [userload, setUserload] = useState(10)
    const [users, setUser] = useState([])
    const [loading, setLoading] = useState(true)

    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if(scrollHeight - scrollTop === clientHeight) {
            setUserload(userload + 10)
        }
    }

    useEffect(() => {
        const loadnotf = () => {
            setLoading(true)
            const load = []
            user.map((ord, i) => {
                if(i < userload) {
                    load.push(ord)
                }
                return 0;
            })
            setUser(load)
            setLoading(false)
        }
        loadnotf()
    }, [user, userload])

	return(
			<div className='table-container'>
            	<div style={{overflowY: 'scroll', height: '450px'}} onScroll={handleScroll}>
					<Table responsive bordered hover className='table-users'>
						<thead className='header-table'>
							<tr>
								<th>Id</th>
								<th>Image</th>
								{/* <th>Username</th> */}
								<th>FirsName</th>
								<th>LastName</th>
								<th>Email</th>
								{/* <th>Password</th> */}
								<th>Adress</th>
								{/* <th>Gender</th> */}
								<th>Status</th>
							</tr>
						</thead>
						<tbody className='body-table'>
							{
								users.slice(0).reverse().map((u,i)=>(
								
									<tr key={i} style={{textAlign: 'center'}}>
										<td>{u.Users_id}</td>
										<td><img src={u.Image} alt='user' className='img'/></td>
										{/* <td>{u.Username}</td> */}
										<td>{u.FirstName}</td>
										<td>{u.LastName}</td>
										<td>{u.Email}</td>
										{/* <td>{u.Password}</td> */}
										<td><div style={{textAlign: 'left'}}>{JSON.parse(u.Address) !== null ? JSON.parse(u.Address)[0].map((a, i) => <p key={i} style={{margin: '0'}}>{a}<br /></p>) : null}</div></td>
										{/* <td>{u.Gender}</td> */}
										<td className='last-td-a'> <div className='color-active' style={{backgroundColor: u.Status === 'Active' ? 'green' : '#dc3545'}}><p className="py-2">{u.Status}</p></div> </td>
									</tr>
								))
							}
							{loading && <tr><td colSpan='6' style={{textAlign: 'center'}}>Loading...</td></tr>}
					
							{/* <tr>
								<td>2</td>
								<td>Jacob</td>
								<td>Thornton</td>
								<td>@fat</td>

								<td className='last-td-i'> <div className='color-inactive'><p className="py-2">Inactive</p></div> </td>
							</tr> */}
						</tbody>
					</Table>
				</div>
			</div>
	)
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(TableUsers);