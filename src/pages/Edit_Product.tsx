import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
	Autocomplete,
	Box,
	Button,
	Checkbox,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
	Slider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTags } from "../hooks/hooks";
import { useFormik } from "formik";
import img_placeholder from "../assets/img_placeholder.avif";
import { AutoComplete, DatePicker } from "antd";

const Edit_Product = () => {
	const tags: any = useTags();

	const formik = useFormik({
		initialValues: {
			title: "",
			description: "",
			category: "",
			tag: "",
			points: "",
			deadline: "",
			minParticipiants: 2,
			images: [],
		},
		onSubmit: (values) => {
			console.log(values);
		},
	});

	return (
		<div className="bg-slate-100 flex flex-col h-screen">
			<Navbar />
			<form
				className="h-full grid grid-cols-3 m-auto w-2/4 pt-20 pb-20"
				onSubmit={formik.handleSubmit}
			>
				<p className="col-span-1">Geri</p>
				<p className="col-span-2">Ürün</p>
				{[1, 2, 3].map((item) => (
					<Button variant="outlined">Upload Image</Button>
				))}

				<TextField
					name="title"
					id="title"
					className="col-span-3"
					label="Title"
					onChange={formik.handleChange}
					value={formik.values.title}
				/>
				<TextField
					id="description"
					name="description"
					className="col-span-3"
					label="Description"
					rows={4}
					multiline
					onChange={formik.handleChange}
					value={formik.values.description}
				/>
				<TextField label="City" id="city" name="city" onChange={formik.handleChange} />
				<TextField label="Points" id="points" name="points" onChange={formik.handleChange} />
				<Autocomplete
					options={["Public", "Private"]}
					renderInput={(params) => (
						<TextField {...params} label="Visibility" />
					)}
					value={"Public"}
				/>
				<Slider
					className="col-span-3"
					onChange={(e, v) => {
						formik.setFieldValue("minParticipants", v);
					}}
                    max={100}
                    min={2}
				/>
				<DatePicker
					className="col-span-3"
					onChange={(date, dateString) => {
						formik.setFieldValue("deadline", dateString);
					}}
				/>
				<Autocomplete
					onChange={(e, v) => {
						formik.setFieldValue("category", v);
						formik.setFieldValue("tag", "");
					}}
					className="col-span-1"
					options={Object.keys(tags)}
					renderInput={(params) => (
						<TextField {...params} label="Category" />
					)}
					value={formik.values.category}
				/>
				<Autocomplete
					onChange={(e, v) => {
						formik.setFieldValue("tag", v);
					}}
					className="col-span-2"
					options={
						formik.values.category
							? tags[formik.values.category]
							: []
					}
					renderInput={(params) => (
						<TextField {...params} label="Tag" />
					)}
					value={formik.values.tag}
					disabled={formik.values.category ? false : true}
				/>
				<Button
					className="col-span-3"
					type="submit"
					variant="contained"
				>
					Save Changes
				</Button>
			</form>
		</div>
	);
};

export default Edit_Product;
