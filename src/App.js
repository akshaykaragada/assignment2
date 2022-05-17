import React, { useEffect, useState } from 'react';
import './App.css';
import Loading from './Loading';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import LanguageIcon from '@mui/icons-material/Language';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ResponsiveGrid() {
  const [UserVar, setUserVaf] = useState([]);
  const [ImgUrlVar, setImgUrlVaf] = useState([]);
  const [LoadingVar, setLoadingVaf] = useState(true);
  const [open, setOpen] = useState(false);
  const [FavVar, setFavVaf] = useState(false);
  const [IptVar, setIptVaf] = useState([{
    name: '',
    email: '',
    phone: '',
    website: '',
  }]);
  const [EdtIdxVar, setEdtIdxVaf] = useState()
  useEffect(() => {
    setTimeout(() => {
      setLoadingVaf(false)
    }, 4000)
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUserVaf(data),
        setImgUrlVaf(`https://avatars.dicebear.com/api/avataaars/seed.svg?options[mood][]=happy`)
      )
      .catch(err => console.log(err))
  }, [])
  let EdtFnc = (id) => {
    setOpen(true);
    setIptVaf(UserVar[id])
    setEdtIdxVaf(id)
  }
  const handleClose = () => {
    setOpen(false);
  };

  let FavFnc = (id) => {
    setFavVaf(!FavVar)
    setUserVaf(UserVar.map((item, index) => {
      if (index === id) {
        return {
          ...item,
          isFavorite: !item.isFavorite
        }
      }
      return item
    }))
  }

    let DltFnc = (id) => {
      UserVar.splice(id, 1)
      setUserVaf([...UserVar])
    }

    let UpdFnc = () => {
      let tmp = UserVar
      tmp[EdtIdxVar] = IptVar
      setUserVaf(tmp)
      setOpen(false)
    }
    return (
      <>
        <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 1, sm: 10, md: 16 }}>
          {LoadingVar ? <Loading /> : UserVar.map((UserVar, idx) => {
            return (
              <Grid item xs={1} sm={4} md={4} key={UserVar.id}>
                <Card sx={{ maxWidth: 345 }}>
                  <div key={UserVar.id}>
                    <CardMedia
                      component="img"
                      image={ImgUrlVar.replace('seed', UserVar.username)}
                      alt="Paella dish"
                    />
                    <CardContent padding={20}>
                      <Typography fontSize={24} color="black">
                        <div>{UserVar.name}</div>
                      </Typography>
                      <Typography color="textSecondary" fontSize={18}>
                        <div><MailOutlineIcon /> {UserVar.email}</div>
                        <div><PhoneEnabledIcon /> {UserVar.phone}</div>
                        <div><LanguageIcon /> {UserVar.website}</div>
                      </Typography>
                    </CardContent>
                    <CardActions >
                      <IconButton aria-label="add to favorites" onClick={() => FavFnc(idx)}>
                        {UserVar.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </IconButton>
                      <IconButton aria-label="edit" onClick={() => EdtFnc(idx)}>
                        <BorderColorIcon />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={() => DltFnc(idx)}>
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </div>
                </Card>
              </Grid>
            )
          })
          }
        </Grid >
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Basic Model
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <label><span>*</span> Name:<TextField
              margin="dense"
              type="text"
              fullWidth
              value={IptVar.name}
              onChange={(e) => setIptVaf({ ...IptVar, name: e.target.value })}
              variant="standard"
            /></label>
            <label><span>*</span> Email:<TextField
              margin="dense"
              type="text"
              fullWidth
              value={IptVar.email}
              onChange={(e) => setIptVaf({ ...IptVar, email: e.target.value })}
              variant="standard"
            /></label>
            <label><span>*</span> Phone:<TextField
              margin="dense"
              type="text"
              fullWidth
              value={IptVar.phone}
              onChange={(e) => setIptVaf({ ...IptVar, phone: e.target.value })}
              variant="standard"
            /></label>
            <label><span>*</span> Website:<TextField
              margin="dense"
              type="text"
              fullWidth
              value={IptVar.website}
              onChange={(e) => setIptVaf({ ...IptVar, website: e.target.value })}
              variant="standard"
            /></label>

          </DialogContent>
          <DialogActions>
            <Button variant='outlined' size="small" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" size="small" onClick={UpdFnc}>
              OK
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </>
    );
  }

