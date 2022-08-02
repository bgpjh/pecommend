import CommunitySidebar from "./communitySidebar";
import Nav from "../../components/nav";
import './communityDetail.css'
import React , { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import parse from 'html-react-parser';

function CommunityDetail () {
    let navigate = useNavigate();
    let useParam = useParams();
    let number = parseInt(useParam.num)
    const [pageDetail,setPageDetail] = useState({});
    const [parseContent,setParseContent] = useState({});
    const getArticleDetail = async () => {
        try {
            console.log(number);
          const response = await axios({
            method: "get",
            url: "/api/v1/community/"+number,
            // data: registwrite,
            headers: { "Content-Type": "multipart/form-data" },
            // headers: { "Content-Type" : ""}
            // JSON.stringify()
          });
          console.log(response);
          if (response.status === 200) {
            console.log(response.data)
            setPageDetail(response.data)
            // console.log(parse(response.data.content))
            const parsedata = parse(response.data.content)
            setParseContent(parsedata)
            console.log("pC", parseContent)
          }
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(() => {
        getArticleDetail()
        console.log(pageDetail)
    }, [])

    const recommend = async () => {
        try {
            let data = {
                userId: 1,
                postId: pageDetail.id,
            }
            console.log(data)
            const response = await axios({
                method: "post",
                url: "/api/v1/community/like",
                data: data
            });
            console.log(response)
            if (response.status === 200) {
                console.log("완료")
                if (response.data == "ADD") {
                    // setPageDetail(communityLike) += 1
                    setPageDetail({
                        ...pageDetail,
                        communityLike : pageDetail.communityLike + 1
                    })
                    console.log("like up", pageDetail.communityLike)
                }
                if (response.data == "CANCLE") {
                    setPageDetail({
                        ...pageDetail,
                        communityLike : pageDetail.communityLike - 1
                    })
                    console.log("like down",pageDetail.communityLike)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const clickRemove = async () => {
        var result = window.confirm("삭제하시겠습니까?");
        if(result){
            try {
                const response = await axios({
                    method: "delete",
                    url: "/api/v1/community/"+number,
                    // data: registwrite,
                    headers: { "Content-Type": "multipart/form-data" },
                    // headers: { "Content-Type" : ""}
                    // JSON.stringify()
                });
                console.log(response);
                if (response.status === 200) {
                    alert("삭제했습니다!");
                    navigate("/commu/list", { replace: true });
                }
            } catch (error) {
            console.log(error);
            }
        }else{
            
        }
    }

    const clickEdit = () => {
        navigate("/commu/edit/" + number, { replace: true });
    }
    return (
        <div className="communityDetail">

            <div class="breadcrumb-area pt-35 pb-35 bg-gray-3">
                <div class="container">
                    <div class="breadcrumb-content text-center">
                        <ul>
                            <li>
                                <a href="index.html">Home</a>
                            </li>
                            <li class="active">Shop </li>
                        </ul>
                    </div>
                </div>
            </div>
            <CommunitySidebar />
            <div class="pt-95 pb-100">
                <div class="container">
                    <div class="row flex-row-reverse">
                        <div class="col-lg-12 community-detail-box">
                            <div class="community-detail">
                                <div class="community-detail-title">
                                    <h4 class="ms-5 mt-3">{pageDetail.title}</h4>
                                </div>
                                <div class="community-detail-user d-flex flex-row justify-content-between align-items-center mx-2">
                                    <div>
                                        <img alt="?" src="" class="me-3"/><span>{pageDetail.writer}</span>
                                    </div>
                                    <div>
                                        <h5 style={{margin:"0"}}>추천 {pageDetail.communityLike}</h5>
                                        <h5 style={{margin:"0"}}>2022.07.15</h5>
                                    </div>
                                </div>
                                <hr></hr>
                                <div className="community-detail-maintextbox" dangerouslySetInnerHTML={ {__html: pageDetail.content} }>
                                    {/* <h5>{ parseContent }</h5> */}
                                    {/* <h5>{pageDetail.content}</h5> */}
                                    {/* {parseContent} */}
                                    {/* {renderHTML(pageDetail.content)} */}
                                    {/* dangerouslySetInnerHTML={{__html: this.state.actions}} */}
                                </div>
                                <div className="community-detail-artiblebox d-flex justify-content-center">
                                    <a className="articleButton" onClick={recommend}><span className="glyphicon glyphicon-thumbs-up"></span></a>
                                    <a className="articleButton" href="#"><img alt="" src="" /></a>
                                    <a className="articleButton" href="#"><img alt="" src="" /></a>
                                    <a className="articleButton" href="#"><img alt="" src="" /></a>
                                </div>
                                <hr></hr>
                                <div className="community-detail-subtextbox">
                                    <h5>2022.07.15 14:35 작성됨</h5>
                                    <h5>2022.07.17 12:12 수정됨</h5>
                                    <button class="community-button-remove" onClick={clickRemove}>삭제</button>
                                    <button class="community-button-edit" onClick={clickEdit}>수정</button>
                                </div>
                            </div>
                            <div id="communityComment">
                                <div className="community-write-box">
                                    <h5>닉네임</h5>
                                    <form action="#" class="d-flex justify-content-right align-items-end">
                                        <textarea rows="3" name="comment" placeholder="댓글을 입력하세요."></textarea>
                                        <input className="comment-submit" type="submit" value="Submit" />
                                    </form>
                                </div>

                <div
                  className="shop-select comment-select"
                  style={{ border: "1px solid rgb(30,30,30)" }}
                >
                  <select>
                    <option value="">최근</option>
                    <option value="">추천</option>
                    <option value="">?</option>
                    <option value="">?</option>
                  </select>
                </div>

                                <hr></hr>
                                {/* 이 부분은 for문을 통해 comment 값들을 불러와 출력합니다. */}
                                <div className="community-comment-list">
                                    <div className="community-comment-card d-flex">
                                        <img alt="?" src="" /><span>닉네임</span>
                                        <textarea readOnly rows="3">댓글 내용이 들어갑니다.</textarea>
                                    </div>
                                    <hr></hr>
                                    <div className="community-comment-card d-flex">
                                        <img alt="?" src="" /><span>닉네임</span>
                                        <textarea readOnly rows="3">댓글 내용이 들어갑니다.</textarea>
                                    </div>
                                    <hr></hr>
                                    <div className="community-comment-card d-flex">
                                        <img alt="?" src="" /><span>닉네임</span>
                                        <textarea readOnly rows="3">댓글 내용이 들어갑니다.</textarea>
                                    </div>
                                    <hr></hr>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
  );
}

export default CommunityDetail;