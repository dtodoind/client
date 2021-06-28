import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import './TopImg.scss'

function TopImg(props) {

    const { Single, topimg } = props
    const [imgtop, setImgTop] = useState(Single)
    const [wholeimg, setwholeimg] = useState()
    const [error,] = useState("File size should be less than 1 MB")
    const [lop, setlop] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:5000/topimages/all').then(res => {
            if(Single !== null) {
                if(Single.length !== 0) {
                    if(Single[Single.length - 1].TopImages_id !== res.data[res.data.length - 1].TopImages_id) {
                        topimg(res.data)
                    } 
                }
                setlop(true)
            } else {
                if(lop) {
                    if(res.data.length !== 0) {
                        topimg(res.data)
                    }
                    setlop(false)
                }
            }
        })
    }, [Single, topimg, lop])

    function bytesToSize(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return [parseFloat((bytes / Math.pow(k, i)).toFixed(dm)), sizes[i]];
    }

    const insertTopImg = (val) => {
        setImgTop(val.name)
        setwholeimg(val)
        var reader = new FileReader();
        reader.onload = function () {
            document.getElementsByClassName('img_cont')[0].innerHTML = `
                <img src=${this.result} alt="" class="image_display w-100 text-center py-2 my-1" />
            `
            // document.getElementsByClassName('image_display')[0].src = this.result;
        };
        
        if(val) {
            reader.readAsDataURL(val);
        }
    }

    const onchange = (e) => {
        if(e.target.files.length !== 0) {
            var size= bytesToSize(document.getElementsByName('file_image')[0].files[0].size)
            if(size[1] === "MB") {
                if(size[0] <= 1.00) {
                    insertTopImg(document.getElementsByName('file_image')[0].files[0])
                    document.getElementById("error3").style.display = "none"
                } else {
                    document.getElementById("error3").style.display = "inherit"
                }
            } else if(size[1] === "KB") {
                if(size[0] <= 1024.00) {
                    insertTopImg(document.getElementsByName('file_image')[0].files[0])
                    document.getElementById("error3").style.display = "none"
                } else {
                    document.getElementById("error3").style.display = "inherit"
                }
            } else {
                document.getElementById("error3").style.display = "inherit"
            }
            
        }
    }

    const save_img = async () => {
        if(Single === null) {
            var imgdata = new FormData()
            imgdata.append('topImage', wholeimg)
            await axios.post('http://localhost:5000/topimages/new', imgdata)
            // await axios.get('http://localhost:5000/topimages/all').then(res => console.log(res.data))
        } else {
            var formdata = new FormData()
            formdata.append('topImage', wholeimg)
            formdata.append('Image', imgtop)
            await axios.put(`http://localhost:5000/topimages/edit/${Single[0].TopImages_id}`, formdata)
            // await axios.get('http://localhost:5000/topimages/all').then(res => console.log(res.data))
        }
    }

    return (
        <div className="top_img">
            <input type="file" name="file_image" onChange={onchange} />
            <div id="error3" style={{color: 'red', fontWeight: '500', display: 'none'}}>{error}</div>
            <div className="img_cont w-100">
                {
                    Single === null
                    ? <div className="w-100 text-center py-2 my-1" style={{backgroundColor: 'rgba(0,0,0,0.05)'}}>No Image</div>
                    : <img src={Single.length === 0 ? null : 'http://localhost:5000/'+Single[0].Image} alt="" className="image_display w-100 text-center py-2 my-1" />
                }
            </div>
            <button className="btn-topimg" onClick={save_img}>Save</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        Single: state.Single
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        topimg: (val) => { 
            dispatch({
                type: 'TOPIMG',
                item: val
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopImg)
