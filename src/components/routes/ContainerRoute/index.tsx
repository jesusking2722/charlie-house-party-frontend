import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "../../layouts";

interface ContainerRouteProps {
  children?: React.ReactNode;
}

const ContainerRoute: React.FC<ContainerRouteProps> = ({ children }) => {
  return <Container>{children || <Outlet />}</Container>;
};

export default ContainerRoute;
