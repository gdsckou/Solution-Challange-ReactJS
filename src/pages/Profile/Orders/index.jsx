import { Button } from "@mui/material";
import Navbar from "../../../components/Navbar";

import illustration1 from '../../../assets/DrawKit Vector Illustration Black Friday & Online Shopping (3).png';
import token from '../../../assets/token.png';
import wave from '../../../assets/wave.png';
import { Table } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClock, faList, faHeart, faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
import ProfileSidebar from "../../../components/ProfileSidebar";
import { Divider } from "@mui/material";

import axios from 'axios'
import { useEffect, useState } from "react";


const _Foo = () => {
    return (
        <div className="w-full bg-white rounded-md p-4 flex items-center justify-between">
            <div className="border border-slate-500 rounded w-32 h-32"></div>
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-blue-950 tracking-wider">
                    Product Name
                </h1>
                <p>Description</p>
            </div>
            <div className="flex flex-col">
                <p className="text-2xl font-bold text-blue-950 tracking-wider">
                    Satıcı
                </p>
                <p>Bilinmiyor</p>
            </div>
            <p className="text-2xl font-bold text-blue-950 tracking-wider">01 Ocak 1970</p>
            <p className="text-2xl font-bold text-blue-950 tracking-wider">999,99 ₺</p>
        </div>
    );
}


    

    

    
   
const Orders = () => {
    
    const [isEmpty,setIsEmpty] = useState(true);
    const tokenString = localStorage.getItem("token"); 
        axios.get("/api/v1/advert/getAdvert", {
            headers: {
                'Authorization': `Bearer ${tokenString}`
            }
        })
        .then(response => {
            if(response.data.success){
            response.data.adverts.forEach((advert) => {
                data.push({
                    product: advert.title,
                    productName: advert.category + "/" + advert.tag,
                    seller: advert.owner.username,
                    date: "??",
                    fee: advert.createTime,
                    img: advert.images[0],
                })
            })
        }
        console.log(data);
        if(response.data.adverts.length!=0) setIsEmpty(false);
            
      
        })
        .catch(error => {
            setIsEmpty(!false);
            
        });
    
    var columns = [
        {
            title: 'Ürün',
            dataIndex: 'product',
            key: 'product',
            render: () => {
                return <img src={img} className="border border-slate-500 rounded w-32 h-32"/>
            }
        },
        {
            title: 'Ürün Adı',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Satıcı',
            dataIndex: 'seller',
            key: 'seller',
        },
        {
            title: 'Tarih',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Fiyat',
            dataIndex: 'fee',
            key: 'fee',
            render: (value) => {
                return (<div className="flex items-center gap-2">
                    <img width="24" src={token} alt="" />
                    <p>{value}</p>
                </div>
                );
            }
        }
    ];

    return (
        <div className="w-screen h-screen flex flex-col">
            <Navbar  />
            <div className="w-full h-full flex bg-slate-100">
                <ProfileSidebar />
                <div className="flex flex-col gap-5 w-11/12 p-4 px-20">
                    <h1 className="text-2xl text-blue-950 font-bold tracking-widest">My Profile / History</h1>
                    <Divider />
                    {
                        isEmpty 
                        ? (
                            <div className="flex flex-col w-full items-center">
                                <img src={illustration1} alt="" width="512" />
                                <h1 className="text-3xl text-blue-950 font-bold mb-4 tracking-wider">
                                You haven't made any purchases yet
                                </h1>
                                <Button
                                    variant="outlined"
                                >
                                    Go Ads
                                </Button>
                            </div>
                        )
                        : (
                            <div className="flex flex-col w-full items-center gap-2">
                                <Table className="w-full shadow-md shadow-slate-300" columns={columns} dataSource={data} />
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    );
}

export default Orders;