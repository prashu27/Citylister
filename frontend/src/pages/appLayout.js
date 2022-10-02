import { Layout } from "antd"
import { Outlet } from "react-router-dom"
import PageHeader from "../components/Header";

const { Content, Footer } = Layout;

const AppLayout = (props) => {
    return (
        <Layout >
            <PageHeader />
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                <Outlet />
            </Content>
            <Footer
      style={{
        textAlign: 'center',
      }}
    >
      Citylister assignment <a href="#">Github Link</a>
    </Footer>
        </Layout>
    )
}

export default AppLayout;