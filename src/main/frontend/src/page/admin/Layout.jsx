import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import AdminSidebar from "./components/Sidebar/SidebarLayout";
import AdminHeader from "./components/Header/AdminHeader";

import styles from "./Layout.module.css";

const AdminLayout = () => {
  return (
    <div className={styles.layoutContainerAdminLayout}>
      <AdminHeader className={styles.headerAdminLayout} />
      <div className={styles.adminSidebarandcontent}>
        <AdminSidebar className={styles.sidebarAdminLayout} />
        {/* <DataProvider> */}
        <main className={styles.mainAdminLayout}>
          <Outlet />
        </main>
      </div>
      {/* </DataProvider> */}
      <Footer className={styles.footerAdminLayout} />
    </div>
  );
};

export default AdminLayout;
