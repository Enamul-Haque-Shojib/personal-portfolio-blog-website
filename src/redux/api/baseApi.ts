
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { notification } from 'antd';
// import {
 
//   BaseQueryFn,
//   createApi,
 
//   FetchArgs,
//   fetchBaseQuery,
// } from '@reduxjs/toolkit/query/react';
// import { RootState } from '../store';
// import { logout, setAuth } from '../features/auth/authSlice';

// const baseQuery = fetchBaseQuery({
//   baseUrl: 'http://localhost:5000/api',
//   credentials: 'include',
//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState).authenticate.token;

//     if (token) {
//       headers.set('authorization', `${token}`);
//     }

//     return headers;
//   },
// });

// export const baseApi = createApi({
//   reducerPath: 'baseApi',
//   baseQuery: baseQuery,
//   tagTypes: ['messages', 'projects', 'blogs'],
//   endpoints: () => ({}),
// });



