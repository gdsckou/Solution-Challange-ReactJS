import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faAngleDown, faRightToBracket, faCartShopping, faClose, faMinus, faHeart, faKey, faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Button, TextField, Badge, Autocomplete } from "@mui/material";
import logo from '../../assets/logo.png';
import logo2 from '../../assets/logo3.png';
import { Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useTags } from "../../hooks/hooks";
import { signOut } from "../../redux/slices/user";

const _Input = styled.input`
    border: 1px solid #aeb6bf;
    border-radius: 5px 0 0 5px;
    padding: 5px;
    width: 600px;
`;


const _Button = styled.button`
    border: 1px solid #aeb6bf;
    border-left: none;
    display: flex;
    align-items: center;
    justify-content: center;
    
    width: 36px;
    height: 36px;

    border-radius: 0 5px 5px 0;
`;


const _CartItem_Button = styled("button")(
    props => `
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #2c3e50;
        border-radius: 50%;
        padding: 0.5em;
        color: white;
    `
)


const _CartItem = () => {
    return (
        <div className="w-full bg-white rounded flex p-2 shadow-md shadow-slate-400 flex items-center gap-4">
            <div className="w-16 h-16 rounded border border-slate-700"></div>
            <div className="flex flex-col gap-2">
                <p>Item</p>
                <div className="flex gap-2">
                    <Tooltip title="Remove">
                        <_CartItem_Button>
                            <FontAwesomeIcon icon={faMinus} />
                        </_CartItem_Button>
                    </Tooltip>

                    <Tooltip title="Add to Favs">
                        <_CartItem_Button>
                            <FontAwesomeIcon icon={faHeart} />
                        </_CartItem_Button>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}


const Navbar = () => {

    const [isCartVisible, setCartVisible] = useState(false);
    const [category, setCategory] = useState("");
    const [tag, setTag] = useState("");
    const tags = useTags();

    const navigate = useNavigate();
    const userData = useSelector(state => state.user);
    const userDispatch = useDispatch();

    const [isAuthenticated, setAuthenticated] = useState(localStorage.getItem('isAuthenticated'));

    const getTargetURL = () => {

        var targetURL = '/products';
        if (category && tag) {
            targetURL = `/products?category=${category}&tag=${tag}`;
        }
        else if (category) {
            targetURL = `/products?category=${category}`;
        }
        return targetURL;
    }

    return (
        <>
            <div className="w-full flex items-center h-20 p-4 pr-8 bg-white justify-between z-20 shadow-md">
                <div className="rounded-lg overflow-hidden">
                <Link to="/">
                    <img
                        src={logo2}
                        alt=""
                        width="72"
                        className="rounded-3xl overflow-hidden"
                    />
                </Link>
                </div>
                <div className="flex">
                    <Autocomplete
                        value={category}
                        onChange={(e, v) => {
                            setCategory(v);
                            setTag("");
                        }}
                        options={Object.keys(tags)}
                        renderInput={(params) => <TextField {...params} label="Category" />}
                        sx={{
                            width: 300
                        }}
                    />
                    <Autocomplete
                        value={tag}
                        onChange={(e, v) => {
                            setTag(v);
                        }}
                        options={category ? tags[category] : []}
                        renderInput={(params) => <TextField {...params} label="Tag" />}
                        sx={{
                            width: 200
                        }}
                    />
                    <Tooltip title="Search">
                        <Button
                            variant="outlined"
                            onClick={() => {
                                navigate(getTargetURL())
                            }}
                        >
                            <FontAwesomeIcon className="w-5 h-5" icon={faMagnifyingGlass} />
                        </Button>
                    </Tooltip>
                </div>

                <div className="flex gap-4 items-center">
                    {
                        isAuthenticated === 'true'
                            ? (
                                <>
                                    <Tooltip title="Profile">
                                        <Link to="/profile">
                                            <FontAwesomeIcon className="w-6 h-6 text-blue-900" icon={faUser} />
                                        </Link>
                                    </Tooltip>

                                    <Tooltip title="Sign out">
                                        <button onClick={() => {
                                            setAuthenticated(false);
                                            localStorage.setItem('isAuthenticated', '')
                                            localStorage.setItem('token', '')
                                            window.location.reload();
                                        }}>
                                            <FontAwesomeIcon className="w-6 h-6 text-blue-900" icon={faRightFromBracket} />
                                        </button>

                                    </Tooltip>
                                </>
                            )
                            : (
                                <Tooltip title="Sign in">
                                    <Link to="/signin">
                                        <FontAwesomeIcon className="w-6 h-6 text-blue-900" icon={faKey} />
                                    </Link>
                                </Tooltip>
                            )
                    }
                </div>
            </div>

            {
                isCartVisible &&
                (
                    <div className="h-screen w-full z-50 fixed grid grid-cols-12">
                        <div className="bg-slate-800 opacity-85 h-full col-span-10"></div>
                        <div className="h-full bg-slate-200 right-0 col-span-2 p-4 relative">

                            <div className="flex justify-between items-center border-b border-slate-900 pb-4 mb-4">
                                <h1>My Cart</h1>
                                <FontAwesomeIcon className="cursor-pointer w-5 h-5" icon={faClose} onClick={() => setCartVisible(false)} />
                            </div>
                            <div className="flex flex-col">
                                <_CartItem />
                            </div>
                            <Button
                                className="absolute bottom-0"
                                variant="outlined"
                            >
                                Complete *!
                            </Button>
                        </div>
                    </div>
                )
            }
        </>

    );
}
export default Navbar;