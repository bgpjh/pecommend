import { Routes, Route, useRoutes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
// import Nav from './components/nav';
// import Footer from './components/footer';
import Layout from "./components/layout";
//
import CommunityList from "./domain/community/communityList";
import CommunityDetail from "./domain/community/communityDetail";
import CommunityMain from "./domain/community/communityMain";
import CommunityRegist from "./domain/community/communityRegist";
import CommunityEdit from "domain/community/communityEdit";
import Community from "domain/community/community";
import Perfume from "./domain/perfume/perfume";
import PerfumeList from "./domain/perfume/perfumeList";
import PerfumeDetail from "./domain/perfume/perfumeDetail";
import PerfumeMain from "./domain/perfume/perfumeMain";
import PerfumeRegistList from "./domain/perfume/perfumeRegistList";
import PerfumeRegist from "./domain/perfume/perfumeRegist";
import Login from "./domain/user/Login";
import Profile from "./domain/user/profile";
import MyProfile from "./domain/user/myprofile";
import Profile_update from "./domain/user/profile_update";
import Oauth from "./domain/user/oauth";
import OauthSignUp from "domain/user/oauthSignUp";
//
import Home from "./domain/home/home";
import NotFound from "./domain/error/NotFound";
import LogOut from "components/logout";

// import "./domain/perfume/perfumeList.css";
// import "./domain/perfume/perfumeList.scss";

function App() {
  const isLogined = useSelector((state) => state.userStore.isLogined);

  const element = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "perfume/*",
          element: <Perfume />,
          children: [
            { path: "list", element: <PerfumeList /> },
            { path: "detail/:num", element: <PerfumeDetail /> },
            { path: "reglist", element: <PerfumeRegistList /> },
            { path: "reg", element: <PerfumeRegist /> },
          ],
        },
        {
          path: "commu/*",
          element: <Community />,
          children: [
            { path: "detail/:num", element: <CommunityDetail /> },
            { path: "list/:num", element: <CommunityList /> },
            {
              path: "regist",
              element: isLogined ? (
                <CommunityRegist />
              ) : (
                <Navigate to="/login" />
              ),
            },
            {
              path: "commu/edit/:num",
              element: isLogined ? <CommunityEdit /> : <Navigate to="/login" />,
            },
          ],
        },
        // {
        //   path: "commu/list",
        //   element: <CommunityList />,
        // },
        // {
        //   path: "commu/detail/:num",
        //   element: <CommunityDetail />,
        // },
        // {
        //   path: "commu/regist",
        //   element: <CommunityRegist />,
        // },
        // {
        //   path: "commu/edit/:num",
        //   element: <CommunityEdit />,
        // },
        {
          path: "profile/:num",
          element: <Profile />,
        },
        {
          path: "profile/update",
          element: isLogined ? <Profile_update /> : <Navigate to="/login" />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
        {
          path: "commutest",
          element: <Community />,
        },
        {
          path: "oauth",
          element: <Oauth />,
        },
        {
          path: "oauth/signup",
          element: <OauthSignUp />,
        },
        {
          path: "myprofile",
          element: isLogined ? <MyProfile /> : <Navigate to="/login" />,
        },
        {
          path:"logout",
          element: <LogOut/>
        }
      ],
    },
  ]);
  return element;
  //   return (
  //       <div className="App">
  //           {/* <Nav /> */}

  //           <Routes>
  //               <Route path="/" element={<Layout />}>
  //                   <Route index element={<Home />} />
  //                   <Route path="/perfume/*" element={<Perfume />} >
  //                       {/* <Route index element={<PerfumeMain />} />
  //                       <Route path="list" element={<PerfumeList />} />
  //                       <Route path="detail" element={<PerfumeDetail />} />
  //                       <Route path="reglist" element={<PerfumeRegistList />} />
  //                       <Route path="regist" element={<PerfumeRegist />} /> */}
  //                   </Route>
  //                   {/* <Route index element={<PerfumeMain />} /> */}
  //                   <Route path="/perfumelist" element={<PerfumeList />} />
  //                   <Route path="/perfumedetail" element={<PerfumeDetail />} />
  //                   <Route path="/perfumereglist" element={<PerfumeRegistList />} />
  //                   <Route path="/perfumeregist" element={<PerfumeRegist />} />
  //                   {/* <Route path="/perfume/list" element={<PerfumeList />} /> */}

  //                   <Route path="/commu" element={<CommunityMain />} />
  //                   <Route path="/commulist" element={<CommunityList />} />
  //                   <Route path="/commudetail" element={<CommunityDetail />} />
  //                   <Route path="/profile" element={<Profile />} />
  //                   <Route path="/login" element={<Login />} />
  //                   <Route path="*" element={<NotFound />} />
  //               </Route>
  //           </Routes>

  //           {/* <Footer /> */}
  //       </div>
  //   );
}

export default App;
