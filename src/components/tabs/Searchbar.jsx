import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

const SearchBarContainer = styled("div")(({ theme }) => ({
  backgroundColor: "#3f4a76", // Dark blue background color similar to the image
  padding: theme.spacing(2), // Padding around the search bar
  borderRadius: "0px",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1), // Reduce padding on mobile
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px", // Rounded corners for the input field
    backgroundColor: "#fff", // White background for the input field
    color: "#000", // Black text color
    height: "50px", // Default height
    "& fieldset": {
      borderColor: "transparent", // Remove the border
    },
    "&:hover fieldset": {
      borderColor: "transparent", // Remove the border on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent", // Remove the border when focused
    },
    [theme.breakpoints.down("sm")]: {
      height: "40px", // Reduced height on mobile
    },
  },
}));

function SearchBar() {
  return (
    <SearchBarContainer>
      <StyledTextField
        placeholder="Search on map"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ color: "#666" }} />
            </InputAdornment>
          ),
        }}
      />
    </SearchBarContainer>
  );
}

export default SearchBar;
