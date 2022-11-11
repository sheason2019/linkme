import { Link, styled } from "@mui/material";

const CustomLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  padding: 2px 4px;
  &:hover {
    background-color: #e3e3e3;
  }
`;

export default CustomLink;
