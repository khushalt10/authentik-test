import React from 'react'
import './seat.css'

const Seat = ({seatNo, onPres, selectedSeats, notAvailable}) => {
    const clr = selectedSeats.includes(seatNo) ? 'red' : notAvailable.includes(seatNo) ? 'gray' : 'transparent'
    const textClr = selectedSeats.includes(seatNo) || notAvailable.includes(seatNo)  ? 'white' : 'black'
    const cursor = notAvailable.includes(seatNo) ? 'not-allowed' : 'pointer'
    return (
        <div style={{ color: textClr, background: clr, cursor }} className='seat' onClick={() => onPres(seatNo)}>
            {seatNo}
        </div>
    )
}

export default Seat