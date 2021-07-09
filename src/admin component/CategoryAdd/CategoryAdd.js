import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { GoPlusSmall } from 'react-icons/go'
import { IoClose } from 'react-icons/io5'

import './CategoryAdd.scss'
import axios from 'axios'

function CategoryAdd(props) {

    const CategoryAdd = props.CategoryAdd
    const { categoryadd } = props
    const [lop, setlop] = useState(true)
    const [prev_id, setPrev_id] = useState(0)
    
    useEffect(() => {
        axios.get('https://dtodo-indumentaria-server.herokuapp.com/category/all').then(async (res) => {
            if(CategoryAdd.length !== 0) {
                if(CategoryAdd[CategoryAdd.length - 1].Category_id !== res.data[res.data.length - 1].Category_id) {
                    categoryadd(res.data)
                }
                if(localStorage.getItem('loop') === '1') {
                    // setPrev_id(res.data[res.data.length - 1].Category_id)
                    localStorage.removeItem('loop')
                }
                setlop(true)
            } else {
                if(lop) {
                    if(localStorage.getItem('loop') === null && res.data.length === 0) {
                        localStorage.setItem('loop', '1')
                        await axios.post('https://dtodo-indumentaria-server.herokuapp.com/category/new', {Name: ''}).then(res => setPrev_id(res.data.Category_id))
                    }
                    categoryadd(res.data)
                    setlop(false)
                }
            }
        })
    }, [CategoryAdd, categoryadd, lop])

    // window.onload = () => {
    //     for(var x=0; x<document.getElementsByClassName('close-pos').length; x++) {
    //         if(CategoryAdd[x] === '') {
    //             console.log(x+': '+CategoryAdd[x])
    //         }
    //         document.getElementsByName('inputname'+x)[0].value = CategoryAdd[x]
    //     }
    // }

    const focusIn = (i) => {
        for(var c=0; c<document.getElementsByClassName('close-pos').length; c++) {
            if(c === i) {
                document.getElementsByClassName('close-pos')[i].style.display = 'inherit'
            } else {
                document.getElementsByClassName('close-pos')[c].style.display = 'none'
            }
        }
    }

    const addcategory = async (i) => {
        var newval = {
            Name: "",
        }
        await axios.post('https://dtodo-indumentaria-server.herokuapp.com/category/new', newval)
        var cate1 = await axios.get('https://dtodo-indumentaria-server.herokuapp.com/category/all').then(res => res.data)
        // cate1.splice(i+1, 0, "")
        props.categoryadd(cate1)
        upd()
        for(let v=0; v<CategoryAdd.length; v++) {
            if(document.getElementsByName(String(v))[0] !== undefined) {
                document.getElementsByName(String(v))[0].value = CategoryAdd[v].Name
            }
        }
        // console.log(CategoryAdd)
    } 

    const onchangeval = async (e) => {
        // var index = parseInt(e.target.name)
        // console.log(e.target.id)
        // if(CategoryAdd.length === 0) {
        //     var val = {
        //         Name: e.target.value,
        //     }
        //     await axios.post('https://dtodo-indumentaria-server.herokuapp.com/category/new', val)
        //     document.getElementById(e.target.id).focus()
        // } else {
        //     console.log('its here')
            setPrev_id(parseInt(e.target.id))
            var edit = {
                Category_id: parseInt(e.target.id),
                Name: e.target.value,
            }
            await axios.put('https://dtodo-indumentaria-server.herokuapp.com/category/edit', edit)
        // }
        let c = await axios.get('https://dtodo-indumentaria-server.herokuapp.com/category/all').then(res => res.data)
        // c.splice(index, 1, e.target.value)
        
        props.categoryadd(c)
    }

    const remove_cate = async (i) => {
        await axios.delete(`https://dtodo-indumentaria-server.herokuapp.com/category/delete/${i}`)
        var c = await axios.get('https://dtodo-indumentaria-server.herokuapp.com/category/all').then(res => res.data)
        // c.splice(i, 1)
        props.categoryadd(c)
        upd()
        for(let v=0; v<c.length; v++) {
            if(document.getElementsByName(String(v))[0] !== undefined) {
                document.getElementsByName(String(v))[0].value = c[v].Name
            }
        }
    }

    const upd = () => {
        return (
            CategoryAdd.length === 0
            ? <div className="col-md-3 text-center">
                <div className="container-fluid py-2">
                    <div className="row">
                        <div className={"col-10 text-right p-0 position-relative"}>
                            <input type="text" className="w-100" onChange={onchangeval} name={0} id={prev_id + 1} onFocus={() => focusIn(0)} />
                        </div>
                        <div className="col-2 text-left p-0">
                            <button className="btn-cate" onClick={() => addcategory(0)}><GoPlusSmall fontSize='20px' /></button>
                        </div>
                    </div>
                </div>
            </div>
            : CategoryAdd.map((c, i) => 
                <div className="col-md-3 text-center" key={i}>
                    <div className="container-fluid py-2">
                        <div className="row">
                            <div className={"col-10 text-right p-0 position-relative any"+i}>
                                <IoClose className="close-pos px-1" style={{display: 'none'}} onClick={() => remove_cate(c.Category_id)} />
                                <input type="text" className="w-100" defaultValue={c.Name} onChange={onchangeval} name={i} id={c.Category_id} onFocus={() => focusIn(i)} />
                            </div>
                            <div className="col-2 text-left p-0">
                                <button className="btn-cate" onClick={() => addcategory(i)}><GoPlusSmall fontSize='20px' /></button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        )
    }

    return (
        <div className="categoryadd">
            <div className="container-fluid">
                <div className="row">
                    {upd()}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        CategoryAdd: state.CategoryAdd
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        categoryadd: (val) => { 
            dispatch({
                type: 'CATEGORYADD',
                item: val
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAdd)
