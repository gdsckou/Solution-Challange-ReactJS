import { ProductPaper } from "./components";
import styled from "styled-components";
import { Chip, Rating } from "@mui/material";
import { Divider, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHeart,
	faPlus,
	faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HTTPMethods } from "../../Constants/methods";
import endpoints from "../../Constants/endpoints";
import axios from "axios";
import point_ill from "../../assets/token.png";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const _Divider = styled("div")(
	(props) => `
        height: 1px;
        width: 100%;
        background-color: black;
    `
);

const _Button = styled("button")(
	(props) => `
        border-radius: 50%;
        padding: 0.5em;
        background-color: black;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    `
);

const _StyledButton = styled("button")(
	(props: any) => `
		width: 100%;
		padding: 5px;
		border-radius: 5px;
		background-color: ${props.bgColor};
		color: ${props.color};
		border: ${props.border};
		transition: background-color 350ms ease-out;
	`
);

interface ProductProps {
	id: string;
	owner: any;
	title: string;
	point: number;
	description: string;
	img: string;
	tag: string;
	fav?: boolean;
	pending?: boolean;
}

const Product = (props: ProductProps) => {
	const navigate = useNavigate();

	axios.defaults.baseURL = "http://app.welfare.ws/";
	axios.defaults.headers.common["Access-Control-Allow-Origin"] =
		"http://app.welfare.ws/";
	axios.defaults.withCredentials = true;

	const token = localStorage.getItem("token");

	const [isFav, setFav] = useState(false);
	const [display, setDisplay] = useState<boolean | undefined>(true);

	const handleJoin = () => {
		HTTPMethods.Join(
			`${endpoints.Advert.Join}${props.id}`,
			{},
			{ Authorization: `Bearer ${token}` }
		)
			.then((response: any) => {
				toast.success(response.data.message);
			})
			.catch((error: any) => {
				toast.error(error.response.data.message);
			});
	};

	return (
		<>
			{display && (
				<div className="flex flex-col rounded bg-white shadow-md shadow-slate-300 p-2 items-center">
					{!props.pending ? (
						<>
							<img
								className="mb-2 rounded"
								src={props.img}
								alt=""
								style={{ width: 160, height: 90 }}
							/>
							<Rating value={4} readOnly />
							<p
								style={{
									maxWidth: 100,
									textOverflow: "ellipsis",
									overflow: "hidden",
									whiteSpace: "nowrap",
								}}
							>
								{props.title}
							</p>
							<p
								style={{
									maxWidth: 100,
									textOverflow: "ellipsis",
									overflow: "hidden",
									whiteSpace: "nowrap",
								}}
							>
								{props.description}
							</p>
							<p
								style={{
									maxWidth: 100,
									textOverflow: "ellipsis",
									overflow: "hidden",
									whiteSpace: "nowrap",
								}}
							>
								{props.owner.username}
							</p>
							<p className="font-bold text-blue-950 text-lg">
								<span className="flex items-center gap-2">
									{props.point}
									<img
										src={point_ill}
										alt=""
										className="w-5 h-5"
									/>
								</span>
							</p>
							<_Divider className="mt-2 mb-2" />
							<div className="flex flex-col gap-2 justify-evenly items-center w-full mb-2">
								<_StyledButton
									onClick={() => {
										navigate(`/product/${props.id}`);
									}}
									bgColor="#27ae60"
									color="#fff"
								>
									View
								</_StyledButton>
								<Button
									variant="outlined"
									fullWidth
									onClick={handleJoin}
								>
									Join
								</Button>

								{!props.fav ? (
									<_StyledButton
										bgColor={
											isFav ? " #e67e22" : "transparent"
										}
										color={isFav ? "#fff" : " #e67e22 "}
										border="1px solid #e67e22"
										onClick={() => {
											setFav(true);
											axios
												.post(
													`http://app.welfare.ws/api/v1/advert/favoriteAdverts/${props.id}`,
													{},
													{
														headers: {
															Authorization: `Bearer ${localStorage.getItem(
																"token"
															)}`,
														},
													}
												)
												.then((response) => {
													toast.success(
														response.data.message
													);
												})
												.catch((error) => {
													toast.error(
														error.response.data
															.message
													);
												});
										}}
									>
										Fav
									</_StyledButton>
								) : null}
								{props.fav ? (
									<Button
									onClick={() => {
										axios
											.delete(
												`http://app.welfare.ws/api/v1/advert/favoriteAdverts/${props.id}`,
												{
													headers: {
														Authorization: `Bearer ${localStorage.getItem(
															"token"
														)}`,
													},
												}
											)
											.then((response) => {
												toast.success(
													response.data.message
												);
												setDisplay(false);
											})
											.catch((error) => {
												toast.error(
													error.response.data.message
												);
											});
									}}
									className=" mt-1"
									variant="outlined"
									color="error"
									fullWidth
								>
									REMOVE
								</Button>
								) : null}
							</div>
							<Chip label={props.tag} />
							
						</>
					) : (
						<>
							<img
								className="mb-2"
								src={props.img}
								alt=""
								style={{ width: 160, height: 90 }}
							/>
							<p
								style={{
									maxWidth: 100,
									textOverflow: "ellipsis",
									overflow: "hidden",
									whiteSpace: "nowrap",
								}}
							>
								{props.title}
							</p>
							<p
								style={{
									maxWidth: 100,
									textOverflow: "ellipsis",
									overflow: "hidden",
									whiteSpace: "nowrap",
								}}
							>
								{props.description}
							</p>
							<Button
								onClick={() => {
									axios
										.delete(
											`http://app.welfare.ws/api/v1/advert/withdraw/${props.id}`,
											{
												headers: {
													Authorization: `Bearer ${localStorage.getItem(
														"token"
													)}`,
												},
											}
										)
										.then((response) => {
											toast.success(
												response.data.message
											);
											setDisplay(false);
										})
										.catch((error) => {
											toast.error(
												error.response.data.message
											);
										});
								}}
								className=" mt-1"
								variant="outlined"
								color="error"
								fullWidth
							>
								Withdraw
							</Button>

							<Divider />
							<Chip label={props.tag} />
						</>
					)}
				</div>
			)}
		</>
	);
};
export default Product;
