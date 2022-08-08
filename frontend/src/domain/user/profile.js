import "./profile.css";
import React, { useEffect, useState } from "react";
import { authaxios, freeaxios } from "../../custom/customAxios";
import { Link, useParams, useNavigate, NavLink, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
import Pagination from "../community/pagination";


// 별점, 리뷰 개수까지 뽑아야함..

// /api/v1/community/list/user/{userId} 로 get해서 쓴 글 뽑고
// 커뮤니티에서 표시해주듯? 어떤 형식으로 표시?

// 댓글은 어떻게..//

function Profile() {
  // let hashtag_list = ["따뜻한", "봄", "가을"];
  let useParam = useParams();
  let number = parseInt(useParam.num); // 유저번호
  const [userprofile, setUserProfile] = useState([]);
  const [age, setAge] = useState(0);
  const user = useSelector(state => state.userStore.nowLoginUser);
  let [tab, setTab] = useState(1);
  const [likelist, setLikeList] = useState([]);
  const [dislikelist, setDisLikeList] = useState([]);
  const [cummuProfile, setCummuProfile] = useState([]);
  const [commentProfile, setCommentProfile] = useState([]);
  const [limitData, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limitData;

  const titleName = [
    '전체',
    '자유',
    '향수',
    '인기',
    '공지'
  ]


  const getUserInfo = async () => {
    try {
      const response = await authaxios({
        method: "get",
        url: "/api/v1/user/info/id/" + number,
      });
      console.log(response.data.user_id)
      if (response.status === 200) {
        setUserProfile(response.data);
      }
      setAge(getAge(response.data.birthday));
    } catch (error) {
      console.log(error);
      document.location.href = "/NotFound"
    }
  };

  const getLikeInfo = async () => {
    try {
      const response = await authaxios({
        method: "get",
        url: "/api/v1/perfume/likelist/" + number,
      });
      console.log(response.data)
      if (response.status === 200) {
        setLikeList(response.data);
      }
    } catch (error) {
      console.log(error);
      document.location.href = "/NotFound"
    }
  };

  const getDisLikeInfo = async () => {
    try {
      const response = await authaxios({
        method: "get",
        url: "/api/v1/perfume/dislikelist/" + number,
      });
      console.log(response)
      if (response.status === 200) {
        setDisLikeList(response.data);
      }
    } catch (error) {
      console.log(error);
      document.location.href = "/NotFound"
    }
  };

  const getCummuInfo = async () => {
    try {
      const response = await authaxios({
        method: "get",
        url: "/api/v1/community/list/user/" + number,
      });
      console.log(response.data)
      if (response.status === 200) {
        setCummuProfile(response.data);
      }
    } catch (error) {
      console.log(error);
      document.location.href = "/NotFound"
    }
  };

  const getCommentInfo = async () => {
    try {
      const response = await authaxios({
        method: "get",
        url: "/api/v1/comment/profile/" + number,
      });
      console.log(response.data)
      if (response.status === 200) {
        setCommentProfile(response.data);
      }
    } catch (error) {
      console.log(error);
      document.location.href = "/NotFound"
    }
  };

  useEffect(() => {
    getUserInfo();
    getLikeInfo();
    getDisLikeInfo();
    getCummuInfo();
    getCommentInfo();
  }, []);

  const getGender = (data) => {
    let gender = data === "male" ? "남성" : "여성";
    return gender;
  };

  const getAge = (data) => {
    const nums = data.split("-");
    const today = new Date();
    const birthDate = new Date(nums[0], nums[1], nums[2]);

    let age = today.getFullYear() - birthDate.getFullYear() + 1;

    return parseInt(age / 10) * 10;
  };

  // const getDataList = (event) => {
  //   event.preventDefault();
  //   console.log(userprofile);
  //   freeaxios
  //     .get("/api/v1/perfume/likelist/" + userprofile.user_id)
  //     .then(function(response) {
  //       console.log(response)
  //     })
  //   };


  return (
    <div className="profile">
      <div className="container-temp">
        <div className="pernav">
          <div className="pernav-header">
            <div className="pernav-header-title tac">
              {/* <span></span> */}
            </div>
          </div>
        </div>
      </div>
      <div className="container mainProfile">
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 profile-top">
          <div className="profileBox">
            {(user.user_id === userprofile.user_id) && 
              <button className="profile-edit-button" type="button" title="ddd">
                <Link to="/profile/update"><i className="fa-solid fa-gear"> 사용자 설정</i></Link>
              </button>}
            <div>
              {/* <img
                className="profile-img"
                src="./assets/tempImg/다운로드 (1).jpg"
                alt="?"
              /> */}
              <h4>{userprofile.nickname}</h4>
              {(userprofile.introduction !== '') && 
                <p className="introduction">"{userprofile.introduction}"</p>}
            </div>
          </div>
          <div className="profileText">
            <div className="profileDataLine">
              <h5>성별 : {getGender(userprofile.gender)}</h5>
              <h5>나이 : {age}대</h5>
              <h5>MBTI : {userprofile.mbti}</h5>
            </div>
          </div>
        </div>

        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 pt-50 pb-100 rightbox">
          <div className="profile-description">
            <div className="container-fluid">
              <div>
                <Nav className="mt-5 profile-navtab" variant="tabs" defaultActiveKey="link-1">
                  <Nav.Item>
                    <Nav.Link className="" eventKey="link-1" onClick={() => setTab(1)}>
                      &nbsp;Like&nbsp;
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="nav-second">
                    <Nav.Link eventKey="link-2" onClick={() => setTab(2)}>
                      &nbsp;Dislike&nbsp;
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="nav-second">
                    <Nav.Link eventKey="link-3" onClick={() => setTab(3)}>
                      &nbsp;게시글&nbsp;
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="nav-second">
                    <Nav.Link eventKey="link-4" onClick={() => setTab(4)}>
                      &nbsp;댓글&nbsp;
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                {
                  tab === 1
                  ? (
                      <div>
                        <div className="detail-likeDislikeList-items detail-ldl-first row">
                            {likelist.slice(offset, offset + limitData).map((data) => (
                              <div className="col-lg-6 col-sm-12">
                                <div className="col-sm-6 col-xs-6">
                                  사진
                                </div>
                                <div className="col-sm-6 col-xs-6">
                                <Link
                                  // className="community-list-titlebox"
                                  to={`/perfume/detail/${data.perfumeId}`}
                                >
                                  {data.koName}
                                </Link>
                                {/* <div id={`${data.perfumeId}`} ></div> */}
                                </div>
                              </div>
                            ))}
                        </div>
                        <div>
                          <Pagination
                            total={likelist.length}
                            limit={limitData}
                            page={page}
                            setPage={setPage}
                          />
                        </div>
                      </div>
                      )
                  : ( tab === 2
                    ? (
                      <div>
                        <div className="detail-likeDislikeList-items detail-ldl-first row">
                            {dislikelist.slice(offset, offset + limitData).map((data) => (
                              <div className="col-lg-6 col-sm-12">
                                <div className="col-sm-6 col-xs-6">
                                  사진
                                </div>
                                <div className="col-sm-6 col-xs-6">
                                <Link
                                  // className="community-list-titlebox"
                                  to={`/perfume/detail/${data.perfumeId}`}
                                >
                                  {data.koName}
                                </Link>
                                {/* <div id={`${data.perfumeId}`} ></div> */}
                                
                                </div>
                              </div>
                              )
                            )}
                        </div>
                        <div>
                          <Pagination
                            total={dislikelist.length}
                            limit={limitData}
                            page={page}
                            setPage={setPage}
                          />
                        </div>
                      </div>)
                      : ( tab === 3
                        ? (
                          <div className="mt-20">
                          <table className="table table-hover">
                          <thead>
                            <tr className="table-top rightbox-in">
                              <th scope="col">제목</th>
                              <th scope="col">작성일</th>
                              <th scope="col">추천수</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cummuProfile.slice(offset, offset + limitData).map((data) => (
                              <tr className="table-bottom">
                                <td className="" style={{ textAlign: "left", paddingLeft: "10px" }}>
                                  <Link
                                    className="community-list-titlebox"
                                    to={`/commu/detail/${data.id}`}
                                  >
                                    [{titleName[data.category]}] {data.title}
                                  </Link>
                                </td>
                                <td>{data.createDateYMD}</td>
                                {/* <td>{data.createDateHMS}</td> */}
                                <td>{data.communityLike}</td>
                              </tr>
                            ))}
                          </tbody>
                          </table>
                          <div>
                          <Pagination
                            total={cummuProfile.length}
                            limit={limitData}
                            page={page}
                            setPage={setPage}
                          />
                          </div></div>
                          )
                          : ( tab === 4
                            ? (
                              <div className="mt-20">
                              <table className="table table-hover">
                              <thead>
                                <tr className="table-top rightbox-in">
                                  <th scope="col">댓글</th>
                                  <th scope="col">작성일</th>
                                </tr>
                              </thead>
                              <tbody>
                                {commentProfile.slice(offset, offset + limitData).map((data) => (
                                  <tr className="table-bottom">
                                    <td className="" style={{ textAlign: "left", paddingLeft: "10px" }}>
                                      <Link
                                        className="community-list-titlebox"
                                        to={`/commu/detail/${data.id}`}
                                      >
                                        {data.content}
                                      </Link>
                                    </td>
                                    <td>{data.createDateYMD}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <div>
                              <Pagination
                                total={cummuProfile.length}
                                limit={limitData}
                                page={page}
                                setPage={setPage}
                              />
                            </div></div>
                              )
                              : null)))
                }
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

{/* function TagSpawn(props) {
  return (
    <button className={"hashtag" + (props.count % 3)}>#{props.tagname}</button>
  );
} */}

export default Profile;
