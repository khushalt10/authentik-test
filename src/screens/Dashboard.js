import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Dashboard = () => {
    const [reservations, setReservations] = useState([])
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);

    const [currentRecord, setCurrentRecord] = React.useState({});

    const handleClickOpen = (record, i) => {
        setCurrentRecord({...record, index: i})
        setOpen(true);
    };

    const handleOpen2 = () => {
        setOpen2(true);
      };
      const handleOpen3 = () => {
        setOpen3(true);
      };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleClose2 = () => {
        setOpen2(false);
      };
      const handleClose3 = () => {
        setOpen3(false);
      };
    const fetchReservations = () => {
        const reservationsData = JSON.parse(localStorage.getItem('reservations'));
        if (reservationsData) setReservations(reservationsData)
    }

    useEffect(() => {
        fetchReservations()
    }, []) 

    
    const reservedSeats = (selectedSeats) => {
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

    const onDeleteRecord = (index) => {
        let rData = [...reservations];
        if (window.confirm('Are you sure you want to delete this record?')) {
            if (index > -1) {
                rData.splice(index, 1);
            }
            localStorage.setItem('reservations', JSON.stringify(rData));
            setOpen(false);
            setCurrentRecord({})
            handleOpen3()
            fetchReservations()
        }
    }

    const updateRecord = () => {
        let rData = [...reservations];
        if (rData[currentRecord.index].firstName !== currentRecord.firstName || 
            rData[currentRecord.index].lastName !== currentRecord.lastName ||
            rData[currentRecord.index].email !== currentRecord.email) {
                if (window.confirm('Are you sure you want to update this record?')) {
                    rData[currentRecord.index] = {
                        firstName: currentRecord.firstName,
                        lastName: currentRecord.lastName,
                        email: currentRecord.email,
                        seatNo: currentRecord.seatNo,
                        date: currentRecord.date
                    }
                    localStorage.setItem('reservations', JSON.stringify(rData));
                    setOpen(false);
                    setCurrentRecord({})
                    handleOpen2()
                    fetchReservations()
                }
            } else {
                setOpen(false);
                setCurrentRecord({})
            }
    }

    return (
        <div className='flex flex-col items-center'>
            <div className='my-5 font-bold text-lg flex justify-center'>
                Reservation Records
            </div>
            <div className='my-10'>
                {reservations.map((r,i) => (
                    <div className='record' key={r.date+r.email}>
                        <div>No: {i + 1}</div>
                        <div>Name: {r.firstName + ' ' + r.lastName}</div>
                        <div>Email: {r.email}</div>
                        <div>Seats: {reservedSeats(r.seatNo)}</div>
                        <div>Date: {r.date}</div>
                        <Button color='primary' onClick={() => handleClickOpen(r, i)}>Update</Button>
                        <Button color='error' onClick={() => onDeleteRecord(i)}>Delete</Button>
                    </div>
                ))}
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Update Record Details
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                <div className='flex gap-10 flex-col my-10'>
                <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="First Name"
                    value={currentRecord.firstName}
                    onChange={(e) => setCurrentRecord({...currentRecord, firstName: e.target.value})}
                />
                <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="Last Name"
                    value={currentRecord.lastName}
                    onChange={(e) => setCurrentRecord({...currentRecord, lastName: e.target.value})}
                />

                <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="Email"
                    value={currentRecord.email}
                    onChange={(e) => setCurrentRecord({...currentRecord, email: e.target.value})}
                />
            </div>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={updateRecord}>Update</Button>
                <Button onClick={handleClose} autoFocus>
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
                <Alert onClose={handleClose2} severity="success" sx={{ width: '100%' }}>
                    Record Updated Succesfully!
                </Alert>
            </Snackbar>
            <Snackbar open={open3} autoHideDuration={6000} onClose={handleClose3}>
                <Alert onClose={handleClose3} severity="error" sx={{ width: '100%' }}>
                    Record Deleted!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Dashboard