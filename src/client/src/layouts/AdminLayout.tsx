import styled from "styled-components";
import { Header } from "../components";
import Sidebar from "../components/layout/Sidebar";

const Container = styled.div`
  display: flex;
  top: -32px;
`;


const MainLayout = styled.main`
  flex: 4;
`;

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <>
      <Header type="dashboard" />
      <Container>
        <Sidebar />
        <MainLayout>{children}</MainLayout>
      </Container>
    </>
  );
};

export default AdminLayout;