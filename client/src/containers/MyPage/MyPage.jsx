import React, { useState, useEffect, useRef } from "react";
import Header from "components/Header";
import axios from "axios";
import {
  ProfileWrapper,
  ProfileImg,
  PostCardsWrapper,
  PostCardborder,
  Nickname,
  MyPost,
} from "./MyPage.style";
import PostCard from "components/PostCard";
import { userProfileState } from "Atoms";
import { useRecoilValue } from "recoil";

export function MyPage() {
  const userProfile = useRecoilValue(userProfileState);
  const [currentClick, setCurrentClick] = useState("MyPosts");
  const [prevClick, setPrevClick] = useState(null);
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [likePosts, setLikePosts] = useState([]);
  const [likePageNumber, setLikePageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageEnd = useRef();

  const GetClick = e => {
    setCurrentClick(e.target.id);
    if (currentClick === "LikePosts") {
      setPosts([]);
      setPageNumber(1);
    }
    if (currentClick === "Myposts") {
      setLikePosts([]);
      setLikePageNumber(1);
    }
  };

  const getMyPost = async page => {
    const url = "/api/users/post/";
    const response = await axios.get(url, {
      params: {
        page: page,
      },
    });

    setPosts(prev => {
      const newPosts = [...prev, ...response.data.posts];
      return newPosts;
    });
    setLoading(true);
  };

  const getMyLikePost = async page => {
    const url = "/api/users/post/like";
    const response = await axios.get(url, {
      params: {
        page: page,
      },
    });

    setLikePosts(prev => {
      const newPosts = [...prev, ...response.data.posts];
      return newPosts;
    });
    setLoading(true);
  };

  useEffect(() => {
    getMyPost(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    getMyLikePost(likePageNumber);
  }, [likePageNumber]);

  const loadMore = () => {
    currentClick === "MyPosts" &&
      setPageNumber(prevPageNumber => prevPageNumber + 1);
    currentClick === "LikePosts" &&
      setLikePageNumber(prevPageNumber => prevPageNumber + 1);
  };

  useEffect(() => {
    // fetchFeed ???????????? loading ?????? true??? ????????????
    if (loading) {
      // new ???????????? IntersectionObserver ????????? ???????????? observer??? ????????????
      const observer = new IntersectionObserver(
        // entries??? ????????? ?????? ??????????????????
        entries => {
          // ??????????????? ????????? ????????? ?????? IntersectionObserverEntry
          // ?????? ????????? ?????? ????????? true??????
          if (entries[0].isIntersecting) {
            // loadMore?????? ??????
            loadMore();
          }
        },
        // threshold??? ???????????? ???????????? ?????? ????????? ???????????? ????????? ???????????? ???????????? ??????
        // 100%??? ??? ????????? ??????
        { threshold: 1 },
      );
      // ????????? ?????? ??????
      observer.observe(pageEnd.current);
    }
  }, [loading]);

  useEffect(() => {
    if (currentClick !== null) {
      let current = document.getElementById(currentClick);
      current.style.color = "var(--primary)";
      current.style.boxShadow = "0px 4px 0px var(--primary)";
    }

    if (prevClick !== null) {
      let prev = document.getElementById(prevClick);
      prev.style.color = "#000000";
      prev.style.boxShadow = "none";
    }
    setPrevClick(currentClick);
  }, [currentClick]);

  return (
    <>
      <Header />
      <ProfileWrapper>
        <ProfileImg>
          <img src={userProfile.profileImg} />
        </ProfileImg>
        <Nickname>{userProfile.name}</Nickname>
        <MyPost>
          <ul>
            <li>
              <button id="MyPosts" onClick={GetClick}>
                ?????? ????????? ???
              </button>
            </li>
            <li>
              <button id="LikePosts" onClick={GetClick}>
                ????????? ??? ???
              </button>
            </li>
          </ul>
        </MyPost>
        <PostCardborder />

        <PostCardsWrapper>
          {currentClick === "MyPosts" &&
            posts.map(({ id, title, imgUrl, likes, author }, index) => {
              return (
                <PostCard
                  key={index}
                  id={id}
                  imgUrl={imgUrl}
                  title={title}
                  author={author}
                  likes={likes}
                />
              );
            })}

          {currentClick === "LikePosts" &&
            likePosts.map(({ id, title, imgUrl, likes, author }, index) => {
              return (
                <PostCard
                  key={index}
                  id={id}
                  imgUrl={imgUrl}
                  title={title}
                  author={author}
                  likes={likes}
                />
              );
            })}

          <div ref={pageEnd} style={{ position: "hidden" }}></div>
        </PostCardsWrapper>
      </ProfileWrapper>
    </>
  );
}
