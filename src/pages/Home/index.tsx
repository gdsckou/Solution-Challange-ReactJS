import { Page, Container, Box, Content, Title } from "./components";
import Navbar from "../../components/Navbar";
import Product from "../../components/Product";
import Category from "../../components/Category";
import styled from "styled-components";

import { Button, Divider } from "@mui/material";
import { Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHeart,
	faStar,
	faShareNodes,
	faPhone,
	faLocationDot,
	faShieldHalved,
	faPlus,
	faArrowLeft,
	faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import clothes from "../../assets/clothes.png";
import monitor from "../../assets/monitor.png";
import pencil from "../../assets/pencil.png";
import detergent from "../../assets/detergent.png";
import animal from "../../assets/animal.png";
import food from "../../assets/food.png";
import books from "../../assets/books.png";
import cosmetics from "../../assets/cosmetics.png";
import musical from "../../assets/musical.png";
import baby from "../../assets/baby.png";

import asd from "../../assets/Allura - Giant Phone.png";
import asd2 from "../../assets/Allura - Feedback Session.png";
import { useRef, useEffect, useState, MouseEventHandler } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { usePendingAdverts } from "../../Services/pendingAdverts";
import { Chip } from "@mui/material";
import { useSelector } from "react-redux";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from "react-router-dom";
import coin from '../../assets/token.png'
interface FooProps {
	title: string;
	category: string;
	src?: string;
}

const Foo = (props: FooProps) => {
	const navigate = useNavigate();

	const handleClick = (e: MouseEventHandler<HTMLButtonElement>) => {
		navigate(`/products?category=${props.category}`);
	};

	return (
		<div className="bg-white w-20 h-20 flex items-center justify-center rounded-md shadow-md shadow-slate-400">
			<Tooltip title={props.title}>
				<button onClick={handleClick}>
					<img src={props.src} alt="" width="64" />
				</button>
			</Tooltip>
		</div>
	);
};

const Star = () => {
	return <FontAwesomeIcon className="text-orange-400" icon={faStar} />;
};

const Product_Foo_Button = styled.button`
	border: none;
	background-color: black;
	color: #fff;
	border-radius: 50%;
	padding: 4px;
	aspect-ratio: 1 / 1;
	width: 32px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

interface _FeaturedProps {
	id: string;
	title: string;
	seller: string;
	point: number;
	item: any;
}

const _Featured = (props: _FeaturedProps) => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-between w-full">
				<FontAwesomeIcon className="relative bottom-1" icon={faStar} />
				<FontAwesomeIcon className="relative bottom-3" icon={faStar} />
				<FontAwesomeIcon className="relative bottom-5" icon={faStar} />
				<FontAwesomeIcon className="relative bottom-3" icon={faStar} />
				<FontAwesomeIcon className="relative bottom-1" icon={faStar} />
			</div>

			<div className="bg-white rounded flex flex-col p-4 items-center gap-2">
				<img
					className="w-24 h-24 rounded"
					src={props.item.images[0]}
					style={{ width: 160, height: 90 }}
				/>
				<p style={{ maxWidth: 100, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{props.title}</p>
				<p style={{ maxWidth: 200, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{props.item.description}</p>
				<p>{props.point} ₺</p>
				<Button
					variant="outlined"
					fullWidth
					onClick={() => {
						navigate(`/product/${props.id}`);
					}}
				>
					View
				</Button>

				<Divider />
				<Chip label={props.item.tag} />
			</div>
		</div>
	);
};

const _Slider = (props: { page: any; featured: any }) => {
	const [width, setWidth] = useState<number>(1);
	const [height, setHeight] = useState<number>(1);

	const ref: any = useRef<HTMLDivElement>();

	useEffect(() => {
		if (ref && ref.current) {
			setWidth(ref.current.offsetWidth);
			setHeight(ref.current.offsetHeight);
		}
		console.log("slider ", props.featured);
	}, []);

	return (
		<div
			className="w-full h-full bg-transparent rounded overflow-hidden"
			ref={ref}
		>
			<div className="w-full h-full relative">
				<div
					style={{
						transition: "left 250ms ease-out",
						width,
						height,
						left: -(width * props.page),
					}}
					className="absolute flex items-center justify-center gap-10"
				>
					<_Featured
						item={props.featured[0]}
						id={props.featured[0]._id}
						title={props.featured[0].title}
						seller={props.featured[0].seller}
						point={props.featured[0].point}
					/>
					<_Featured
						item={props.featured[0]}
						id={props.featured[1]._id}
						title={props.featured[1].title}
						seller={props.featured[1].seller}
						point={props.featured[1].point}
					/>
				</div>
				<div
					style={{
						transition: "left 250ms ease-out",
						width,
						height,
						left: -(width * (props.page - 1)),
					}}
					className="absolute flex items-center justify-center gap-10"
				>
					<_Featured
						item={props.featured[0]}
						id={props.featured[2]._id}
						title={props.featured[2].title}
						seller={props.featured[2].seller}
						point={props.featured[2].point}
					/>
					<_Featured
						item={props.featured[0]}
						id={props.featured[3]._id}
						title={props.featured[3].title}
						seller={props.featured[3].seller}
						point={props.featured[3].point}
					/>
				</div>
				<div
					style={{
						transition: "left 250ms ease-out",
						width,
						height,
						left: -(width * (props.page - 2)),
					}}
					className="absolute flex items-center justify-center gap-10"
				>
					<_Featured
						item={props.featured[0]}
						id={props.featured[4]._id}
						title={props.featured[4].title}
						seller={props.featured[4].seller}
						point={props.featured[4].point}
					/>
					<_Featured
						item={props.featured[0]}
						id={props.featured[5]._id}
						title={props.featured[5].title}
						seller={props.featured[5].seller}
						point={props.featured[5].point}
					/>
				</div>
			</div>
		</div>
	);
};

const Home = () => {
	const [page, setPage] = useState<number>(0);
	const [adverts, setAdverts] = useState<Array<any>>([]);
	const [favourites, setFavourites] = useState<Array<any>>([]);
	const [featured, setFeatured] = useState<Array<any>>([]);
	const [items, setItems] = useState([]);
	const as = useSelector(state => state.user)

	//! Refactor it later, Fix it.
	const [pending, setPending] = useState<Array<any>>([]);

	useEffect(() => {
		setPending([]);

		if (!localStorage.getItem("token")) {
			return;
		}

		axios
			.get("http://app.welfare.ws/api/v1/advert/filteredAdverts", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((response) => {
				console.log(response);
				const data = response.data;
				setAdverts(data.adverts);
				console.log("slice", data.adverts.slice(0, 6));
				setFeatured(data.adverts.slice(0, 6));
			})
			.catch((error) => {
				console.log(error);
			});

		axios.get("http://app.welfare.ws/api/v1/advert/filteredAdverts", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((response) => {
				// API'den gelen veriyi items state'ine uygun şekilde dönüştür
				const adverts = response.data.adverts.map(advert => ({
					_id: advert._id, // İlanın benzersiz ID'si
					img: advert.images[0], // İlk resim URL'si
					title: advert.title, // İlan başlığı
					point: advert.point, // Puan bilgisi
				}));
				setItems(adverts); // items state'ini güncelle
			})
			.catch((error) => {
				console.error(error);
			});

		axios
			.get("http://app.welfare.ws/api/v1/advert/favoriteAdverts/7", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((response) => {
				const data = response.data;
				setFavourites(data.favoriteAdverts);
				console.log("favourites", data.favoriteAdverts);
			})
			.catch((error) => {
				console.error(error);
			});

		axios
			.get("/api/v1/advert/advertStatus/participatedAdverts", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((response) => {
				const activeAdverts = response.data.adverts.filter((dt) => dt.status === "active");
				setPending(activeAdverts); // Tüm aktif ilanları bir kerede setPending ile güncelle
			})
			.catch((error) => {
				console.log(error.response.data.message);
			});
	}, []);

	return (
		<Page>
			<Navbar />
			<Content>
				<div className="grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-3 gap-4">
					<div className="lg:col-span-3 lg:row-span-3 flex" style={{ maxHeight: 550, overflow: 'auto' }}>
						<ImageList variant="masonry" cols={3} gap={8}>
							{items.map((item, index) => (
								<ImageListItem key={index}>
									{/* Link komponentini kullanarak /product/:id sayfasına yönlendir */}
									<Link to={`/product/${item._id}`}>
										<img
											srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
											src={`${item.img}?w=248&fit=crop&auto=format`}
											alt={item.title}
											loading="lazy"
										/>
										<ImageListItemBar
											title={ <div style={{ display: 'flex', alignItems: 'center' }}>
											<span style={{ marginRight: 5 }}>{item.point}</span>
											<img src={coin} alt="Coin" style={{ height: '24px' }} />
										</div>} 
											position="top" 
											sx={{
												background:
													'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
													'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
											}}
										/>
									</Link>
								</ImageListItem>
							))}
						</ImageList>
					</div>
					<div className="lg:col-span-2 lg:row-span-1 flex flex-col bg-white rounded-md p-4 gap-4 box-border justify-center">
						<h1 className="font-bold text-2xl text-blue-950">
							Categories
						</h1>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
							<Foo
								category="Clothing"
								src={clothes}
								title="Clothing"
							/>
							<Foo
								category="Electronics"
								src={monitor}
								title="Electronics"
							/>
							<Foo category="Hobby" src={pencil} title="Hobby" />
							<Foo
								category="Baby Products"
								src={baby}
								title="Baby Products"
							/>
							<Foo
								category="Home Furnishings"
								src={food}
								title="Home Furnishings"
							/>
							<Foo
								category="Musical Instruments"
								src={musical}
								title="Musical Instruments"
							/>
						</div>
					</div>
					<div className="col-span-2 row-span-2 flex flex-col bg-white p-4 gap-4 box-border rounded-md">
						<h1 className="font-bold text-2xl text-blue-950">
							Pending
						</h1>
						<div className="flex overflow-auto gap-4">
							{pending.map((item, index) => (
								<Product
									id={item._id}
									owner={item.owner}
									point={item.point}
									description={item.description}
									img={item.images[0]}
									tag={item.tag}
									pending
								/>
							))}
						</div>
					</div>
				</div>
				<div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
					<div className="bg-white rounded-md p-4 flex items-center">
						<FontAwesomeIcon
							className="w-8 h-8 mr-10 text-blue-950"
							icon={faPhone}
						/>
						<p className="text-lg">Visit our mobile app</p>
					</div>
					<div className="bg-white rounded-md p-4 flex items-center">
						<FontAwesomeIcon
							className="w-8 h-8 mr-10 text-blue-950"
							icon={faLocationDot}
						/>
						<p className="text-lg">View only local listings with GPS</p>
					</div>
					<div className="bg-white rounded-md p-4 flex items-center">
						<FontAwesomeIcon
							className="w-8 h-8 mr-10 text-blue-950"
							icon={faShieldHalved}
						/>
						<p className="text-lg">The Welfare ecosystem is self-sustaining</p>
					</div>
				</div>

				<Divider />

				{/*Şu an */}
				<div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2">
					<div className="rounded-md bg-blue-300 grid grid-cols-2 gap-4">
						<img src={asd2} alt="" />
						<div className="flex flex-col justify-between p-4">
							<h1 className="text-blue-950 text-xl font-bold">
								What is Welfare?
							</h1>
							<p>
								Welfare is a sharing platform that helps you
								reach those in need by delivering unused items
								from your home while also assisting you in
								finding items you may need. This application
								provides a sustainable way to both utilize your
								surplus and easily access the things you
								require. By engaging in second-hand
								transactions, it contributes to environmental
								conservation and promotes sharing within the
								community.
							</p>
						</div>
					</div>
					<div className="rounded-md bg-blue-300 grid grid-cols-2 gap-4">
						<img src={asd} alt="" />
						<div className="flex flex-col justify-between p-4">
							<h1 className="text-blue-950 text-xl font-bold">
								Also...
							</h1>
							<p>
								While our Welfare website is accessible with
								limited access due to security measures, for a
								full-featured experience, you can download our
								application by searching for 'Welfare' on the
								Google Play Store. Take a step into the world of
								Welfare with various features such as posting
								ads, signing up, and exploring listings with the
								full version, and discover the power of sharing.
							</p>
						</div>
					</div>
				</div>

				{localStorage.getItem("token") ? (
					<>
						<h1 className="font-bold text-3xl text-blue-950 mt-8">
							Explore
						</h1>
						<Divider />
						<div className="flex gap-4 items-center overflow-auto">
							{adverts.map((item, index) => (
								<Product
									id={item._id}
									owner={item.owner}
									point={item.point}
									description={item.description}
									img={item.images[0]}
									tag={item.tag}
								/>
							))}
						</div>
					</>
				) : null}

				{localStorage.getItem("token") ? (
					<>
						<h1 className="font-bold text-3xl text-blue-950 mt-8">
							Favourites
						</h1>
						<Divider />
						<div className="flex items-center gap-4 overflow-auto">
							{favourites.map((item, index) => (
								<Product
									fav
									id={item._id}
									owner={item.owner}
									point={item.point}
									description={item.description}
									img={item.images[0]}
									tag={item.tag}
								/>
							))}
						</div>
						<Divider />
					</>
				) : null}
			</Content>
		</Page>
	);
};
export default Home;