import React, { useCallback, useEffect, useState, useRef } from "react";

import './ImageSelection.scss'
import { connect } from 'react-redux'
import axios from "axios";

function ImageSelection({imgid, colap, mainedit, ...props}) {

	const Products = props.Products
    const [error,] = useState("File size should be less than 50 KB")

	let slideIndex = useRef(1);

	function plusSlides(n) {
		for(var w=0; w<Products.length; w++) {
			if(colap === w) {
				for(var v=0; v<Products[w].images.length; v++) {
					if(imgid === v) {
						// console.log(colap, imgid, slideIndex, Products[colap].images[imgid].length)
						if(Products[colap].images[imgid].length > slideIndex.current) {
							showSlides(slideIndex.current += n);
						} else if((imgid === 0 ? 0 : Products[colap].images[imgid-1].length) < slideIndex.current) {
							slideIndex.current = Products[colap].images[imgid].length
							showSlides(slideIndex.current += n)
						} else {
							slideIndex.current = 0
							showSlides(slideIndex.current += n);
						}
						break;
					}
				}
			}
		}
	}

	const showSlides = useCallback((n) => {
		var i;
		var slides = document.getElementsByClassName("slides"+String(colap) + String(imgid));
		var dots = document.getElementsByClassName("any"+ String(colap) + String(imgid));
		if (n > slides.length) {
			slideIndex.current = 1
		}
		if (n < 1) {
			slideIndex.current = slides.length
		}
		for (i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}
		for (i = 0; i < dots.length; i++) {
			dots[i].className = dots[i].className.replace(" active", "");
		}
		slides[slideIndex.current-1].style.display = "flex";
		dots[slideIndex.current-1].className += " active";
	}, [colap, imgid])

	const currentSlide = useCallback((n) => {
		showSlides(slideIndex.current = n);
	}, [slideIndex, showSlides])

	useEffect(() => {
		var img = []
		if(Products[colap].images[imgid] !== undefined) {
			img = Products[colap].images[imgid]
			// console.log(img)
		}
		Products[colap].images[imgid].map((m, i) => {
			var len = img.length;
			if (i > 0) {
				document.getElementById("all_img_main"+ String(colap) + String(imgid)).innerHTML += `
					<div class="mySlides slides${String(colap) + String(imgid)}" id='slides${String(colap) + String(imgid)}' style="align-items: center; justify-content: center; max-height: 200px;">
						<button type="button" class="close close${String(colap) + String(imgid)}" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<div class="numbertext">${i + 1} / ${len}</div>
						<img src='https://dtodo-indumentaria-server.herokuapp.com/${m}' style="width: auto; max-height: 200px;" alt=''/>
					</div>
				`;
				document.getElementById("all_img_bottom"+ String(colap) + String(imgid)).innerHTML += `
					<div class="column">
					<img class="demo any${String(colap) + String(imgid)} cursor" src='https://dtodo-indumentaria-server.herokuapp.com/${m}' style="width: auto;  height: 100%;" alt="">
					</div>
				`;
			} else {
				document.getElementById("all_img_main"+ String(colap) + String(imgid)).innerHTML = `
					<div class="mySlides slides${String(colap) + String(imgid)}" style="display: flex; align-items: center; justify-content: center; max-height: 200px;">
						<button type="button" class="close close${String(colap) + String(imgid)}" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<div class="numbertext">${i + 1} / ${len}</div>
						<img src='https://dtodo-indumentaria-server.herokuapp.com/${m}' style="width: auto; max-height: 200px;" alt=''/>
					</div>
				`;
				document.getElementById("all_img_bottom"+ String(colap) + String(imgid)).innerHTML = `
					<div class="column" id='col${String(colap) + String(imgid)}'>
						<img class="demo any${String(colap) + String(imgid)} cursor active" src='https://dtodo-indumentaria-server.herokuapp.com/${m}' style="width: auto; height: 100%;" alt="">
					</div>
				`;
			}
			
			return 0;
		});
		if(document.getElementsByClassName('any'+String(colap) + String(imgid)).length !== 0) {
			for(let p=0; p<document.getElementsByClassName('any'+String(colap) + String(imgid)).length; p++) {
				(function(index) {
					document.getElementsByClassName('any'+ String(colap) + String(imgid))[p].addEventListener("click", function() {
						currentSlide(index+1)
					})
				})(p)
			}
		}
		
		if(document.getElementsByClassName('close'+String(colap) + String(imgid)).length !== 0) {
			for(let x=0; x<document.getElementsByClassName('close'+String(colap) + String(imgid)).length; x++) {
				(function(index) {
					document.getElementsByClassName('close'+ String(colap) + String(imgid))[x].addEventListener("click", function() {
						Products[colap].images[imgid].splice(index, 1)
						mainedit('update')
					})
				})(x)
			}
		}
	}, [Products, colap, imgid, currentSlide, mainedit])

	function bytesToSize(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return [parseFloat((bytes / Math.pow(k, i)).toFixed(dm)), sizes[i]];
    }

	const updateImg = async (val) => {
		for(var t=0; t<val.length; t++) {
			Products[colap].images[imgid].push(document.getElementsByName("image_name"+ String(colap) + String(imgid))[0].files[t].name)
			
			const formdata = new FormData();
			formdata.append('productImage', document.getElementsByName("image_name"+ String(colap) + String(imgid))[0].files[t])
			await axios.put('https://dtodo-indumentaria-server.herokuapp.com/product/edit', formdata, {
				headers: {
					'content-type': 'multipart/form-data'
				}
			}).then(res => {
				if(res.data === 'success') {
					axios.get('https://dtodo-indumentaria-server.herokuapp.com/product/all').then(res => props.insertproduct(res.data))
				}
			})
			mainedit('update')
		}
	}
	
	const change = (e) => {
		if(e.target.files[0]) {
			var size= bytesToSize(e.target.files[0].size)
            if(size[1] === "KB") {
                if(size[0] <= 50.00) {
                    updateImg(e.target.files)
                    document.getElementById("error"+String(colap) + String(imgid)).style.display = "none"
                } else {
                    document.getElementById("error"+String(colap) + String(imgid)).style.display = "inherit"
                }
            } else {
                document.getElementById("error"+String(colap) + String(imgid)).style.display = "inherit"
            }
		}

		// var reader = new FileReader();
		// reader.onload = function (e) {
		// 	img.push(this.result);
		// };
		// if(e.target.files[0]) {
		// 	reader.readAsDataURL(document.getElementsByName("image_name"+ String(colap) + String(imgid))[0].files[0]);
		// }
		
	};

	return (
		<div className="image_selection">
			<input type="file" name={"image_name"+ String(colap) + String(imgid)} onChange={change} multiple />
            <div id={"error"+String(colap) + String(imgid)} style={{color: 'red', fontWeight: '500', display: 'none'}}>{error}</div>
			{
				Products[colap].images[imgid].length === 0
				? null
				: <div className="container">
					<div id={'all_img_main'+ String(colap) + String(imgid)}>
					</div>
					
					<a href='#/' className="prev" onClick={() => plusSlides(-1)}>❮</a>
					<a href='#/' className="next" onClick={() => plusSlides(1)}>❯</a>

					<div className="row">
						<div id={'all_img_bottom'+ String(colap) + String(imgid)}>
						</div>
					</div>
				</div>
			}
		</div>
	);
}

const mapStateToProps = (state) => {
    return {
        Products: state.Products
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        insertproduct: (val) => { 
            dispatch({
                type: 'PRODUCTS',
                item: val
            }) 
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageSelection);
