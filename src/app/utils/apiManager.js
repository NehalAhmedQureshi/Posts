// utils/apiManager.js
// 'use client'
export async function apiManager({ path='', method = 'GET', headers, body = null }) {
     try {
       const options = {
         method:method.toUpperCase(),
         headers: {
           'Content-Type': 'application/json',
           ...headers,
         },
         ...(body && { body: JSON.stringify(body) }),
       };
       console.log('options', options)
      //  merge constant api url with path name
       const url = process.env.API_PUBLIC_ROUTE + path
       console.log(url , 'url')
       const response = await fetch(url, options);
       console.log('response', response)
       // Throw custom error on non-2xx responses
       if (!response.ok) {
         const errorData = await response.json().catch(() => ({}));
         throw new Error(errorData.message || `API error: ${response.status}`);
       }
   
       const data = await response.json();
       return { data };
     } catch (error) {
       return { error: error.message || 'Something went wrong' };
     }
   }
   