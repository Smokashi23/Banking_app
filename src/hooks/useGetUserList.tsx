import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import storage from "../utils/storage"; 

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:1925/admin/",
  prepareHeaders: (headers, { getState }) => {
    const token = storage.getToken();

    if (token) {
      headers.set("Authorization", token);
      console.log(token);
    }
    return headers;
  },
});

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserList: builder.query<any[], void>({
      query: () => "user_list",
      providesTags: ["User"],
    }),

    updateUser: builder.mutation<any, any>({
      query: (data) => ({
        url: "update_user",
        method: "PUT",
        body: {
          ...data,
        },
      }),
      invalidatesTags:["User"]
    }),
  }),
});

export const { useGetUserListQuery ,useUpdateUserMutation} = userApi;
