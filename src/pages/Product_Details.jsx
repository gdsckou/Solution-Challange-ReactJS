import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { CiLocationOn } from "react-icons/ci"
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import Button from '@mui/material/Button'
import { toast } from 'react-toastify';
import coin from '../assets/token.png'
import GoogleMapComponent from '../components/GoogleMapComponent';





const Product_Details = () => {

  const [name, setName] = useState("");
  const [cat, setCat] = useState("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [images, setImages] = useState([]);
  const [city, setCity] = useState("");
  const [participantCount,setParticipantCount] = useState();
  const [participants,setParticipants] = useState([]);
  const [winner,setWinner] = useState();
  const { id } = useParams();
  const [latitude,setLatitude] = useState("");
  const [longitude,setLongitude] = useState("");

  console.log(id);

  const url = `/api/v1/advert/viewPublicAdvert/${id}`
  const token = localStorage.getItem('token');
  console.log(token);
  const [detail,setDetail] = useState(false);
  const [joined,setJoined] = useState(false);

  

  useEffect(() => {

    axios.get(`/api/v1/advert/advertDetails/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    })
    .then(response => {
        if(response.data.success){
            setDetail(true);
            setParticipantCount(response.data.advertDetails.participantCount)
            if(response.data.advertDetails.status=='completed') setWinner(response.data.advertDetails.winner); 
            console.log(response)
        }
    }).catch(error => {
      console.log(error.response.data.message);
    });

    

    if(!detail){
      axios.get('/api/v1/advert/advertStatus/participatedAdverts',{
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })
      .then(response => {
        response.data.adverts.forEach((advert) => {
          if(advert._id==id) setJoined(true);
        })
        console.log(response);
      }).catch(error => {
        console.log(error.response.data.message);
      });
    }



    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
        if (response.data.success) {

          console.log(response);
          if(response.data.advert.latitude){
            setLatitude(response.data.advert.latitude);
            setLongitude(response.data.advert.longitude);
            latitude.replace(",",".");
  longitude.replace(",",".");
          }
          setName(response.data.advert.owner);
          setPrice(response.data.advert.point);
          setCat(response.data.advert.category + "/" + response.data.advert.tag);
          setHeading(response.data.advert.title);
          setCity(response.data.advert.city);
          if(response.data.advert.status=='completed'){
            setWinner(response.data.advert.winner);
          }
          setDescription(response.data.advert.description);
          setImages(prev => response.data.advert.images);

          console.log(response.data);
        }
        else toast.error(response.data.message);
      })
      .catch(error => {
        console.error('urun detayi cekme hatasi', error);
      });

  }, [])


  const Product = styled.div`
  
`;





  const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 15px;
`;

  const Images = styled.img`
   width: 400px;
   justify-self: center;
   align-self: center;
   
   object-fit: cover;
`;


  const Category = styled.span`
  font-size: 1vw;
  
  padding: 5px;
  border-bottom: 1px solid #000;
`
  const DealerDetails = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`


  const DetailBox = styled.div`
  border-radius: 5px;
  border: 1px solid #eee;
  width: 100%;
  padding: 8px 5px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  font-size: 0.9vw;
  
  
`

  const LocationBox = styled.div`
  border-radius: 5px;
  border: 1px solid #eee;
  width: 100%;
  padding: 8px 0px;
  display: flex;
  align-items: center;
  flex-direction: row;
  background-color: #fff;
  font-size: 0.9vw;
 
  
`
  const ProductInformation = styled.div`
  width: 100%;
  padding: 10px 0px 5px 5px;
  border-radius: 5px;
  border: 1px solid #eee;
  background-color: #fff;
  font-size: 1.3vw;
  min-height: 150px;
  overflow: visible;
  word-wrap: break-word;
`

  const PriceBox = styled.div`
  width: 100%;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 15px 0px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #eee;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`
  const LocationDetails = styled.div`
 width: 100%;
 height: 400px;
 background-color: #fff;
 border-radius: 5px;

`

  const _Button = styled.button`
  width: 100%;
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;
  padding: 15px 0px;
  text-align: center;
  border-radius: 5px;
  border: 2px solid #999;
  background-color: #fff;
  outline: none;
  cursor: pointer;
  
` 
  const navigate = useNavigate();


  const editProd = (event) => {
    navigate(`/edit/${id}`)
  }

  const finishAdvert = (event) => {
    axios.post(`/api/v1/advert/performDraw/${id}`
    ).then(response => {
      if(response.data.success) toast.done(response.data.message);
      else toast.error(response.data.message);
    }).catch(error => {
      toast.error(error.response.data.message);
    });
  }

  const joinAdvert = (event) => {
    axios.post(`/api/v1/advert/join/${id}`,{}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      if(response.data.success) toast.done(response.data.message);
      else toast.error(response.data.message);
    }).catch(error => {
      toast.error(error.response.data.message);
    });
  }

  const quitAdvert = (event) => {
    axios.delete(`/api/v1/advert/withdraw/${id}`
    ).then(response => {
      if(response.data.success) toast.info(toast.data.message);
      else toast.error(response.data.message);
    }).catch(error => {
      toast.error(error.response.data.message);
    });
  }

  const deleteAdvert = (event) => {
    axios.delete(`/api/v1/advert/${id}`,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      toast.done(response.data.message);
    }).catch(error => {
      toast.error(error.response.data.message);
    })
  }

    const addFavorite = (event) => {
      axios.post(`/api/v1/advert/favoriteAdverts/${id}`,{},{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        toast.done(response.data.message);
      }).catch(error => {
        toast.error(error.response.data.message);
      })
    }
    
    const deleteFavorite = (event) => {
      axios.delete(`/api/v1/advert/favoriteAdverts/${id}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        toast.done(response.data.message);
      }).catch(error => {
        toast.error(error.response.data.message);
      })
    }

    
      
      const [bool,setBool] = useState(false);
      
  
      axios.get('/api/v1/advert/favoriteAdverts/10',{
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        })
        .then(response => {
           response.data.favoriteAdverts.map((dt,key) => {
              if(dt._id==id){ setBool(true); console.log("true gordum");}
              
           })
        }).catch(error => {
          
        });
  


    

  

  console.log(latitude,longitude);


  return (
    <>
      <Navbar />
      <Product className="container mx-auto xl:max-w-screen-xl grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1   p-4">
          <Carousel>
            {
              images.map((s,key) => (
                <img src={s} key={key} />
              ))
            }
          </Carousel>
        </div>
        <Details className="col-span-1  p-4">
          <Category>
            {cat}
          </Category>
          <DealerDetails>
            <DetailBox>
            <span style={{ fontSize: '1.15vw' }}>Ads Owner:</span>
              <span style={{ fontWeight: 'bold', fontSize: '1.5vw', marginBottom: '5px' }}>{name}</span>

            </DetailBox>
            <LocationBox>
              <CiLocationOn size='3vw' /><span style={{ margin: '0px 10px', fontSize: '1.25vw' }}> Location<br></br>
                <span style={{ fontWeight: 'bold', fontSize: '1.25vw', marginTop: '5px' }}>{city}</span>
              </span>
            </LocationBox>
          </DealerDetails>
          <ProductInformation>{description}
          </ProductInformation>
          <div className='grid grid-cols-2'>
          {
                winner==undefined?(
                  detail?(
                    <>
                    <PriceBox>{price} <img src={coin} className=' w-auto col-span-1 h-6'/></PriceBox>
                    <Button variant="contained" color="error" className='col-span-1 w-full h-full' onClick={deleteAdvert}>
                      Delete this Advert
                    </Button>
                    </>                      
                  ):(
                    <>
                    <PriceBox>{price}  <img src={coin} className=' w-auto col-span-1 h-5'/></PriceBox>
                    {
                        bool?(
                          <Button onClick={deleteFavorite} variant="contained" color="error" className='col-span-1 w-auto h-full'>
                      Remove from favorites
                    </Button>
                        ):(
                          <Button onClick={addFavorite} variant="contained" color="error" className='col-span-1 w-auto h-full'>
                      Add to your favorites
                    </Button>
                    
                        )
                    }
                    </>
                  )
                ):(
                  <PriceBox className='w-auto col-span-2 h-6'>{}</PriceBox>
                )
              }
          </div>
          
          <LocationDetails>
                {
                  latitude==undefined?(
                    <></>
                  ) : (
                    <>
                    <GoogleMapComponent latitude={latitude} longitude={longitude} />
                    </>
                  )
                }
          </LocationDetails>
          {
            winner==undefined?(
              
                detail ? (
                  <>
                  <_Button onClick={editProd}>Edit</_Button>
                  <_Button onClick={finishAdvert}>Finish the Advert</_Button>
                  </>
                ):(

                  joined?(
                    <>
                    <Button variant="text" disabled color="default">
                      You have already joined
                    </Button>
                    <_Button onClick={quitAdvert}>Withdraw from Advert</_Button>
                    </>
                  ):(
                    <_Button onClick={joinAdvert}>Join Advert!</_Button>
                  )

                )
              
            ):(
              <Button variant="outlined" color="warning" disabled >
              You have already joined
            </Button>
            )

          }  
          
        </Details>
      </Product>
    </>
  )
}

export default Product_Details