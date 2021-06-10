import React, { useState } from 'react'
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import './OrderPaging.scss';

function Paging({ todos, totalnumber, itemDisplay }) {

    const [currentPage, setCurrentPage] = useState(1);
    const [display, setDisplay] = useState(totalnumber)
    var numberdisplay = totalnumber
    const todosPerPage = itemDisplay;
    
    function handleClick(e) {
        setCurrentPage(Number(e.target.id))
    }

    // Logic for displaying current todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderTodos = currentTodos.map((todo, index) => {
        // return <div key={index} className="one_items col">{todo}</div>;
        return (
            <div className="col-md-6 py-2 col-review" key={index}>
                {todo}
            </div>
        )
    });

    // Logic for displaying page numbers
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
        pageNumbers.push(i);
    }
    
    const renderPageNumbers = (number) => {
        if(currentPage === number) {
            return (
                <div
                    key={number}
                    id={number}
                    onClick={handleClick}
                    className="onlynumber active"
                >
                    {number}
                </div>
            )
        } else {
            return (
                <div
                    key={number}
                    id={number}
                    onClick={handleClick}
                    className="onlynumber"
                >
                    {number}
                </div>
            );
        }
    }

    var store = []
    function Testdisplay() {
        if(currentPage > pageNumbers[pageNumbers.length-1]) {
            if(display-(numberdisplay-1) > pageNumbers[pageNumbers.length-1]) {
                var d = 0 + numberdisplay
                setDisplay(d)
            }
            for(var j = display-(numberdisplay-1); j <= display; j++) {
                if(pageNumbers[pageNumbers.length-1] !== undefined) {
                    store.push(pageNumbers[pageNumbers.length-1])
                }
            }
            setCurrentPage(pageNumbers[pageNumbers.length-1])
        }
        if(currentPage <= display) {
            for(var i = display-(numberdisplay-1); i <= display; i++) {
                if(pageNumbers[i-1] !== undefined) {
                    store.push(pageNumbers[i-1])
                }
            }
        } else {
            var dis = display + numberdisplay
            setDisplay(dis)
        }
    }
    Testdisplay()

    function handlenext() {
        var lastnumber = pageNumbers.length
        if(currentPage !== lastnumber) {
            setCurrentPage(currentPage+1)
        }
    }

    function handleprev() {
        if(currentPage !== 1) {
            setCurrentPage(currentPage-1)
            if(currentPage >= display) {
                for(var i = display-(numberdisplay-1); i <= display; i++) {
                    if(pageNumbers[i-1] !== undefined) {
                        store.push(pageNumbers[i-1])
                    }
                }
            } else {
                var dis = display - numberdisplay
                setDisplay(dis)
            }
        }
    }

    function handlefullnext() {
        setCurrentPage(display + 1)
    }
    function handlefullprev() {
        var dis = display - numberdisplay
        setDisplay(dis)
        setCurrentPage(dis)
        if(currentPage >= display) {
            for(var i = display-(numberdisplay-1); i <= display; i++) {
                if(pageNumbers[i-1] !== undefined) {
                    store.push(pageNumbers[i-1])
                }
            }
        }
    }

    return (
        <div className="latestnews__content">
            <div className="render_items">
                <div className="row">
                    {renderTodos}
                </div>
            </div>
            <div className="number__box">
                <div className="number">
                    <button className="number__prev" onClick={handlefullprev} id="prev" disabled={display === numberdisplay ? true : false}>
                        <IoIosArrowBack style={{fontSize: "15px"}} /><IoIosArrowBack style={{fontSize: "15px", marginLeft: "-8px"}} />
                    </button>
                    <button className="number__prev" onClick={handleprev} id="prev" disabled={currentPage === 1 ? true : false}>
                        <IoIosArrowBack style={{fontSize: "15px", margin: "0px"}} />
                    </button>
                    <div>
                        {
                            currentPage > numberdisplay
                            ? <div className="more__numbers">...</div>
                            : null
                        }
                    </div>
                    {
                        store.map(num => 
                            renderPageNumbers(num)
                        )
                    }
                    <div>
                        {
                            display < pageNumbers.length
                            ? <div className="more__numbers">...</div>
                            : null
                        }
                    </div>
                    <button className="number__next" onClick={handlenext} id="next" disabled={pageNumbers.length < currentPage ? true : false}>
                        <IoIosArrowForward style={{fontSize: "15px"}} />
                    </button>
                    <button className="number__next" onClick={handlefullnext} id="next" disabled={pageNumbers.length <= display ? true : false}>
                        <IoIosArrowForward style={{fontSize: "15px"}} /><IoIosArrowForward style={{fontSize: "15px", marginLeft: "-8px"}} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Paging
