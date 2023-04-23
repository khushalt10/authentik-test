import React, { useEffect, useState } from 'react'
import mockdata from '../mockdata'
import Seat from '../components/Seat'
import { Button, TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ReservationScreen = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [notAvailable, setNotAvailable] = useState([]);
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const fetchNotAvaialableSeats = () => {
        const notAvailableSeats = JSON.parse(localStorage.getItem('notAvailableSeats'));
        if (notAvailableSeats) setNotAvailable(notAvailableSeats)
    }

    useEffect(() => {
        fetchNotAvaialableSeats()
    }, []) 

    const selectSeat = (seatNo) => {
        if (!notAvailable.includes(seatNo)) {
            if (!selectedSeats.includes(seatNo))
            setSelectedSeats([...selectedSeats, seatNo])
        else {
            const mockArray = [...selectedSeats]
            const index = mockArray.indexOf(seatNo);
            if (index > -1) {
                mockArray.splice(index, 1);
            }
            setSelectedSeats(mockArray)
        }    
        }

    }

    const reservedSeats = () => {
        let seatsNames = '';
        if (selectedSeats.length === 1) {
            seatsNames = selectedSeats[0]
        } else {
            selectedSeats.forEach((s, i) => {
                if (i === selectedSeats.length - 1)
                    seatsNames = seatsNames + ' ' + s
                else seatsNames = seatsNames + s + ', '
            })
        }

        return seatsNames
    }

    const onSubmit = () => {
        if (window.confirm(`Are you sure you want to book ${reservedSeats()} ?`)) {
            const notAvailableSeats = [...notAvailable, ...selectedSeats]
            const current = new Date();
            const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
            let record = {
                firstName,
                lastName,
                email,
                seatNo: selectedSeats,
                date
            }
            const reservations = JSON.parse(localStorage.getItem('reservations'));
            if (reservations) {
                localStorage.setItem('reservations', JSON.stringify([...reservations, record]));
            } else localStorage.setItem('reservations', JSON.stringify([record]));
            localStorage.setItem('notAvailableSeats', JSON.stringify(notAvailableSeats));
            setSelectedSeats([])
            setFirstName('')
            setLastName('')
            setEmail('')
            handleClick()
            fetchNotAvaialableSeats()
        }

    }

    return (
        <div className='flex flex-col items-center'>
            <div className='my-5 font-bold text-lg'>Book Your Seats Here</div>
            <div className='mt-10'>
                <div>Upper Deck:</div>
                <div className='row'>
                {mockdata.upperDeck[0].map(u => (
                    <Seat key={u} notAvailable={notAvailable} selectedSeats={selectedSeats} onPres={selectSeat} seatNo={u} />
                    ))}
                </div>
                <div className='row'>
                {mockdata.upperDeck[1].map(u => (
                    <Seat key={u} notAvailable={notAvailable} selectedSeats={selectedSeats} onPres={selectSeat} seatNo={u} />
                    ))}
                </div>
            </div>
            <div className='mt-10'>
                <div>Lower Deck:</div>
                <div className='row'>
                {mockdata.lowerDeck[0].map(u => (
                    <Seat key={u} notAvailable={notAvailable} selectedSeats={selectedSeats} onPres={selectSeat} seatNo={u} />
                    ))}
                </div>
                <div className='row'>
                {mockdata.lowerDeck[1].map(u => (
                    <Seat key={u} notAvailable={notAvailable} selectedSeats={selectedSeats} onPres={selectSeat} seatNo={u} />
                    ))}
                </div>
            </div>
            <div className='my-5'>Fill out the Details below to continue booking</div>
            <div className='formm'>
                <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {selectedSeats.length > 0 && <div>You will be booking {reservedSeats()}</div>}
                <Button onClick={onSubmit} disabled={!firstName || !lastName || !email || selectedSeats.length === 0} variant='contained' color="primary">Submit</Button>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Booking Was Succesfull!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ReservationScreen