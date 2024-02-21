import { InputLabel, MenuItem, Select, TextField, Chip, Autocomplete, Button } from "@mui/material";
import Navbar from "../../components/Navbar";
import { Divider, Checkbox } from "antd";
import Product from "../../components/Product";
import { useTags } from "../../hooks/hooks";
import { useEffect, useState } from 'react';
import axios from "axios";
import { useLocation } from "react-router-dom";


const _Sidebar = () => {
    return (
        <aside className="flex flex-col p-4 gap-4">
            <p>Category</p>
            <Select
                id="select-input"
                label="Category"
            >
                <MenuItem>Hobby</MenuItem>
                <MenuItem>Clothing</MenuItem>
                <MenuItem>Electronics</MenuItem>
                <MenuItem>Home Furnishings</MenuItem>
                <MenuItem>Baby Products</MenuItem>
                <MenuItem>Musical Instruments</MenuItem>
                <MenuItem>Other</MenuItem>
            </Select>
            <Divider />
            <Autocomplete
                options={[
                    { id: 1, label: "Tag1" },
                    { id: 2, label: "Tag2" },
                    { id: 3, label: "Tag3" },
                ]}
                renderInput={(params) => <TextField {...params} label="Tags" />}
            />

            <Button
                variant="outlined"
            >
                Search
            </Button>

            <div className="w-full flex flex-wrap gap-2">
                <Chip label="Tag1" onDelete={() => { }} />
                <Chip label="Tag2" onDelete={() => { }} />
                <Chip label="Tag3" onDelete={() => { }} />
            </div>
        </aside>
    );
}


const Products = () => {

    axios.defaults.baseURL = 'http://app.welfare.ws/';
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://app.welfare.ws/';
    axios.defaults.withCredentials = true;

    const [products, setProducts] = useState([]);
    const tags = useTags();

    const location = useLocation();
    const searchParameters = new URLSearchParams(location.search);

    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Örneğin, bir erişim belirteci
        'Content-Type': 'application/json' // İstek tipi JSON ise
    };

    useEffect(() => {
        var targetURL = `http://app.welfare.ws/api/v1/advert/filteredAdverts?category=${searchParameters.get('category')}`;

        if (searchParameters.has('tag')) {
            targetURL = `http://app.welfare.ws/api/v1/advert/filteredAdverts?category=${searchParameters.get('category')}&tag=${searchParameters.get('tag')}`;
        }

        axios.get(
            targetURL,
            { headers }
        )
            .then(response => {
                console.log(response);
                const data = response.data;
                setProducts(data.adverts);
            })
            .catch(error => {

            })
    }, [])

    return (
        <div className="flex flex-col h-screen w-screen bg-slate-100">
            <Navbar />
            <div className="flex flex-wrap gap-4 overflow-auto items-center justify-center w-full h-full">
                {
                    products.map((item, index) =>
                        <Product key={index} id={item._id} owner={item.owner} tag={item.tag} title={item.title} description={item.description} point={item.point} img={item.images[0]} />
                    )
                }
            </div>
        </div>
    );
}

/*
        <div className="w-screen h-screen grid grid-cols-5">
            <div className="col-span-5 h-full">
                <Navbar />
            </div>
            <_Sidebar className="col-span-1 h-full" />
            <div className="col-span-4 flex flex-wrap h-full overflow-auto gap-4">
                {
                    products.map((item, index) =>
                        <Product key={index} id={item._id} owner={item.owner} tag={item.tag} title={item.title} description={item.description} point={item.point} img={item.images[0]} />
                    )
                }
            </div>
        </div>
*/

export default Products;