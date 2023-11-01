import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  Box,
  FormControl,
  OutlinedInput,
  Modal,
  Alert,
  
} from "@mui/material";
import { InputLabel } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { joinWaitlist } from "../app/services/UserServices";
import CustomButton from "./Common/CustomButton";
import { useNotification } from "../utils/Hooks/useNotification";

const WaitList = ({ isOpen, onClose }) => {
  const { showNotification } = useNotification();
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const user_data = {
      first_name: data["firstName"],
      last_name: data["lastName"],
      email: data["email"],
    };
    joinWaitlist(user_data).then((res) => {
      if (res.status === 200) {
        reset((formValues) => ({
					...formValues,
					firstName: "",
					lastName: "",
					email: "",
				}));
        onClose();
        showNotification(res.data.message, "success");
      } else {
        setError(res.message);
      }
    });
  };
  return (
    <>
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: {xs:"85%", sm:"75%", md:"65%", lg:"55%", xl:"50%" },
          bgcolor: "background.paper",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          p: 3,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h4"
          component="h2"
          sx={{ textAlign: "center", mb: 2.5 }}
          className="!text-primary-500 font-playfair"
          fontFamily= "playfair"
          fontWeight="600"
        >
          Join Us
        </Typography>
        {error&&
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        }
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="firstName" className="mb-2">
                <Typography>First Name</Typography>
              </InputLabel>
              <OutlinedInput
                size="small"
                required
                fullWidth
                id="firstName"
                name="firstName"
                autoComplete="first-name"
                {...register("firstName", {
                  required: true,
                })}
              />
              {errors.firstName && errors.firstName.type === "required" && (
                <Typography
                  className="m-0 !text-[#ff0000]"
                  m={0}
                  sx={{ color: "red" }}
                >
                  First Name is required
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="lastName" className="mb-2">
                <Typography>Last Name</Typography>
              </InputLabel>
              <OutlinedInput
                size="small"
                fullWidth
                id="lastName"
                name="lastName"
                autoComplete="lastName"
                {...register("lastName")}
              />
            </Grid>
          </Grid>
          <FormControl fullWidth required sx={{ mt: 2 }} variant="outlined">
            <InputLabel htmlFor="email" className="mb-2">
              <Typography>Email Address</Typography>
            </InputLabel>
            <OutlinedInput
              size="small"
              id="email"
              name="email"
              variant="outlined"
              required
              fullWidth
              autoComplete="email"
              {...register("email", {
                required: true,
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              })}
            />
            {errors.email && errors.email.type === "required" && (
              <Typography
                className="m-0 text-[#ff0000]"
                m={0}
                width="100%"
                sx={{ color: "red" }}
              >
                Email is required
              </Typography>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <Typography className="m-0 text-[#ff0000]" sx={{ color: "red" }}>
                Email is not valid
              </Typography>
            )}
          </FormControl>

          <CustomButton
            type="submit"
            btntype="link"
            variant="contained"
            sx={{
              margin: "auto",
              mt: 3,
              mb: 2,
              display: "flex",
              textTransform: "none",
              borderRadius: "25px",
              backgroundColor: "#d19c00",
              '&:hover': {
                backgroundColor: '#a67002',
              },
            }}
          >
            Submit
          </CustomButton>
        </Box>
      </Box>
    </Modal>
    </>
  );
};

export default WaitList;
