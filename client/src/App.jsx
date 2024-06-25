import { Route, Routes } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import { Flowbite } from "flowbite-react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import HomeTemplate from "./pages/HomeTemplate";
import SignUp from "./pages/SignUp";
import { useReadQuery } from "./features/api/apiSlice";
import Forget from "./pages/Forget";
import Reset from "./pages/Reset";
import ChangePassword from "./pages/dashboard/ChangePassword";
// import Admin from "./pages/dashboard/Admin";
// import AddNews from "./pages/dashboard/news/AddNews";
// import AddYouTube from "./pages/dashboard/youtube/AddYoutube";
// import NewsDetailAdmin from "./pages/dashboard/news/UpdateNews";
// import AddYoutube from "./pages/dashboard/youtube/AddYoutube";
// import UpdateYoutube from "./pages/dashboard/youtube/UpdateYoutube";
// import Saves from "./pages/dashboard/Saves";
// import Views from "./pages/dashboard/Views";
// import Upgrade from "./pages/dashboard/Upgrade";
// import SalesCompany from "./pages/dashboard/sales/SalesCompany";
// import Referrals from "./pages/dashboard/sales/Referrals";
// import Earns from "./pages/dashboard/Earns";
// import Ratings from "./pages/dashboard/sales/Ratings";
// import Boosting from "./pages/dashboard/company/Boosting";
// import AddBoost from "./pages/dashboard/admin/AddBoost";
// import UpdateBoost from "./pages/dashboard/admin/UpdateBoost";
// // import AddSubscriptions from "./pages/dashboard/admin/AddSubscriptions";
// import Billing from "./pages/dashboard/company/Billing";
// import Success from "./pages/Success";
// import Subscription from "./pages/dashboard/company/Subscription";
// import Sales from "./pages/dashboard/Sales";
import Message from "./pages/Message";
// import UpdateBlog from "./pages/dashboard/admin/UpdateBlog";
// import AddBlog from "./pages/dashboard/admin/AddBlog";
// import UpdatePrices from "./pages/dashboard/admin/UpdatePrices";
// import AddPrices from "./pages/dashboard/admin/AddPrices";
import Invoices from "./pages/dashboard/Invoices";
import UsersProfile from "./pages/dashboard/UsersProfile";
// import SalesDetail from "./pages/SalesDetail";
// import BlogsCategory from "./pages/blogs/BlogsCategory";
// import BlogsDetail from "./pages/blogs/BlogsDetail";
// import AddCategory from "./pages/dashboard/admin/AddCategory";
// import UpdateCategory from "./pages/dashboard/admin/UpdateCategory";
// import Bills from "./pages/dashboard/admin/Bills";
// import Notifications from "./pages/dashboard/Notifications";
// import Sponsors from "./pages/dashboard/admin/Sponsors";
// import Banners from "./pages/dashboard/admin/Banners";
// import AddJob from "./pages/dashboard/admin/AddJob";
// import UpdateJob from "./pages/dashboard/admin/UpdateJob";
// import JobCategory from "./pages/jobs/JobCategory";
// import JobDetail from "./pages/jobs/JobDetail";
// import Mission from "./pages/Mission";
// import OurPartners from "./pages/OurPartners";
// import AdvertWithUs from "./pages/AdvertWithUs";
// import BecomeAMember from "./pages/BecomeAMember";
// import BecomeRepresentative from "./pages/BecomeRepresentative";
// import WorkWIthUs from "./pages/WorkWIthUs";
// import Loading from "./components/loading/Loading";
import Login from "./pages/Login";
import InvoicesDetail from "./pages/dashboard/InvoicesDetail";
import InvoicesCreate from "./pages/dashboard/InvoicesCreate";
import Overview from "./pages/dashboard/Overview";
// import ChangePassword from "./pages/dashboard/ChangePassword";

function App() {
  const user = JSON.parse(localStorage.getItem("keradion_user"));

  const { data: admin } = useReadQuery({
    url: "/user/users?role=admin",
    tag: ["users"],
  });

  console.log(user, admin, "user from app js");
  return (
    <Flowbite>
      <div className="font-poppins text-black overflow-hidden text-dark bg-dark">
        <Routes>
          <Route path="/" element={<HomeTemplate />}>
            <Route path="/" element={<Home />}></Route>
            {!user && admin?.total === 0 && (
              <Route path="/signup" element={<SignUp type="user" />}></Route>
            )}
            {admin?.total === 0 && (
              <Route
                path="/signup/admin"
                element={<SignUp type="admin" />}
              ></Route>
            )}
            <Route path="/login" element={<Login />}></Route>
            <Route path="/forget" element={<Forget />}></Route>
            <Route path="/reset" element={<Reset />}></Route>
          </Route>

          {user && (
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path={`/dashboard`} element={<Overview />}></Route>
              <Route
                path={`/dashboard/${user?.role}`}
                element={<Overview />}
              ></Route>
              {user.role === "user" && (
                <>
                  <Route
                    path="/dashboard/user/profile"
                    element={<UsersProfile />}
                  ></Route>
                  <Route
                    path="/dashboard/user/invoices"
                    element={<Invoices />}
                  ></Route>
                  <Route
                    path="/dashboard/user/invoices/create"
                    element={<InvoicesCreate />}
                  ></Route>
                  <Route
                    path="/dashboard/user/invoices/detail"
                    element={<InvoicesDetail />}
                  ></Route>
                </>
              )}
              {user.role === "admin" && (
                <>
                  <Route
                    path="/dashboard/admin/profile"
                    element={<UsersProfile />}
                  ></Route>
                  <Route
                    path="/dashboard/admin/invoices"
                    element={<Invoices />}
                  ></Route>
                  <Route
                    path="/dashboard/admin/users"
                    element={<Invoices />}
                  ></Route>
                </>
              )}

              <Route path="/dashboard/message" element={<Message />}></Route>
              <Route
                path="/dashboard/change-password"
                element={<ChangePassword />}
              ></Route>
            </Route>
          )}
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </div>
    </Flowbite>
  );
}

export default App;
