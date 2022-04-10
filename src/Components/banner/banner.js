import React from 'react'
import './style.css'
// import drawing from "../../Assets/drawing.svg"

export default function Banner(props) {
    return (
        <>
        <div id="Banner" className='parallax full-width'>
            <div className='il'>
                <span>{props.title}</span>
            </div>
            {/* <div className='il'>
                <img src={drawing} alt="info"></img>
            </div> */}
            {/* <div className="bl">
                <button className="p">Get Started</button>
                <button className="s">Admin Log-in</button>
            </div> */}
        </div>
        </>
    )
}
