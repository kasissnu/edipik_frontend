import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@mui/joy/Alert';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Box, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import '../colors.js';

export const NotificationContext = React.createContext();

export const useNotification = () => React.useContext(NotificationContext);

const CustomSnackbar = ({ open, message, severity, onClose }) => {
  const items = [
    { title: 'Success', color: 'success', icon: <CheckCircleIcon /> },
    { title: 'Warning', color: 'warning', icon: <WarningIcon /> },
    { title: 'Error', color: 'danger', icon: <ErrorIcon /> },
    { title: 'Info', color: 'info', icon: <InfoIcon /> },
  ];

  console.log("items.find((item) => item.color === severity)", items.find((item) => item.color === severity));

  const item = items.find((item) => item.color === severity);
  const title = item ? item.title : "";
  const icon = item ? item.icon : <InfoIcon />;
  console.log(icon);
  return (

    <Snackbar open={open} autoHideDuration={6000} onClose={onClose} className='m-auto md:w-[400px] w-[250px] max-w-full' anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: 'column' }}>
        <Alert
          sx={{ boxShadow: '0 6px 16px 0 rgba(0,0,0,.08)' }}
          className="!bg-white"
          key={title}
          startDecorator={React.cloneElement(icon, {
            className: "!text-lg",
            color: severity
          })}
          variant="soft"
          color={'neutral'}
          // color={severity}
          endDecorator={
            <CloseRoundedIcon className='!text-xl' onClick={onClose} />
          }
        >
          <Box>
            <Typography fontSize="sm" sx={{ opacity: 0.8, fontFamily: "Montserrat" }}>
              {message}
            </Typography>
          </Box>
        </Alert>
      </Box>
    </Snackbar >
  );
};

export const NotificationProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState(true);

  const showNotification = (message, severity) => {
    setOpen(true);
    setMessage(message);
    setSeverity(severity);
  };

  const hide = () => {
    setOpen(false);
    setMessage('');
    setSeverity('');
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <CustomSnackbar open={open} message={message} severity={severity} onClose={hide} />
    </NotificationContext.Provider>
  );
};
