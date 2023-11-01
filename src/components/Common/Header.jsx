import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { ListItemDecorator } from "@mui/joy";
import { logOutUserSuccess } from "../../app/features/AuthSlice";
import { logOutUser } from "../../app/services/UserServices";
import CustomButton from "./CustomButton";
import { useNotification } from "../../utils/Hooks/useNotification";
import logo from "../../assets/images/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { checkAuth } from "../../utils/checkAuth";
import WaitListModal from "../WaitListModal";

const Header = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const handleOpenModal = () => setModalOpen(true);
	const handleCloseModal = () => setModalOpen(false);
  
	// Hooks
	const { showNotification } = useNotification();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const navLinks = [
		{ name: "About Us", link: "about-us", type: "home" },
		{ name: "Product", link: "product-block", type: "home" },
		{ name: "Pricing", link: "/pricing" },
		{ name: "AI profile", link: "/" },
		{ name: "Contact Us", link: "/" },
	];

	// UseState
	const { user } = useSelector((state) => state.auth);
	// const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [open, setOpen] = useState(false);

	const handleOpenNavMenu = (event) => {
		setOpen(true);
	};
	const handleCloseNavMenu = () => {
		setOpen(false);
		window.scrollTo(0, 0);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLink = (link = "/") => {
		setAnchorElUser(null);
		navigate(link);
	};
	const handleScrollTOp = () => {
		window.scrollTo(0, 0);
	};

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logOutUserSuccess());
		logOutUser();
		setAnchorElUser(null);
		showNotification("You have successfully logout", "success");
		navigate("/");
	};

	const handleRedirect = (id) => {
		navigate("/");
		setTimeout(() => {
			const aboutSection = document.getElementById(id);
			if (aboutSection) {
				window.scrollTo({
					top: aboutSection.offsetTop,
					behavior: "smooth",
				});
			}
		}, [200]);
		handleCloseNavMenu();
	};

	const [scrollPosition, setScrollPosition] = useState(0);
	const [isScrolled, setIsScrolled] = useState(false);
	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.pageYOffset;

			setIsScrolled(scrollTop > 160);
			setScrollPosition(scrollTop);
		};

		// console.log(scrollPosition);
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [scrollPosition]);

	return (
		<>
			<AppBar position="sticky" elevation={0} color="primary">
				<Container maxWidth="xl">
					<Toolbar
						disableGutters
						sx={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<Button
							component={Link}
							to="/"
							className={`text-white ${
								location.pathname === "/" && isScrolled
									? "transition-opacity duration-500 ease-linear"
									: location.pathname === "/"
									? "opacity-0"
									: ""
							}`}
							onClick={handleCloseNavMenu}
						>
							<img src={logo} alt="logo" height="50px" />
						</Button>
						<Box
							sx={{
								flexGrow: 1,
							}}
							className={`${
								location.pathname === "/upload"
									? "hidden"
									: "hidden lg:flex justify-end lg:gap-6 xl:gap-10"
							}`}
						>
							{navLinks.map((page, index) => (
								<Button
									sx={{
										my: 2,
										color: "white",
										display: "flex",
										justifyContent: "flex-end",
									}}
									key={`header-main-${index}`}
									onClick={() =>
										page.type === "home"
											? handleRedirect(page.link)
											: handleScrollTOp()
									}
									component={page.type !== "home" ? Link : ""}
									to={page.type !== "home" ? page.link : ""}
									className="text-[17px]"
								>
									{page.name}
								</Button>
							))}
						</Box>
						<Box
							className="my-3"
							sx={{ display: "flex", flexGrow: 0, pl: 2 }}
						>
							<Box className="hidden lg:block">
								{!checkAuth() ? (
									<>
										{/* <CustomButton
											variant="contained"
											size="small"
											sx={{
												margin: "auto",
												display: "flex",
												fontWeight: "500",
												fontSize: "14px",
											}}
											component={Link}
											to={"/user/signin"}
											color="bg-[#d1d5db] hover:bg-[#9ca3af]"
											className="px-8 py-2 m-auto"
											onClick={handleCloseNavMenu}
										>
											<Typography className="text-black text-[17px]">
												Sign in{" "}
											</Typography>
										</CustomButton> */}
										<CustomButton
											variant="contained"
											onClick={handleOpenModal}
											sx={{
												margin: "auto",
												display: "flex",
												fontWeight: "500",
												fontSize: "17px",
											}}
											className="bg-secondary-600 rounded-full"
										>
											Join us
										</CustomButton>
										<WaitListModal isOpen={modalOpen} onClose={handleCloseModal} />
									</>
								) : (
									<>
										<Tooltip title="Open settings">
											<IconButton
												onClick={handleOpenUserMenu}
												sx={{ p: 0 }}
											>
												<Avatar
													size="lg"
													sx={{
														width: 35,
														height: 35,
														fontSize: "medium",
														mr: "10px",
													}}
												>
													{user?.first_name?.charAt(
														0,
													)}
													{user?.last_name?.charAt(0)}
												</Avatar>
											</IconButton>
										</Tooltip>
										<Menu
											className="profile-menu"
											sx={{ mt: "45px", width: "300px" }}
											id="menu-appbar"
											anchorEl={anchorElUser}
											anchorOrigin={{
												vertical: "top",
												horizontal: "right",
											}}
											keepMounted
											transformOrigin={{
												vertical: "top",
												horizontal: "right",
											}}
											open={Boolean(anchorElUser)}
											onClose={handleCloseUserMenu}
										>
											<MenuItem>
												<Box
													sx={{
														px: 2,
														display: {
															xs: "none",
															md: "flex",
														},
													}}
												>
													<ListItemDecorator>
														<Avatar
															size="md"
															sx={{
																width: 30,
																height: 30,
																mr: "10px",
															}}
														>
															{user?.first_name?.charAt(
																0,
															)}
															{user?.last_name?.charAt(
																0,
															)}
														</Avatar>
													</ListItemDecorator>
													<div>
														<Typography fontSize="xl">
															{user?.first_name}{" "}
															{user?.last_name}
														</Typography>
														<Typography
															fontSize="xs"
															color="text.disabled"
														>
															{user?.email}
														</Typography>
													</div>
												</Box>
											</MenuItem>

											<MenuItem
												key={"Profile"}
												onClick={() =>
													handleLink("upload")
												}
											>
												<Typography textAlign="center">
													Upload
												</Typography>
											</MenuItem>
											<MenuItem
												key={"Logout"}
												onClick={handleLogout}
											>
												<Typography textAlign="center">
													Logout
												</Typography>
											</MenuItem>
										</Menu>
									</>
								)}
							</Box>
							{open ? (
								<IconButton
									size="large"
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleCloseNavMenu}
									color="inherit"
									className="py-0 block lg:hidden"
								>
									<CloseIcon className="w-12 h-16 py-0 flex justify-center items-center" />
								</IconButton>
							) : (
								<IconButton
									size="large"
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleOpenNavMenu}
									color="inherit"
									className="py-0 lg:hidden flex justify-center items-center"
								>
									<MenuIcon className="w-12 h-16 py-0" />
								</IconButton>
							)}
						</Box>
					</Toolbar>
				</Container>
				{open && (
					<Box className="bg-primary-950 h-full w-full overflow-auto overscroll-none top-[4.8rem] fixed z-[99999] flex flex-col justify-start items-start px-10 pb-10 pt-4">
						{navLinks.map((page, index) => (
							<Box className="w-full">
								<Button
									sx={{
										my: 2,
										color: "white",
										display: "flex",
										justifyContent: "flex-end",
									}}
									key={`header-mobile-${index}`}
									onClick={() =>
										page.type === "home"
											? handleRedirect(page.link)
											: handleCloseNavMenu()
									}
									component={page.type !== "home" ? Link : ""}
									to={page.type !== "home" ? page.link : ""}
									className="text-2xl text-white leading-4 font-medium py-4 border-b-2 border-white border-solid w-full flex justify-start font-sans"
								>
									{page.name}
								</Button>
							</Box>
						))}
						{checkAuth() ? (
							<>
								{/* <Box className="w-full">
									<Button
										className="text-2xl text-white leading-4 font-bold py-4 border-b-2 border-white border-solid w-full flex justify-start"
										component={Link}
										to={"/upload"}
										onClick={handleCloseNavMenu}
									>
										Upload
									</Button>
								</Box> */}
							</>
						) : (
							""
						)}

						{checkAuth() ? (
							<CustomButton
								variant="contained"
								size="small"
								sx={{
									margin: "auto",
									display: "flex",
									fontWeight: "500",
									fontSize: "14px",
								}}
								color="bg-[#d1d5db] hover:bg-[#9ca3af]"
								className="px-8 py-2 m-auto"
								onClick={handleLogout}
							>
								<Typography className="text-black text-[17px]">
									Logout
								</Typography>
							</CustomButton>
						) : (
							<>
								{/* <CustomButton
									variant="contained"
									size="small"
									sx={{
										margin: "auto",
										display: "flex",
										fontWeight: "500",
										fontSize: "14px",
									}}
									component={Link}
									to={"/user/signin"}
									color="bg-[#d1d5db] hover:bg-[#9ca3af]"
									className="px-8 py-2 m-auto"
									onClick={handleCloseNavMenu}
								>
									<Typography className="text-black text-[17px]">
										Sign in{" "}
									</Typography>
								</CustomButton> */}
								<CustomButton
									variant="contained"
									onClick={handleOpenModal}
									sx={{
										margin: "auto",
										display: "flex",
										fontWeight: "500",
										fontSize: "17px",
									}}
									className="bg-secondary-600 rounded-full"
								>
									Join us
								</CustomButton>
								<WaitListModal isOpen={modalOpen} onClose={handleCloseModal} />
							</>
						)}
					</Box>
				)}
			</AppBar>
		</>
	);
};
export default Header;
