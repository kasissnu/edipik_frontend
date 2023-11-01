import React from "react";
import Hero from "../../components/Home/Hero";
import AboutUs from "../../components/Home/AboutUs";
import Professional from "../../components/Home/Professional";
import Guidance from "../../components/Home/Guidance/index";

const Home = () => {
	return (
		<>
			<Hero />
			<AboutUs />
			<Guidance />
			<Professional />
		</>
	);
};

export default Home;
