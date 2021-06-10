import React, { useEffect, useState, useCallback } from 'react'

import './Colorpicker.scss'
import { connect } from 'react-redux'
import { IoCloseCircle } from 'react-icons/io5'
import { AiFillEdit } from 'react-icons/ai'
import ImageSelection from '../ImageSelection/ImageSelection'
import axios from 'axios';

import Table from 'react-bootstrap/Table'

function Colorpicker({colap, ...props}) {

    const { Products, allproduct } = props
    const [sizeerror, setSizeError] = useState()
    const [qtyerror, setQtyError] = useState()
    const [priceerror, setPriceError] = useState()
    const [u, setu] = useState('color')
    const [colorerror, setColorError] = useState()
    const [img_store, setImg_store] = useState([])

    Products[colap].color = JSON.parse(Products[colap].Color)
    Products[colap].size = JSON.parse(Products[colap].Size)
    Products[colap].qty = JSON.parse(Products[colap].Stock)
    Products[colap].price = JSON.parse(Products[colap].Price)
    Products[colap].images = JSON.parse(Products[colap].Image)

    const mainedit = useCallback(async (val) => {
        var edit_val = {
            Product_id: Products[colap].Product_id, 
            Name: Products[colap].Name,
            Category_id: Products[colap].Category.Category_id,
            Description: Products[colap].des,
            Image: JSON.stringify(Products[colap].images),
            Color: JSON.stringify(Products[colap].color),
            Size: JSON.stringify(Products[colap].size),
            Stock: JSON.stringify(Products[colap].qty),
            Price: JSON.stringify(Products[colap].price),
        }
        await axios.put('https://dtodo-indumentaria-server.herokuapp.com/product/edit', edit_val)

        // console.log(val)
        if(val === 'update') {
            await axios.get('https://dtodo-indumentaria-server.herokuapp.com/product/all').then(res => allproduct(res.data))
        }
    }, [Products, allproduct, colap])

    useEffect(() => {
        mainedit()
    }, [mainedit])

    
    const addval = async (e) => {
        if(e.key === "Enter") {
            if(e.target.name === 'color') {
                if(e.target.value === '') {
                    document.getElementsByClassName(e.target.name+'error')[0].style.display = 'block'
                    setColorError('Required')
                } else if(colorerror === 'Already Exist') {
                } else {
                    Products[colap].color = [...Products[colap].color, e.target.value]
                    Products[colap].images = [...Products[colap].images, []]
                    Products[colap].size = [...Products[colap].size, ['']]
                    Products[colap].qty = [...Products[colap].qty, []]
                    Products[colap].price = [...Products[colap].price, []]
                    // if(Products[colap].images) {
                    //     Products[colap].images = [...Products[colap].images, []]
                    // } else {
                    //     Products[colap].images = [[]]
                    // }
                    mainedit('update')
                    e.target.value = ''
                    setu('color')
                }
            }

            if(e.target.name === 'fileupload') {
                // console.log(e.target.value.replace('C:\\fakepath\\', ''))
            }
        }
    }

    const diff_record = async (e) => {
        if(e.key === 'Enter') {
            var i = parseInt(e.target.className)
            var le = Products[colap].size[i].length
            var sec_j = 0
            var sec_tot = 0
            for(var j=0; j<le-1; j++) {
                if((typeof Products[colap].size[i][j]) === 'number') {
                    sec_j = Products[colap].size[i][j]
                    sec_tot = Products[colap].qty[i][j]
                }
            }
            
            var pro_len = 0
            if(colap === 0) {
                // pro_len = Products[colap].color.length
            } else if(colap === 1) {
                pro_len = Products[colap-1].color.length
            } else {
                for(var k=0; k<Products.length-1; k++){
                    if(colap === k) {
                        break
                    }
                    pro_len = Products[k].color.length + pro_len
                }
            }
            
            if(e.target.name === "size") {
                if(e.target.value !== "" && sizeerror !== "Already Exist") {
                    if(colap === 0) {
                        document.getElementsByName('qty')[parseInt(e.target.className)+colap].focus()
                    } else {
                        document.getElementsByName('qty')[parseInt(e.target.className)+pro_len].focus()
                    }
                } 
                else {
                    document.getElementsByClassName('sizeerror'+e.target.className)[0].style.display = 'block'
                }
            } else if(e.target.name === "s") {
                var editsizeerror = document.getElementsByClassName('editsizeerror'+e.target.className)[0].innerHTML
                if(e.target.value !== "" && editsizeerror !== "Already Exist") {
                    document.getElementsByName('q')[0].focus()
                }
                else {
                    document.getElementsByClassName('editsizeerror'+e.target.className)[0].style.display = 'block'
                }
            }
            
            if(e.target.name === "qty") {
                if(e.target.value !== "" && document.getElementsByName('size')[parseInt(e.target.className)+pro_len].value !== '') {
                    if(colap === 0) {
                        document.getElementsByName('price')[parseInt(e.target.className)+colap].focus()
                    } else {
                        document.getElementsByName('price')[parseInt(e.target.className)+pro_len].focus()
                    }
                } else {
                    if(document.getElementsByName('size')[parseInt(e.target.className)].value === '') {
                        document.getElementsByClassName('sizeerror'+e.target.className)[0].style.display = 'block'
                    }
                    if(e.target.value === '') {
                        document.getElementsByClassName('qtyerror'+e.target.className)[0].style.display = 'block'
                    }
                }
            } else if(e.target.name === 'q') {
                var editqtyerror = document.getElementsByClassName('edit'+e.target.id+'error'+e.target.className)[0].innerHTML
                if(e.target.value !== "" || (e.target.value !== "" && document.getElementsByName('s')[parseInt(e.target.className)].value !== '' && editqtyerror === 'Required')) {
                    document.getElementsByName('p')[0].focus()
                } else {
                    if(document.getElementsByName('s')[parseInt(e.target.className)].value === '') {
                        document.getElementsByClassName('editsizeerror'+e.target.className)[0].style.display = 'block'
                    }
                    if(e.target.value === '') {
                        document.getElementsByClassName('editqtyerror'+e.target.className)[0].style.display = 'block'
                    }
                }
            }
            
            if(e.target.name === "price") {
                // console.log(parseInt(e.target.className), pro_len)
                var s = document.getElementsByName('size')[parseInt(e.target.className)+pro_len].value
                var q = document.getElementsByName('qty')[parseInt(e.target.className)+pro_len].value
                if(e.target.value !== "" && s !== "" && q !== "" && sizeerror !== 'Already Exist') {
                    var len = Products[colap].size[parseInt(e.target.className)].length
                    Products[colap].size[parseInt(e.target.className)].splice(len-1, 0, s)
                    Products[colap].qty[parseInt(e.target.className)][len-1] = parseInt(q)
                    Products[colap].price[parseInt(e.target.className)][len-1] = parseInt(e.target.value)
                    setu('size')

                    await mainedit('update')

                    // storeproduct()

                    document.getElementsByName('size')[parseInt(e.target.className)].focus()
                } else {
                    if(s === '') {
                        setSizeError('Required')
                        document.getElementsByClassName('sizeerror'+e.target.className)[0].style.display = 'block'
                    }
                    if(q === '') {
                        setQtyError('Required')
                        document.getElementsByClassName('qtyerror'+e.target.className)[0].style.display = 'block'
                    }
                    if(e.target.value === '') {
                        setPriceError('Required')
                        document.getElementsByClassName('priceerror'+e.target.className)[0].style.display = 'block'
                    }
                }
            } else if(e.target.name === 'p') {
                var si = document.getElementsByName('s')[0].value
                var qt = document.getElementsByName('q')[0].value
                var editserror = document.getElementsByClassName('editsizeerror'+e.target.className)[0].innerHTML
                if(e.target.value !== "" && si !== "" && qt !== "" && editserror !== 'Already Exist') {
                    Products[colap].size[parseInt(e.target.className)].splice(sec_j, 1, si)
                    Products[colap].qty[parseInt(e.target.className)][sec_j] = parseInt(qt)
                    Products[colap].price[parseInt(e.target.className)][sec_j] = parseInt(e.target.value)

                    await mainedit('update')
                    
                    document.getElementsByClassName(Products[colap].size[i][sec_j]+colap+i+sec_j)[sec_tot].nextElementSibling.nextElementSibling.innerHTML = Products[colap].price[i][sec_j]
                    document.getElementsByClassName(Products[colap].size[i][sec_j]+colap+i+sec_j)[sec_tot].nextElementSibling.innerHTML = Products[colap].qty[i][sec_j]
                    document.getElementsByClassName(Products[colap].size[i][sec_j]+colap+i+sec_j)[sec_tot].innerHTML = Products[colap].size[i][sec_j]

                    var lengt = document.getElementsByClassName('edit_icon_ind').length
                    for(var c=0; c<lengt; c++) {
                        document.getElementsByClassName('edit_icon_ind')[c].style.display = 'inline'
                        document.getElementsByClassName('close_icon_ind')[c].style.display = 'inline'
                    }
                    
                    setu('size')
                    upd(u)
                } else {
                    if(si === '') {
                        document.getElementsByClassName('editsizeerror'+e.target.className)[0].innerHTML = 'Required'
                        document.getElementsByClassName('editsizeerror'+e.target.className)[0].style.display = 'block'
                    }
                    if(qt === '') {
                        document.getElementsByClassName('editqtyerror'+e.target.className)[0].innerHTML = 'Required'
                        document.getElementsByClassName('editqtyerror'+e.target.className)[0].style.display = 'block'
                    }
                    if(e.target.value === '') {
                        document.getElementsByClassName('editpriceerror'+e.target.className)[0].innerHTML = 'Required'
                        document.getElementsByClassName('editpriceerror'+e.target.className)[0].style.display = 'block'
                    }
                }

            }
        }
    }

    const whole_remove = (val) => {
        Products[colap].color.splice(val, 1)
        Products[colap].size.splice(val, 1)
        Products[colap].qty.splice(val, 1)
        Products[colap].price.splice(val, 1)
        Products[colap].images.splice(val, 1)
        mainedit('update')
        // console.log(Products[colap])
        setu('color')
        upd(u)
    }

    const remove_ind = async (i,j) => {
        Products[colap].size[i].splice(j, 1)
        Products[colap].qty[i].splice(j, 1)
        Products[colap].price[i].splice(j, 1)
        mainedit('update')
        setu('color')
        upd(u)
    }

    const edit_ind = (i,j) => {
        var tot = 0
        var a = 0
        var lengt = document.getElementsByClassName('edit_icon_ind').length
        for(var c=0; c<lengt; c++) {
            document.getElementsByClassName('edit_icon_ind')[c].style.display = 'none'
            document.getElementsByClassName('close_icon_ind')[c].style.display = 'none'
        }
        if(document.getElementsByClassName(Products[colap].size[i][j]+colap+i+j).length > 1) {
            for(var m=0; m<Products[colap].size.length; m++) {
                if(m === i) {
                    for(var v=0; v<Products[colap].size[m].length; v++) {
                        if(v === j) {
                            if(colap > a) {
                                tot++
                            }
                            // console.log(m,v)
                            // console.log(tot)
                            // console.log(document.getElementsByClassName(Products[colap].size[m][v])[tot].parentElement)
                            
                            document.getElementsByClassName(Products[colap].size[i][j]+colap+i+j)[tot].nextElementSibling.nextElementSibling.innerHTML = `
                                <input type="text" placeholder="Enter Price" id="price" name="p" class=${i} value=${Products[colap].price[i][j]} />
                                <div style="color: red; display: none;" class=${'editpriceerror'+i}></div>
                            `
                            var price_input = document.getElementById('price')
                            price_input.addEventListener('keyup', diff_record)
                            price_input.addEventListener('input', change_error)

                            document.getElementsByClassName(Products[colap].size[i][j]+colap+i+j)[tot].nextElementSibling.innerHTML = `
                                <input type="text" placeholder="Enter Qty" id="qty" name="q" class=${i} value=${Products[colap].qty[i][j]} />
                                <div style="color: red; display: none;" class=${'editqtyerror'+i}></div>
                            `
                            var qty_input = document.getElementById('qty')
                            qty_input.addEventListener('keyup', diff_record)
                            qty_input.addEventListener('input', change_error)
                            
                            document.getElementsByClassName(Products[colap].size[i][j+colap]+i+j)[tot].innerHTML = `
                                <input type="text" placeholder="Enter Size" id="size" name="s" class=${i} value=${Products[colap].size[i][j]} autoFocus />
                                <div style="color: red; display: none;" class=${'editsizeerror'+i}></div>
                            `
                            var size_input = document.getElementById('size')
                            size_input.addEventListener('keyup', diff_record)
                            size_input.addEventListener('input', change_error)

                            Products[colap].size[i].splice(j, 1, j)
                            Products[colap].qty[i].splice(j, 1, tot)
                            Products[colap].price[i].splice(j, 1, i)

                            break;
                        }
                    }
                }
                a = m
            }
        } else {
            document.getElementsByClassName(Products[colap].size[i][j]+colap+i+j)[0].nextElementSibling.nextElementSibling.innerHTML = `
                <input type="text" placeholder="Enter Price" id="price" name="p" class=${i} value=${Products[colap].price[i][j]} />
                <div style="color: red; display: none;" class=${'editpriceerror'+i}></div>
            `
            var p_input = document.getElementById('price')
            p_input.addEventListener('keyup', diff_record)
            p_input.addEventListener('input', change_error)

            document.getElementsByClassName(Products[colap].size[i][j]+colap+i+j)[0].nextElementSibling.innerHTML = `
                <input type="text" placeholder="Enter Qty" id="qty" name="q" class=${i} value=${Products[colap].qty[i][j]} />
                <div style="color: red; display: none;" class=${'editqtyerror'+i}></div>
            `
            var q_input = document.getElementById('qty')
            q_input.addEventListener('keyup', diff_record)
            q_input.addEventListener('input', change_error)
            
            document.getElementsByClassName(Products[colap].size[i][j]+colap+i+j)[0].innerHTML = `
                <input type="text" placeholder="Enter Size" id="size" name="s" class=${i} value=${Products[colap].size[i][j]} />
                <div style="color: red; display: none;" class=${'editsizeerror'+i}></div>
            `
            var s_input = document.getElementById('size')
            s_input.addEventListener('keyup', diff_record)
            s_input.addEventListener('input', change_error)

            Products[colap].size[i].splice(j, 1, j)
            Products[colap].qty[i].splice(j, 1, 0)
            Products[colap].price[i].splice(j, 1, i)
        }
    }

    const upd = (val) => {
        if(val === 'size') {
            return (
                Products[colap].color?.length === 0
                ? null
                : Products[colap].size?.map((s,i) => 
                    Products[colap].size[i]?.map((sz,j) => 
                        j !== Products[colap].size[i].length-1
                        ? <tr key={j}>
                            {
                                j === 0
                                ? <td rowSpan={Products[colap].size[i].length} className="color_name">
                                    <IoCloseCircle className="close_icon" onClick={() => whole_remove(i)} />
                                    {Products[colap].color[i]}
                                    {/* <div style={{width: '100%', height: '50px', backgroundColor: `${Products[colap].color[i]}`}}></div> */}
                                </td>
                                : null 
                            }
                            {
                                j === 0
                                ? <td rowSpan={Products[colap].size[i].length}>
                                    <ImageSelection imgid={i} colap={colap} mainedit={mainedit} />
                                </td>
                                : null
                            }
                            <td className={sz+colap+i+j}>{sz}</td>
                            <td>{Products[colap].qty[i][j]}</td>
                            <td>{Products[colap].price[i][j]}</td>
                            <td className="edit">
                                <IoCloseCircle style={{display: 'inline'}} className="close_icon_ind" onClick={() => remove_ind(i,j)} />
                                <AiFillEdit style={{display: 'inline'}} className="edit_icon_ind" onClick={() => edit_ind(i,j)} />
                            </td>
                        </tr>
                        : <tr key={j}>
                            {
                                Products[colap].size[i].length === 1
                                ? <td className="color_name"><IoCloseCircle className="close_icon" onClick={() => whole_remove(i)} />{Products[colap].color[i]}</td>
                                : null
                            }
                            {
                                Products[colap].size[i].length === 1
                                ? <td>
                                    <ImageSelection imgid={i} colap={colap} mainedit={mainedit} />
                                </td>
                                : null
                            }
                            <td>
                                <input type="text" placeholder="Enter Size" name="size" className={i} onKeyUp={diff_record} onChange={change_error} autoFocus />
                                <div style={{color: 'red', display: 'none'}} className={'sizeerror'+i}>{sizeerror}</div>
                            </td>
                            <td>
                                <input type="text" placeholder="Enter qty" name="qty" className={i} onKeyUp={diff_record} onChange={change_error} />
                                <div style={{color: 'red', display: 'none'}} className={'qtyerror'+i}>{qtyerror}</div>
                            </td>
                            <td>
                                <input type="text" placeholder="Enter Price" name="price" className={i} onKeyUp={diff_record} onChange={change_error} />
                                <div style={{color: 'red', display: 'none'}} className={'priceerror'+i}>{priceerror}</div>
                            </td>
                        </tr>
                    )
                )
            )
        } else {
            return (
                Products[colap].color?.length === 0
                ? null
                : Products[colap].color?.map((s,i) => 
                    Products[colap].size[i]?.map((sz,j) => 
                        j !== Products[colap].size[i].length-1
                        ? <tr key={j}>
                            {
                                j === 0
                                ? <td rowSpan={Products[colap].size[i].length} className="color_name">
                                    <IoCloseCircle className="close_icon" onClick={() => whole_remove(i)} />
                                    {Products[colap].color[i]}
                                    {/* <div style={{width: '100%', height: '50px', backgroundColor: `${Products[colap].color[i]}`}}></div> */}
                                </td>
                                : null 
                            }
                            {
                                j === 0
                                ? <td rowSpan={Products[colap].size[i].length}>
                                    <ImageSelection imgid={i} colap={colap} mainedit={mainedit} />
                                </td>
                                : null
                            }
                            <td className={sz+colap+i+j}>{sz}</td>
                            <td>{Products[colap].qty[i][j]}</td>
                            <td>{Products[colap].price[i][j]}</td>
                            <td className="edit">
                                <IoCloseCircle style={{display: 'inline'}} className="close_icon_ind" onClick={() => remove_ind(i,j)} />
                                <AiFillEdit style={{display: 'inline'}} className="edit_icon_ind" onClick={() => edit_ind(i,j)} />
                            </td>
                        </tr>
                        : <tr key={j}>
                            {
                                Products[colap].size[i].length === 1
                                ? <td className="color_name"><IoCloseCircle className="close_icon" onClick={() => whole_remove(i)} />{Products[colap].color[i]}</td>
                                : null
                            }
                            {
                                Products[colap].size[i].length === 1
                                ? <td><ImageSelection imgid={i} colap={colap} mainedit={mainedit} /></td>
                                : null
                            }
                            <td>
                                <input type="text" placeholder="Enter Size" name="size" className={i} onKeyUp={diff_record} onChange={change_error} autoFocus />
                                <div style={{color: 'red', display: 'none'}} className={'sizeerror'+i}>{sizeerror}</div>
                            </td>
                            <td>
                                <input type="text" placeholder="Enter Qty" name="qty" className={i} onKeyUp={diff_record} onChange={change_error} />
                                <div style={{color: 'red', display: 'none'}} className={'qtyerror'+i}>{qtyerror}</div>
                            </td>
                            <td>
                                <input type="text" placeholder="Enter Price" name="price" className={i} onKeyUp={diff_record} onChange={change_error} />
                                <div style={{color: 'red', display: 'none'}} className={'priceerror'+i}>{priceerror}</div>
                            </td>
                        </tr>
                    )
                )
            )
        }
    }

    const change_error = (e) => {
        if(e.target.name === "size") {
            var leng = Products[colap].size[parseInt(e.target.className)].length
            for(var i=0; i<leng-1; i++) {
                if(e.target.value === Products[colap].size[parseInt(e.target.className)][i]) {
                    document.getElementsByClassName(e.target.name+'error'+e.target.className)[0].style.display = 'block'
                    setSizeError('Already Exist')
                    break;
                } else if(e.target.value === "") {
                    document.getElementsByClassName(e.target.name+'error'+e.target.className)[0].style.display = 'block'
                    setSizeError('Required')
                } else {
                    setSizeError('')
                }
            }
        } else if(e.target.name === "s") {
            var lengg = Products[colap].size[parseInt(e.target.className)].length
            for(var q=0; q<lengg-1; q++) {
                if(e.target.value === Products[colap].size[parseInt(e.target.className)][q]) {
                    document.getElementsByClassName('edit'+e.target.id+'error'+e.target.className)[0].style.display = 'block'
                    document.getElementsByClassName('edit'+e.target.id+'error'+e.target.className)[0].innerHTML = 'Already Exist'
                    break;
                } else if(e.target.value === "") {
                    document.getElementsByClassName('edit'+e.target.id+'error'+e.target.className)[0].style.display = 'block'
                    document.getElementsByClassName('edit'+e.target.id+'error'+e.target.className)[0].innerHTML = 'Required'
                } else {
                    document.getElementsByClassName('edit'+e.target.id+'error'+e.target.className)[0].innerHTML = ''
                }
            }
        }

        if(e.target.name === "qty") {
            var q_leng = Products[colap].size[parseInt(e.target.className)].length
            for(var w=0; w<q_leng-1; w++) {
                if(e.target.value === "") {
                    document.getElementsByClassName(e.target.name+'error'+e.target.className)[0].style.display = 'block'
                    setQtyError('Required')
                } else {
                    setQtyError('')
                }
            }
        } else if(e.target.name === "q") {
            var q_leng1 = Products[colap].size[parseInt(e.target.className)].length
            for(var a=0; a<q_leng1-1; a++) {
                if(e.target.value === "") {
                    document.getElementsByClassName('edit'+e.target.id+'error'+e.target.className)[0].style.display = 'block'
                    document.getElementsByClassName('edit'+e.target.id+'error'+e.target.className)[0].innerHTML = 'Required'
                } else {
                    document.getElementsByClassName('edit'+e.target.id+'error'+e.target.className)[0].innerHTML = ''
                }
            }
        }

        if(e.target.name === "price") {
            var p_leng = Products[colap].size[parseInt(e.target.className)].length
            for(var r=0; r<p_leng-1; r++) {
                if(e.target.value === "") {
                    document.getElementsByClassName(e.target.name+'error'+e.target.className)[0].style.display = 'block'
                    setPriceError('Required')
                } else {
                    setPriceError('')
                }
            }
        } else if(e.target.name === "p") {
            var p_leng1 = Products[colap].size[parseInt(e.target.className)].length
            for(var s=0; s<p_leng1-1; s++) {
                if(e.target.value === "") {
                    document.getElementsByClassName('edit'+e.target.id+'error'+e.target.className)[0].style.display = 'block'
                    document.getElementsByClassName('edit'+e.target.id+'error'+e.target.className)[0].innerHTML = 'Required'
                } else {
                    document.getElementsByClassName('edit'+e.target.id+'error'+e.target.className)[0].innerHTML = ''
                }
            }
        }

        if(e.target.name === 'color') {
            // console.log(e.target.value.replace('C:\\fakepath\\', ''))
            var l = Products[colap].color.length
            for(var j=0; j<l; j++) {
                if(e.target.value === Products[colap].color[j]) {
                    document.getElementsByClassName(e.target.name+'error')[0].style.display = 'block'
                    setColorError('Already Exist')
                    break;
                } else if(e.target.value === "") {
                    document.getElementsByClassName(e.target.name+'error')[0].style.display = 'block'
                    setColorError('Required')
                } else {
                    setColorError('')
                }
            }
        }

        if(e.target.name === 'fileupload') {
            var img = img_store
            var fr=new FileReader()
            fr.onload = function() {
                document.getElementById('target').src = this.result
                document.getElementById('target').alt = e.target.value.replace('C\\fakepath\\', '')
            }
            fr.readAsDataURL(document.getElementsByName(e.target.name)[0].files[0])
            setImg_store(img)
        }
    }

    return (
        <div className="color-pick">
            <Table striped id={"collapse"+colap} className="collapse in">
                <thead>
                    <tr className="head">
                        <th>Color</th>
                        <th>Images</th>
                        <th>Size</th>
                        <th>Total Quantity</th>
                        <th>Price Per item</th>
                        <th>Edit/Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {upd(u)}
                    <tr>
                        <td style={{width: '200px'}}><h5 style={{padding: '10px'}}>Choose Color</h5></td>
                        <td style={{padding: '10px 0px'}}>
                            <input type="text" placeholder="Enter Color" name="color" onKeyUp={addval} onChange={change_error} />
                            <div style={{color: 'red', display: 'none'}} className={'colorerror'}>{colorerror}</div>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        Products: state.Products
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        allproduct: (val) => {
            dispatch({
                type: 'PRODUCTS',
                item: val
            }) 
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Colorpicker)
