import { Box, Container, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./pricing.css";
import PricingCard from "../../components/Pricing/PricingCard";
import Tilt from "react-tilt";

const Pricing = () => {
	const slickSettings = {
		dots: true,
		infinite: false,
		speed: 1000,
		autoplay: false,
		slidesToShow: 3,
		centerMode: true,
		centerPadding: "50px",
		focusOnSelect: true,
		pauseOnFocus: true,
		arrows: true,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1080,
				settings: {
					centerMode: false,
					slidesToShow: 2,
					arrows: true,
				},
			},
			{
				breakpoint: 890,
				settings: {
					slidesToShow: 1,
					arrows: true,
				},
			},
			{
				breakpoint: 726,
				settings: {
					slidesToShow: 1,
					arrows: true,
				},
			},
			{
				breakpoint: 455,
				settings: {
					centerMode: false,
					slidesToShow: 1,
					arrows: true,
				},
			},
		],
	};

	const pricingCards = [
		{
			title: "Pay as You Go",
			pricing: "$0.05",
			pricingDetails: "/photo",
			features: [
				"All AI tools",
				"Culling (Coming soon)",
				"Album Designing (Coming soon)",
				"No commitment",
			],
			buttonlabel: "Get Started",
			footerNote: "Billed monthly per usage",
		},
		{
			title: "The Unlimited",
			pricing: "$150",
			pricingDetails: "/month",
			features: [
				"All AI tools",
				"Culling (Coming soon)",
				"Album Designing (Coming soon)",
				"Monthly commitment",
			],
			buttonlabel: "Get Started",
			footerNote: "Billed monthly per usage",
		},
		{
			title: "Teams",
			pricing: "Annual ",
			pricingDetails: "Plan",
			features: [
				"All AI tools",
				"Culling (Coming soon)",
				"Album Designing (Coming soon)",
				"Customised Plan",
			],
			buttonlabel: "Talk to Us",
			footerNote: "Billed monthly per usage",
		},
	];

	return (
		<>
			<Box className="bg-primary-50 py-20">
				<Container maxWidth="lg" className="!p-0">
					<Box className="!flex flex-col items-center p-3">
						<Typography
							className="!mb-10 font-playfair text-4xl lg:text-5xl text-primary-950"
							style={{ fontWeight: 500, pb: 3 }}
							textAlign={"center"}
							typography={{
								xs: "h4",
								md: "h3",
							}}
						>
							Choose your 10x Human Editor
						</Typography>
						<Typography variant="h6" className="pb-10 text-center">
							Edit your projects fast like never before without
							sacrificing on quality Get 1,000 AI edits on us and
							discover the plan that works best for you !
						</Typography>
					</Box>
					<Slider {...slickSettings}>
						{pricingCards &&
							pricingCards.map((pricing, index) => (
								<Tilt
									className="slick-slide px-5 py-4"
									key={`pricing-${index}`}
								>
									<PricingCard card={pricing} />
								</Tilt>
							))}
					</Slider>
				</Container>
			</Box>
		</>
	);
};

export default Pricing;
