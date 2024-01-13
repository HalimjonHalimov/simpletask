import React, { use, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import { useAuthContext } from "@/context/contextProvider";
import { Container, Layout } from "@/component";
import { Avatar, Box, Typography } from "@mui/material";
import AuthService from "@/service/authService";

export default function User() {
  const [allUsers, setAllUsers] = useState();
  const { currentUser } = useAuthContext();

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "maidenName", headerName: "Maiden name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    { field: "email", headerName: "Email", width: 130 },
    { field: "phone", headerName: "Phone", width: 130 },
    { field: "username", headerName: "Username", width: 130 },
    { field: "password", headerName: "Password", width: 130 },
  ];

  let rows = [];
  if (allUsers) {
    rows = allUsers.map((user) => {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        maidenName: user.maidenName,
        age: user.age,
        email: user.email,
        phone: user.phone,
        username: user.username,
        password: user.password,
      };
    });
  }

  const fetchingData = async () => {
    try {
      const { users } = await AuthService.getAllUser();
      setAllUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <Layout>
      <Container>
        <h2 className="text-slate-900 font-semibold text-2xl text-center my-4">
          Current User
        </h2>
        <div className="w-full h-auto grid grid-cols-2 gap-8 p-8">
          <div className=" p-4">
            {/* User Personal info with img */}
            {currentUser ? (
              <Box className="flex justify-start items-start gap-2">
                <Avatar
                  alt="Remy Sharp"
                  src={currentUser.image}
                  sx={{ width: 56, height: 56 }}
                />
                <Box>
                  <Typography
                    className="font-semibold"
                    variant="h6"
                    gutterBottom
                  >
                    {currentUser.firstName} {currentUser.lastName}
                  </Typography>
                  <Typography
                    className="text-gray-400 font-semibold"
                    variant="subtitle2"
                    gutterBottom
                  >
                    Birth Date: {currentUser.birthDate}
                  </Typography>
                  <Typography
                    className="text-gray-400 font-semibold"
                    variant="body2"
                    gutterBottom
                  >
                    Gender: {currentUser.gender}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <>Current user not exist</>
            )}
          </div>
          <div className="p-4">
            {/* User Personal info with Work addres and others */}
            <Typography
              className="font-semibold  text-center text-slate-600"
              variant="h5"
              gutterBottom
            >
              Contacting info
            </Typography>
            <div className="flex flex-col justify-start items-start gap-2 ml-2 from-slate-900 text-sm capitalize">
              <Box>
                Email:{" "}
                <span className="font-semibold ml-2">{currentUser.email}</span>
              </Box>
              <Box>
                Phone:{" "}
                <span className="font-semibold ml-2">{currentUser.phone}</span>
              </Box>
              <Box>
                Address:{" "}
                <span className="font-semibold ml-2">
                  {currentUser.address.address}, {currentUser.address.city}
                </span>
              </Box>
            </div>
          </div>
        </div>
        <h2 className="text-slate-900 font-semibold text-2xl text-center my-4">
          All User
        </h2>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </Container>
    </Layout>
  );
}
