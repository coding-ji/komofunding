import Pagination from "../../../../components/Pagination";
import AdminTabs from "../../components/Tabs/AdminTabs";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const AdminPage = ({ title, tabs }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { filterId } = useParams();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const selectedTab = tabs.find((tab) => tab.link.includes(filterId));
  const TabComponent = selectedTab?.component;

  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>{title}</h1>
      <AdminTabs tabs={tabs} />
      {TabComponent && <TabComponent />}
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AdminPage;
