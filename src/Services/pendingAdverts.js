import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';


<<<<<<< HEAD
export const usePendingAdverts = () => {

  const token = localStorage.getItem("token");
  var adverts = [];

  useEffect(() => {
    axios.get('/api/v1/advert/advertStatus/participatedAdverts', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        response.data.adverts.forEach((dt, key) => {
          if (dt.status == "active") adverts.push(dt);
        })
      }).catch(error => {
        console.log(error.response.data.message);
      });
  }, []);

  return adverts;
}
=======
    const token = localStorage.getItem("token");
    

     axios.get('/api/v1/advert/advertStatus/participatedAdverts',{
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          })
          .then(response => {
            return response.data.adverts.filter((dt) => (
                dt.status=="active"
            ))
          }).catch(error => {
            return [];
          });

    
  
}

export default pendingAdverts
>>>>>>> e7d7331f9afaf5cf340b3ab6992a3d868612cc2f
