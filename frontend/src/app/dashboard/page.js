import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
const Page = () => {
  return (
    <div className="page">
      <Header />

      <div className="container">
        <Sidebar />
        <div style={{ flex: "8", marginTop: "2rem" }}>
          <h1>Dashboard</h1>
          <p>This is the dashboard page. Coming Soon!</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
