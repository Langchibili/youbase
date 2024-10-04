"use client"

import ContentDisplay from "@/components/Includes/ContentDisplay/ContentDisplay";
import { useUser } from "@/Contexts/UserContext";
import { dynamicConfig } from "@/Functions";
import React from "react";

// Force the page to be dynamically rendered on every request

export const dynamic = dynamicConfig();
export default function Home(props) {
    console.log(useUser())
  return (
    <>
      <div className="sa4d25">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-9 col-lg-8">
              <div className="section3125">      
                <a href="live_streams.html" className="see150">
                  See all
                </a>
                <div className="la5lo1">
                  <div className="owl-carousel live_stream owl-theme owl-loaded owl-drag">
                    <div className="owl-stage-outer">
                      <div
                        className="owl-stage"
                        style={{
                          transform: "translate3d(0px, 0px, 0px)",
                          transition: "all",
                          width: 1297
                        }}
                      >
                        <div
                          className="owl-item active"
                          style={{ width: "134.017px", marginRight: 10 }}
                        >
                          <div className="item">
                            <div className="stream_1">
                              <a href="live_output.html" className="stream_bg">
                                <img src="/theme/images/left-imgs/img-1.jpg" alt="" />
                                <h4>John Doe</h4>
                                <p>
                                  live
                                  <span />
                                </p>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item active"
                          style={{ width: "134.017px", marginRight: 10 }}
                        >
                          <div className="item">
                            <div className="stream_1">
                              <a href="live_output.html" className="stream_bg">
                                <img src="/theme/images/left-imgs/img-2.jpg" alt="" />
                                <h4>Jassica</h4>
                                <p>
                                  live
                                  <span />
                                </p>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item active"
                          style={{ width: "134.017px", marginRight: 10 }}
                        >
                          <div className="item">
                            <div className="stream_1">
                              <a href="live_output.html" className="stream_bg">
                                <img src="/theme/images/left-imgs/img-9.jpg" alt="" />
                                <h4>Edututs+</h4>
                                <p>
                                  live
                                  <span />
                                </p>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item active"
                          style={{ width: "134.017px", marginRight: 10 }}
                        >
                          <div className="item">
                            <div className="stream_1">
                              <a href="live_output.html" className="stream_bg">
                                <img src="/theme/images/left-imgs/img-3.jpg" alt="" />
                                <h4>Joginder Singh</h4>
                                <p>
                                  live
                                  <span />
                                </p>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item active"
                          style={{ width: "134.017px", marginRight: 10 }}
                        >
                          <div className="item">
                            <div className="stream_1">
                              <a href="live_output.html" className="stream_bg">
                                <img src="/theme/images/left-imgs/img-4.jpg" alt="" />
                                <h4>Zoena</h4>
                                <p>
                                  live
                                  <span />
                                </p>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item active"
                          style={{ width: "134.017px", marginRight: 10 }}
                        >
                          <div className="item">
                            <div className="stream_1">
                              <a href="live_output.html" className="stream_bg">
                                <img src="/theme/images/left-imgs/img-5.jpg" alt="" />
                                <h4>Albert Dua</h4>
                                <p>
                                  live
                                  <span />
                                </p>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item"
                          style={{ width: "134.017px", marginRight: 10 }}
                        >
                          <div className="item">
                            <div className="stream_1">
                              <a href="live_output.html" className="stream_bg">
                                <img src="/theme/images/left-imgs/img-6.jpg" alt="" />
                                <h4>Ridhima</h4>
                                <p>
                                  live
                                  <span />
                                </p>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item"
                          style={{ width: "134.017px", marginRight: 10 }}
                        >
                          <div className="item">
                            <div className="stream_1">
                              <a href="live_output.html" className="stream_bg">
                                <img src="/theme/images/left-imgs/img-7.jpg" alt="" />
                                <h4>Amritpal</h4>
                                <p>
                                  live
                                  <span />
                                </p>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item"
                          style={{ width: "134.017px", marginRight: 10 }}
                        >
                          <div className="item">
                            <div className="stream_1">
                              <a href="live_output.html" className="stream_bg">
                                <img src="/theme/images/left-imgs/img-8.jpg" alt="" />
                                <h4>Jimmy</h4>
                                <p>
                                  live
                                  <span />
                                </p>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="owl-nav">
                      <button
                        type="button"
                        role="presentation"
                        className="owl-prev disabled"
                      >
                        <i className="uil uil-angle-left" />
                      </button>
                      <button
                        type="button"
                        role="presentation"
                        className="owl-next"
                      >
                        <i className="uil uil-angle-right" />
                      </button>
                    </div>
                    <div className="owl-dots disabled" />
                  </div>
                </div>
              </div>
              <div className="section3125 mt-10">
              <h4 className="item_title">Reels</h4>  
              <ContentDisplay 
                            contentToView = "portrait-videos"
                            loggedInUser={useUser()} 
                            contentUri={`/posts?populate=user,featuredImages,media`}
                            startPage="1"
                            limit="10"
                            contentLimit = {9}
                            sort="desc"
                            />
              </div>
              <div className="section3125 mt-30">
                <div className="la5lo1">
                  <h4 className="item_title">Captures</h4>
                  <ContentDisplay 
                            contentToView = "portrait-images"
                            loggedInUser={useUser()} 
                            contentUri={`/posts?populate=user,featuredImages,media`}
                            startPage="1"
                            limit="10"
                            contentLimit = {9}
                            sort="desc"
                            />
                  </div>
              </div>
              <h4 className="item_title">Explore</h4>
              <div className="section3125 mt-30">
                  <ContentDisplay 
                            contentToView = "all"
                            loggedInUser={useUser()} 
                            contentUri={`/posts?populate=user,featuredImages,media`}
                            startPage="1"
                            limit="10"
                            sort="desc"
                            />     
                <a href="live_streams.html" className="see150">
                  See all
                </a>
              </div>
              
              <div className="section3125 mt-50">
                
                <h4 className="item_title">Featured Courses</h4>
                <a href="#" className="see150">
                  See all
                </a>
                <div className="la5lo1">
                  <div className="owl-carousel featured_courses owl-theme owl-loaded owl-drag">
                    <div className="owl-stage-outer">
                      <div
                        className="owl-stage"
                        style={{
                          transform: "translate3d(-1456px, 0px, 0px)",
                          transition: "all",
                          width: 2331
                        }}
                      >
                        <div
                          className="owl-item"
                          style={{ width: "271.367px", marginRight: 20 }}
                        >
                          <div className="item">
                            <div className="fcrse_1 mb-20">
                              <a
                                href="course_detail_view.html"
                                className="fcrse_img"
                              >
                                <img src="/theme/images/courses/img-1.jpg" alt="" />
                                <div className="course-overlay">
                                  <div className="badge_seller">Bestseller</div>
                                  <div className="crse_reviews">
                                    <i className="uil uil-star" />
                                    4.5
                                  </div>
                                  <span className="play_btn1">
                                    <i className="uil uil-play" />
                                  </span>
                                  <div className="crse_timer">25 hours</div>
                                </div>
                              </a>
                              <div className="fcrse_content">
                                <div className="eps_dots more_dropdown">
                                  <a href="#">
                                    <i className="uil uil-ellipsis-v" />
                                  </a>
                                  <div className="dropdown-content">
                                    <span>
                                      <i className="uil uil-share-alt" />
                                      Share
                                    </span>
                                    <span>
                                      <i className="uil uil-heart" />
                                      Save
                                    </span>
                                    <span>
                                      <i className="uil uil-ban" />
                                      Not Interested
                                    </span>
                                    <span>
                                      <i className="uil uil-windsock" />
                                      Report
                                    </span>
                                  </div>
                                </div>
                                <div className="vdtodt">
                                  <span className="vdt14">109k views</span>
                                  <span className="vdt14">15 days ago</span>
                                </div>
                                <a
                                  href="course_detail_view.html"
                                  className="crse14s"
                                >
                                  Complete Python Bootcamp: Go from zero to hero
                                  in Python 3
                                </a>
                                <a href="#" className="crse-cate">
                                  Web Development | Python
                                </a>
                                <div className="auth1lnkprce">
                                  <p className="cr1fot">
                                    By <a href="#">John Doe</a>
                                  </p>
                                  <div className="prce142">$10</div>
                                  <button className="shrt-cart-btn" title="cart">
                                    <i className="uil uil-shopping-cart-alt" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item"
                          style={{ width: "271.367px", marginRight: 20 }}
                        >
                          <div className="item">
                            <div className="fcrse_1 mb-20">
                              <a
                                href="course_detail_view.html"
                                className="fcrse_img"
                              >
                                <img src="/theme/images/courses/img-2.jpg" alt="" />
                                <div className="course-overlay">
                                  <div className="badge_seller">Bestseller</div>
                                  <div className="crse_reviews">
                                    <i className="uil uil-star" />
                                    4.5
                                  </div>
                                  <span className="play_btn1">
                                    <i className="uil uil-play" />
                                  </span>
                                  <div className="crse_timer">28 hours</div>
                                </div>
                              </a>
                              <div className="fcrse_content">
                                <div className="eps_dots more_dropdown">
                                  <a href="#">
                                    <i className="uil uil-ellipsis-v" />
                                  </a>
                                  <div className="dropdown-content">
                                    <span>
                                      <i className="uil uil-share-alt" />
                                      Share
                                    </span>
                                    <span>
                                      <i className="uil uil-heart" />
                                      Save
                                    </span>
                                    <span>
                                      <i className="uil uil-ban" />
                                      Not Interested
                                    </span>
                                    <span>
                                      <i className="uil uil-windsock" />
                                      Report
                                    </span>
                                  </div>
                                </div>
                                <div className="vdtodt">
                                  <span className="vdt14">5M views</span>
                                  <span className="vdt14">15 days ago</span>
                                </div>
                                <a
                                  href="course_detail_view.html"
                                  className="crse14s"
                                >
                                  The Complete JavaScript Course 2020: Build Real
                                  Projects!
                                </a>
                                <a href="#" className="crse-cate">
                                  Development | JavaScript
                                </a>
                                <div className="auth1lnkprce">
                                  <p className="cr1fot">
                                    By <a href="#">Jassica William</a>
                                  </p>
                                  <div className="prce142">$5</div>
                                  <button className="shrt-cart-btn" title="cart">
                                    <i className="uil uil-shopping-cart-alt" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item"
                          style={{ width: "271.367px", marginRight: 20 }}
                        >
                          <div className="item">
                            <div className="fcrse_1 mb-20">
                              <a
                                href="course_detail_view.html"
                                className="fcrse_img"
                              >
                                <img src="/theme/images/courses/img-3.jpg" alt="" />
                                <div className="course-overlay">
                                  <div className="badge_seller">Bestseller</div>
                                  <div className="crse_reviews">
                                    <i className="uil uil-star" />
                                    4.5
                                  </div>
                                  <span className="play_btn1">
                                    <i className="uil uil-play" />
                                  </span>
                                  <div className="crse_timer">12 hours</div>
                                </div>
                              </a>
                              <div className="fcrse_content">
                                <div className="eps_dots more_dropdown">
                                  <a href="#">
                                    <i className="uil uil-ellipsis-v" />
                                  </a>
                                  <div className="dropdown-content">
                                    <span>
                                      <i className="uil uil-share-alt" />
                                      Share
                                    </span>
                                    <span>
                                      <i className="uil uil-heart" />
                                      Save
                                    </span>
                                    <span>
                                      <i className="uil uil-ban" />
                                      Not Interested
                                    </span>
                                    <span>
                                      <i className="uil uil-windsock" />
                                      Report
                                    </span>
                                  </div>
                                </div>
                                <div className="vdtodt">
                                  <span className="vdt14">1M views</span>
                                  <span className="vdt14">18 days ago</span>
                                </div>
                                <a
                                  href="course_detail_view.html"
                                  className="crse14s"
                                >
                                  Beginning C++ Programming - From Beginner to
                                  Beyond
                                </a>
                                <a href="#" className="crse-cate">
                                  Development | C++
                                </a>
                                <div className="auth1lnkprce">
                                  <p className="cr1fot">
                                    By <a href="#">Joginder Singh</a>
                                  </p>
                                  <div className="prce142">$13</div>
                                  <button className="shrt-cart-btn" title="cart">
                                    <i className="uil uil-shopping-cart-alt" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item"
                          style={{ width: "271.367px", marginRight: 20 }}
                        >
                          <div className="item">
                            <div className="fcrse_1 mb-20">
                              <a
                                href="course_detail_view.html"
                                className="fcrse_img"
                              >
                                <img src="/theme/images/courses/img-4.jpg" alt="" />
                                <div className="course-overlay">
                                  <div className="badge_seller">Bestseller</div>
                                  <div className="crse_reviews">
                                    <i className="uil uil-star" />
                                    5.0
                                  </div>
                                  <span className="play_btn1">
                                    <i className="uil uil-play" />
                                  </span>
                                  <div className="crse_timer">1 hour</div>
                                </div>
                              </a>
                              <div className="fcrse_content">
                                <div className="eps_dots more_dropdown">
                                  <a href="#">
                                    <i className="uil uil-ellipsis-v" />
                                  </a>
                                  <div className="dropdown-content">
                                    <span>
                                      <i className="uil uil-share-alt" />
                                      Share
                                    </span>
                                    <span>
                                      <i className="uil uil-heart" />
                                      Save
                                    </span>
                                    <span>
                                      <i className="uil uil-ban" />
                                      Not Interested
                                    </span>
                                    <span>
                                      <i className="uil uil-windsock" />
                                      Report
                                    </span>
                                  </div>
                                </div>
                                <div className="vdtodt">
                                  <span className="vdt14">153k views</span>
                                  <span className="vdt14">3 months ago</span>
                                </div>
                                <a
                                  href="course_detail_view.html"
                                  className="crse14s"
                                >
                                  The Complete Digital Marketing Course - 12
                                  Courses in 1
                                </a>
                                <a href="#" className="crse-cate">
                                  Digital Marketing | Marketing
                                </a>
                                <div className="auth1lnkprce">
                                  <p className="cr1fot">
                                    By <a href="#">Poonam Verma</a>
                                  </p>
                                  <div className="prce142">$12</div>
                                  <button className="shrt-cart-btn" title="cart">
                                    <i className="uil uil-shopping-cart-alt" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item"
                          style={{ width: "271.367px", marginRight: 20 }}
                        >
                          <div className="item">
                            <div className="fcrse_1 mb-20">
                              <a
                                href="course_detail_view.html"
                                className="fcrse_img"
                              >
                                <img src="/theme/images/courses/img-5.jpg" alt="" />
                                <div className="course-overlay">
                                  <div className="badge_seller">Bestseller</div>
                                  <div className="crse_reviews">
                                    <i className="uil uil-star" />
                                    4.5
                                  </div>
                                  <span className="play_btn1">
                                    <i className="uil uil-play" />
                                  </span>
                                  <div className="crse_timer">1.5 hours</div>
                                </div>
                              </a>
                              <div className="fcrse_content">
                                <div className="eps_dots more_dropdown">
                                  <a href="#">
                                    <i className="uil uil-ellipsis-v" />
                                  </a>
                                  <div className="dropdown-content">
                                    <span>
                                      <i className="uil uil-share-alt" />
                                      Share
                                    </span>
                                    <span>
                                      <i className="uil uil-heart" />
                                      Save
                                    </span>
                                    <span>
                                      <i className="uil uil-ban" />
                                      Not Interested
                                    </span>
                                    <span>
                                      <i className="uil uil-windsock" />
                                      Report
                                    </span>
                                  </div>
                                </div>
                                <div className="vdtodt">
                                  <span className="vdt14">53k views</span>
                                  <span className="vdt14">14 days ago</span>
                                </div>
                                <a
                                  href="course_detail_view.html"
                                  className="crse14s"
                                >
                                  Microsoft Excel - Excel from Beginner to
                                  Advanced
                                </a>
                                <a href="#" className="crse-cate">
                                  Office Productivity | Excel
                                </a>
                                <div className="auth1lnkprce">
                                  <p className="cr1fot">
                                    By <a href="#">Rock William</a>
                                  </p>
                                  <div className="prce142">$6</div>
                                  <button className="shrt-cart-btn" title="cart">
                                    <i className="uil uil-shopping-cart-alt" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item active"
                          style={{ width: "271.367px", marginRight: 20 }}
                        >
                          <div className="item">
                            <div className="fcrse_1 mb-20">
                              <a
                                href="course_detail_view.html"
                                className="fcrse_img"
                              >
                                <img src="/theme/images/courses/img-6.jpg" alt="" />
                                <div className="course-overlay">
                                  <div className="badge_seller">Bestseller</div>
                                  <div className="crse_reviews">
                                    <i className="uil uil-star" />
                                    5.0
                                  </div>
                                  <span className="play_btn1">
                                    <i className="uil uil-play" />
                                  </span>
                                  <div className="crse_timer">36 hours</div>
                                </div>
                              </a>
                              <div className="fcrse_content">
                                <div className="eps_dots more_dropdown">
                                  <a href="#">
                                    <i className="uil uil-ellipsis-v" />
                                  </a>
                                  <div className="dropdown-content">
                                    <span>
                                      <i className="uil uil-share-alt" />
                                      Share
                                    </span>
                                    <span>
                                      <i className="uil uil-heart" />
                                      Save
                                    </span>
                                    <span>
                                      <i className="uil uil-ban" />
                                      Not Interested
                                    </span>
                                    <span>
                                      <i className="uil uil-windsock" />
                                      Report
                                    </span>
                                  </div>
                                </div>
                                <div className="vdtodt">
                                  <span className="vdt14">253k views</span>
                                  <span className="vdt14">10 days ago</span>
                                </div>
                                <a
                                  href="course_detail_view.html"
                                  className="crse14s"
                                >
                                  Angular 8 - The Complete Guide (2020 Edition)
                                </a>
                                <a href="#" className="crse-cate">
                                  Development | Angular
                                </a>
                                <div className="auth1lnkprce">
                                  <p className="cr1fot">
                                    By <a href="#">John Doe</a>
                                  </p>
                                  <div className="prce142">$15</div>
                                  <button className="shrt-cart-btn" title="cart">
                                    <i className="uil uil-shopping-cart-alt" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item active"
                          style={{ width: "271.367px", marginRight: 20 }}
                        >
                          <div className="item">
                            <div className="fcrse_1 mb-20">
                              <a
                                href="course_detail_view.html"
                                className="fcrse_img"
                              >
                                <img src="/theme/images/courses/img-7.jpg" alt="" />
                                <div className="course-overlay">
                                  <div className="badge_seller">Bestseller</div>
                                  <div className="crse_reviews">
                                    <i className="uil uil-star" />
                                    5.0
                                  </div>
                                  <span className="play_btn1">
                                    <i className="uil uil-play" />
                                  </span>
                                  <div className="crse_timer">5.4 hours</div>
                                </div>
                              </a>
                              <div className="fcrse_content">
                                <div className="eps_dots more_dropdown">
                                  <a href="#">
                                    <i className="uil uil-ellipsis-v" />
                                  </a>
                                  <div className="dropdown-content">
                                    <span>
                                      <i className="uil uil-share-alt" />
                                      Share
                                    </span>
                                    <span>
                                      <i className="uil uil-heart" />
                                      Save
                                    </span>
                                    <span>
                                      <i className="uil uil-ban" />
                                      Not Interested
                                    </span>
                                    <span>
                                      <i className="uil uil-windsock" />
                                      Report
                                    </span>
                                  </div>
                                </div>
                                <div className="vdtodt">
                                  <span className="vdt14">109k views</span>
                                  <span className="vdt14">15 days ago</span>
                                </div>
                                <a
                                  href="course_detail_view.html"
                                  className="crse14s"
                                >
                                  WordPress for Beginners: Create a Website Step
                                  by Step
                                </a>
                                <a href="#" className="crse-cate">
                                  Design | Wordpress
                                </a>
                                <div className="auth1lnkprce">
                                  <p className="cr1fot">
                                    By <a href="#">Sabnam SIngh</a>
                                  </p>
                                  <div className="prce142">$18</div>
                                  <button className="shrt-cart-btn" title="cart">
                                    <i className="uil uil-shopping-cart-alt" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item active"
                          style={{ width: "271.367px", marginRight: 20 }}
                        >
                          <div className="item">
                            <div className="fcrse_1 mb-20">
                              <a
                                href="course_detail_view.html"
                                className="fcrse_img"
                              >
                                <img src="/theme/images/courses/img-8.jpg" alt="" />
                                <div className="course-overlay">
                                  <div className="badge_seller">Bestseller</div>
                                  <div className="crse_reviews">
                                    <i className="uil uil-star" />
                                    4.0
                                  </div>
                                  <span className="play_btn1">
                                    <i className="uil uil-play" />
                                  </span>
                                  <div className="crse_timer">23 hours</div>
                                </div>
                              </a>
                              <div className="fcrse_content">
                                <div className="eps_dots more_dropdown">
                                  <a href="#">
                                    <i className="uil uil-ellipsis-v" />
                                  </a>
                                  <div className="dropdown-content">
                                    <span>
                                      <i className="uil uil-share-alt" />
                                      Share
                                    </span>
                                    <span>
                                      <i className="uil uil-heart" />
                                      Save
                                    </span>
                                    <span>
                                      <i className="uil uil-ban" />
                                      Not Interested
                                    </span>
                                    <span>
                                      <i className="uil uil-windsock" />
                                      Report
                                    </span>
                                  </div>
                                </div>
                                <div className="vdtodt">
                                  <span className="vdt14">196k views</span>
                                  <span className="vdt14">1 month ago</span>
                                </div>
                                <a
                                  href="course_detail_view.html"
                                  className="crse14s"
                                >
                                  CSS - The Complete Guide 2020 (incl. Flexbox,
                                  Grid &amp; Sass)
                                </a>
                                <a href="#" className="crse-cate">
                                  Design | CSS
                                </a>
                                <div className="auth1lnkprce">
                                  <p className="cr1fot">
                                    By <a href="#">Jashanpreet Singh</a>
                                  </p>
                                  <div className="prce142">$10</div>
                                  <button className="shrt-cart-btn" title="cart">
                                    <i className="uil uil-shopping-cart-alt" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="owl-nav">
                      <button
                        type="button"
                        role="presentation"
                        className="owl-prev"
                      >
                        <i className="uil uil-angle-left" />
                      </button>
                      <button
                        type="button"
                        role="presentation"
                        className="owl-next disabled"
                      >
                        <i className="uil uil-angle-right" />
                      </button>
                    </div>
                    <div className="owl-dots disabled" />
                  </div>
                </div>
              </div>
              <div className="section3125 mt-30">
                <h4 className="item_title">Newest Courses</h4>
                <a href="#" className="see150">
                  See all
                </a>
                <div className="la5lo1">
                  <div className="owl-carousel featured_courses owl-theme owl-loaded owl-drag">
                    <div className="owl-stage-outer">
                      <div
                        className="owl-stage"
                        style={{
                          transform: "translate3d(0px, 0px, 0px)",
                          transition: "all",
                          width: 2331
                        }}
                      >
                        <div
                          className="owl-item active"
                          style={{ width: "271.367px", marginRight: 20 }}
                        >
                          <div className="item">
                            <div className="fcrse_1 mb-20">
                              <a
                                href="course_detail_view.html"
                                className="fcrse_img"
                              >
                                <img src="/theme/images/courses/img-14.jpg" alt="" />
                                <div className="course-overlay">
                                  <span className="play_btn1">
                                    <i className="uil uil-play" />
                                  </span>
                                  <div className="crse_timer">12 hours</div>
                                </div>
                              </a>
                              <div className="fcrse_content">
                                <div className="eps_dots more_dropdown">
                                  <a href="#">
                                    <i className="uil uil-ellipsis-v" />
                                  </a>
                                  <div className="dropdown-content">
                                    <span>
                                      <i className="uil uil-share-alt" />
                                      Share
                                    </span>
                                    <span>
                                      <i className="uil uil-heart" />
                                      Save
                                    </span>
                                    <span>
                                      <i className="uil uil-ban" />
                                      Not Interested
                                    </span>
                                    <span>
                                      <i className="uil uil-windsock" />
                                      Report
                                    </span>
                                  </div>
                                </div>
                                <div className="vdtodt">
                                  <span className="vdt14">15 views</span>
                                  <span className="vdt14">10 min ago</span>
                                </div>
                                <a
                                  href="course_detail_view.html"
                                  className="crse14s"
                                >
                                  Build Responsive Real World Websites with HTML5
                                  and CSS3
                                </a>
                                <a href="#" className="crse-cate">
                                  Development | CSS
                                </a>
                                <div className="auth1lnkprce">
                                  <p className="cr1fot">
                                    By <a href="#">John Doe</a>
                                  </p>
                                  <div className="prce142">$4</div>
                                  <button className="shrt-cart-btn" title="cart">
                                    <i className="uil uil-shopping-cart-alt" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item active"
                          style={{ width: "271.367px", marginRight: 20 }}
                        >
                          <div className="item">
                            <div className="fcrse_1 mb-20">
                              <a
                                href="course_detail_view.html"
                                className="fcrse_img"
                              >
                                <img src="/theme/images/courses/img-11.jpg" alt="" />
                                <div className="course-overlay">
                                  <span className="play_btn1">
                                    <i className="uil uil-play" />
                                  </span>
                                  <div className="crse_timer">28 hours</div>
                                </div>
                              </a>
                              <div className="fcrse_content">
                                <div className="eps_dots more_dropdown">
                                  <a href="#">
                                    <i className="uil uil-ellipsis-v" />
                                  </a>
                                  <div className="dropdown-content">
                                    <span>
                                      <i className="uil uil-share-alt" />
                                      Share
                                    </span>
                                    <span>
                                      <i className="uil uil-heart" />
                                      Save
                                    </span>
                                    <span>
                                      <i className="uil uil-ban" />
                                      Not Interested
                                    </span>
                                    <span>
                                      <i className="uil uil-windsock" />
                                      Report
                                    </span>
                                  </div>
                                </div>
                                <div className="vdtodt">
                                  <span className="vdt14">5 views</span>
                                  <span className="vdt14">15 Min ago</span>
                                </div>
                                <a
                                  href="course_detail_view.html"
                                  className="crse14s"
                                >
                                  The Complete JavaScript Course 2020: Build Real
                                  Projects!
                                </a>
                                <a href="#" className="crse-cate">
                                  Development | JavaScript
                                </a>
                                <div className="auth1lnkprce">
                                  <p className="cr1fot">
                                    By <a href="#">Jassica William</a>
                                  </p>
                                  <div className="prce142">$5</div>
                                  <button className="shrt-cart-btn" title="cart">
                                    <i className="uil uil-shopping-cart-alt" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item active"
                          style={{ width: "271.367px", marginRight: 20 }}
                        >
                          <div className="item">
                            <div className="fcrse_1 mb-20">
                              <a
                                href="course_detail_view.html"
                                className="fcrse_img"
                              >
                                <img src="/theme/images/courses/img-18.jpg" alt="" />
                                <div className="course-overlay">
                                  <span className="play_btn1">
                                    <i className="uil uil-play" />
                                  </span>
                                  <div className="crse_timer">15 hours</div>
                                </div>
                              </a>
                              <div className="fcrse_content">
                                <div className="eps_dots more_dropdown">
                                  <a href="#">
                                    <i className="uil uil-ellipsis-v" />
                                  </a>
                                  <div className="dropdown-content">
                                    <span>
                                      <i className="uil uil-share-alt" />
                                      Share
                                    </span>
                                    <span>
                                      <i className="uil uil-heart" />
                                      Save
                                    </span>
                                    <span>
                                      <i className="uil uil-ban" />
                                      Not Interested
                                    </span>
                                    <span>
                                      <i className="uil uil-windsock" />
                                      Report
                                    </span>
                                  </div>
                                </div>
                                <div className="vdtodt">
                                  <span className="vdt14">25 views</span>
                                  <span className="vdt14">2 Hour ago</span>
                                </div>
                                <a
                                  href="course_detail_view.html"
                                  className="crse14s"
                                >
                                  The Complete Front-End Web Development Course!
                                </a>
                                <a href="#" className="crse-cate">
                                  Development | Web Development
                                </a>
                                <div className="auth1lnkprce">
                                  <p className="cr1fot">
                                    By <a href="#">Joginder Singh</a>
                                  </p>
                                  <div className="prce142">$9</div>
                                  <button className="shrt-cart-btn" title="cart">
                                    <i className="uil uil-shopping-cart-alt" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item"
                          style={{ width: "271.367px", marginRight: 20 }}
                        >
                          <div className="item">
                            <div className="fcrse_1 mb-20">
                              <a
                                href="course_detail_view.html"
                                className="fcrse_img"
                              >
                                <img src="/theme/images/courses/img-19.jpg" alt="" />
                                <div className="course-overlay">
                                  <div className="crse_reviews">
                                    <i className="uil uil-star" />
                                    5.0
                                  </div>
                                  <span className="play_btn1">
                                    <i className="uil uil-play" />
                                  </span>
                                  <div className="crse_timer">1 hour</div>
                                </div>
                              </a>
                              <div className="fcrse_content">
                                <div className="eps_dots more_dropdown">
                                  <a href="#">
                                    <i className="uil uil-ellipsis-v" />
                                  </a>
                                  <div className="dropdown-content">
                                    <span>
                                      <i className="uil uil-share-alt" />
                                      Share
                                    </span>
                                    <span>
                                      <i className="uil uil-heart" />
                                      Save
                                    </span>
                                    <span>
                                      <i className="uil uil-ban" />
                                      Not Interested
                                    </span>
                                    <span>
                                      <i className="uil uil-windsock" />
                                      Report
                                    </span>
                                  </div>
                                </div>
                                <div className="vdtodt">
                                  <span className="vdt14">15 views</span>
                                  <span className="vdt14">6 hours ago</span>
                                </div>
                                <a
                                  href="course_detail_view.html"
                                  className="crse14s"
                                >
                                  Ethical Hacking - Most Advanced Level
                                  Penetration Testing
                                </a>
                                <a href="#" className="crse-cate">
                                  IT &amp; Software | Ethical Hacking
                                </a>
                                <div className="auth1lnkprce">
                                  <p className="cr1fot">
                                    By <a href="#">Poonam Verma</a>
                                  </p>
                                  <div className="prce142">$10</div>
                                  <button className="shrt-cart-btn" title="cart">
                                    <i className="uil uil-shopping-cart-alt" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item"
                          style={{ width: "271.367px", marginRight: 20 }}
                        >
                          <div className="item">
                            <div className="fcrse_1 mb-20">
                              <a href="#" className="fcrse_img">
                                <img src="/theme/images/courses/img-12.jpg" alt="" />
                                <div className="course-overlay">
                                  <div className="crse_reviews">
                                    <i className="uil uil-star" />
                                    3.5
                                  </div>
                                  <span className="play_btn1">
                                    <i className="uil uil-play" />
                                  </span>
                                  <div className="crse_timer">28 hours</div>
                                </div>
                              </a>
                              <div className="fcrse_content">
                                <div className="eps_dots more_dropdown">
                                  <a href="#">
                                    <i className="uil uil-ellipsis-v" />
                                  </a>
                                  <div className="dropdown-content">
                                    <span>
                                      <i className="uil uil-share-alt" />
                                      Share
                                    </span>
                                    <span>
                                      <i className="uil uil-heart" />
                                      Save
                                    </span>
                                    <span>
                                      <i className="uil uil-ban" />
                                      Not Interested
                                    </span>
                                    <span>
                                      <i className="uil uil-windsock" />
                                      Report
                                    </span>
                                  </div>
                                </div>
                                <div className="vdtodt">
                                  <span className="vdt14">45 views</span>
                                  <span className="vdt14">20 hours ago</span>
                                </div>
                                <a
                                  href="course_detail_view.html"
                                  className="crse14s"
                                >
                                  Advanced CSS and Sass: Flexbox, Grid, Animations
                                  and More!
                                </a>
                                <a href="#" className="crse-cate">
                                  Development | Sass
                                </a>
                                <div className="auth1lnkprce">
                                  <p className="cr1fot">
                                    By <a href="#">Rock William</a>
                                  </p>
                                  <div className="prce142">$6</div>
                                  <button className="shrt-cart-btn" title="cart">
                                    <i className="uil uil-shopping-cart-alt" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item"
                          style={{ width: "271.367px", marginRight: 20 }}
                        >
                          <div className="item">
                            <div className="fcrse_1 mb-20">
                              <a href="#" className="fcrse_img">
                                <img src="/theme/images/courses/img-13.jpg" alt="" />
                                <div className="course-overlay">
                                  <span className="play_btn1">
                                    <i className="uil uil-play" />
                                  </span>
                                  <div className="crse_timer">30 hours</div>
                                </div>
                              </a>
                              <div className="fcrse_content">
                                <div className="eps_dots more_dropdown">
                                  <a href="#">
                                    <i className="uil uil-ellipsis-v" />
                                  </a>
                                  <div className="dropdown-content">
                                    <span>
                                      <i className="uil uil-share-alt" />
                                      Share
                                    </span>
                                    <span>
                                      <i className="uil uil-heart" />
                                      Save
                                    </span>
                                    <span>
                                      <i className="uil uil-ban" />
                                      Not Interested
                                    </span>
                                    <span>
                                      <i className="uil uil-windsock" />
                                      Report
                                    </span>
                                  </div>
                                </div>
                                <div className="vdtodt">
                                  <span className="vdt14">20 Views</span>
                                  <span className="vdt14">1 day ago</span>
                                </div>
                                <a
                                  href="course_detail_view.html"
                                  className="crse14s"
                                >
                                  The Complete Node.js Developer Course (3rd
                                  Edition)
                                </a>
                                <a href="#" className="crse-cate">
                                  Development | Node.js
                                </a>
                                <div className="auth1lnkprce">
                                  <p className="cr1fot">
                                    By <a href="#">John Doe</a>
                                  </p>
                                  <div className="prce142">$3</div>
                                  <button className="shrt-cart-btn" title="cart">
                                    <i className="uil uil-shopping-cart-alt" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item"
                          style={{ width: "271.367px", marginRight: 20 }}
                        >
                          <div className="item">
                            <div className="fcrse_1 mb-20">
                              <a href="#" className="fcrse_img">
                                <img src="/theme/images/courses/img-20.jpg" alt="" />
                                <div className="course-overlay">
                                  <div className="crse_reviews">
                                    <i className="uil uil-star" />
                                    5.0
                                  </div>
                                  <span className="play_btn1">
                                    <i className="uil uil-play" />
                                  </span>
                                  <div className="crse_timer">21 hours</div>
                                </div>
                              </a>
                              <div className="fcrse_content">
                                <div className="eps_dots more_dropdown">
                                  <a href="#">
                                    <i className="uil uil-ellipsis-v" />
                                  </a>
                                  <div className="dropdown-content">
                                    <span>
                                      <i className="uil uil-share-alt" />
                                      Share
                                    </span>
                                    <span>
                                      <i className="uil uil-heart" />
                                      Save
                                    </span>
                                    <span>
                                      <i className="uil uil-ban" />
                                      Not Interested
                                    </span>
                                    <span>
                                      <i className="uil uil-windsock" />
                                      Report
                                    </span>
                                  </div>
                                </div>
                                <div className="vdtodt">
                                  <span className="vdt14">200 Views</span>
                                  <span className="vdt14">4 days ago</span>
                                </div>
                                <a
                                  href="course_detail_view.html"
                                  className="crse14s"
                                >
                                  WordPress Development - Themes, Plugins &amp;
                                  Gutenberg
                                </a>
                                <a href="#" className="crse-cate">
                                  Design | Wordpress
                                </a>
                                <div className="auth1lnkprce">
                                  <p className="cr1fot">
                                    By <a href="#">Joy Dua</a>
                                  </p>
                                  <div className="prce142">$14</div>
                                  <button className="shrt-cart-btn" title="cart">
                                    <i className="uil uil-shopping-cart-alt" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item"
                          style={{ width: "271.367px", marginRight: 20 }}
                        >
                          <div className="item">
                            <div className="fcrse_1 mb-20">
                              <a
                                href="course_detail_view.html"
                                className="fcrse_img"
                              >
                                <img src="/theme/images/courses/img-16.jpg" alt="" />
                                <div className="course-overlay">
                                  <span className="play_btn1">
                                    <i className="uil uil-play" />
                                  </span>
                                  <div className="crse_timer">22 hours</div>
                                </div>
                              </a>
                              <div className="fcrse_content">
                                <div className="eps_dots more_dropdown">
                                  <a href="#">
                                    <i className="uil uil-ellipsis-v" />
                                  </a>
                                  <div className="dropdown-content">
                                    <span>
                                      <i className="uil uil-share-alt" />
                                      Share
                                    </span>
                                    <span>
                                      <i className="uil uil-heart" />
                                      Save
                                    </span>
                                    <span>
                                      <i className="uil uil-ban" />
                                      Not Interested
                                    </span>
                                    <span>
                                      <i className="uil uil-windsock" />
                                      Report
                                    </span>
                                  </div>
                                </div>
                                <div className="vdtodt">
                                  <span className="vdt14">11 Views</span>
                                  <span className="vdt14">5 Days ago</span>
                                </div>
                                <a
                                  href="course_detail_view.html"
                                  className="crse14s"
                                >
                                  Vue JS 2 - The Complete Guide (incl. Vue Router
                                  &amp; Vuex)
                                </a>
                                <a href="#" className="crse-cate">
                                  Development | Vue JS
                                </a>
                                <div className="auth1lnkprce">
                                  <p className="cr1fot">
                                    By <a href="#">Manreet Kaur</a>
                                  </p>
                                  <div className="prce142">$10</div>
                                  <button className="shrt-cart-btn" title="cart">
                                    <i className="uil uil-shopping-cart-alt" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="owl-nav">
                      <button
                        type="button"
                        role="presentation"
                        className="owl-prev disabled"
                      >
                        <i className="uil uil-angle-left" />
                      </button>
                      <button
                        type="button"
                        role="presentation"
                        className="owl-next"
                      >
                        <i className="uil uil-angle-right" />
                      </button>
                    </div>
                    <div className="owl-dots disabled" />
                  </div>
                </div>
              </div>
              <div className="section3126">
                <div className="row">
                  <div className="col-xl-6 col-lg-12 col-md-6">
                    <div className="value_props">
                      <div className="value_icon">
                        <i className="uil uil-history" />
                      </div>
                      <div className="value_content">
                        <h4>Go at your own pace</h4>
                        <p>
                          Enjoy lifetime access to courses on Edututs+'s website
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-12 col-md-6">
                    <div className="value_props">
                      <div className="value_icon">
                        <i className="uil uil-user-check" />
                      </div>
                      <div className="value_content">
                        <h4>Learn from industry experts</h4>
                        <p>Select from top instructors around the world</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-12 col-md-6">
                    <div className="value_props">
                      <div className="value_icon">
                        <i className="uil uil-play-circle" />
                      </div>
                      <div className="value_content">
                        <h4>Find video courses on almost any topic</h4>
                        <p>
                          Build your library for your career and personal growth
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-12 col-md-6">
                    <div className="value_props">
                      <div className="value_icon">
                        <i className="uil uil-presentation-play" />
                      </div>
                      <div className="value_content">
                        <h4>100,000 online courses</h4>
                        <p>Explore a variety of fresh topics</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section3125 mt-50">
                <h4 className="item_title">Popular Instructors</h4>
                <a href="all_instructor.html" className="see150">
                  See all
                </a>
                <div className="la5lo1">
                  <div className="owl-carousel top_instrutors owl-theme owl-loaded owl-drag">
                    <div className="owl-stage-outer">
                      <div
                        className="owl-stage"
                        style={{
                          transform: "translate3d(0px, 0px, 0px)",
                          transition: "all",
                          width: 2331
                        }}
                      >
                        <div
                          className="owl-item active"
                          style={{ width: "271.367px", marginRight: 20 }}
                        >
                          <div className="item">
                            <div className="fcrse_1 mb-20">
                              <div className="tutor_img">
                                <a href="instructor_profile_view.html">
                                  <img src="/theme/images/left-imgs/img-1.jpg" alt="" />
                                </a>
                              </div>
                              <div className="tutor_content_dt">
                                <div className="tutor150">
                                  <a
                                    href="instructor_profile_view.html"
                                    className="tutor_name"
                                  >
                                    John Doe
                                  </a>
                                  <div className="mef78" title="Verify">
                                    <i className="uil uil-check-circle" />
                                  </div>
                                </div>
                                <div className="tutor_cate">
                                  Wordpress &amp; Plugin Tutor
                                </div>
                                <ul className="tutor_social_links">
                                  <li>
                                    <a href="#" className="fb">
                                      <i className="fab fa-facebook-f" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" className="tw">
                                      <i className="fab fa-twitter" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" className="ln">
                                      <i className="fab fa-linkedin-in" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" className="yu">
                                      <i className="fab fa-youtube" />
                                    </a>
                                  </li>
                                </ul>
                                <div className="tut1250">
                                  <span className="vdt15">100K Students</span>
                                  <span className="vdt15">15 Courses</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item active"
                          style={{ width: "271.367px", marginRight: 20 }}
                        >
                          <div className="item">
                            <div className="fcrse_1 mb-20">
                              <div className="tutor_img">
                                <a href="instructor_profile_view.html">
                                  <img src="/theme/images/left-imgs/img-2.jpg" alt="" />
                                </a>
                              </div>
                              <div className="tutor_content_dt">
                                <div className="tutor150">
                                  <a
                                    href="instructor_profile_view.html"
                                    className="tutor_name"
                                  >
                                    Kerstin Cable
                                  </a>
                                  <div className="mef78" title="Verify">
                                    <i className="uil uil-check-circle" />
                                  </div>
                                </div>
                                <div className="tutor_cate">
                                  Language Learning Coach, Writer, Online Tutor
                                </div>
                                <ul className="tutor_social_links">
                                  <li>
                                    <a href="#" className="fb">
                                      <i className="fab fa-facebook-f" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" className="tw">
                                      <i className="fab fa-twitter" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" className="ln">
                                      <i className="fab fa-linkedin-in" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" className="yu">
                                      <i className="fab fa-youtube" />
                                    </a>
                                  </li>
                                </ul>
                                <div className="tut1250">
                                  <span className="vdt15">14K Students</span>
                                  <span className="vdt15">11 Courses</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item active"
                          style={{ width: "271.367px", marginRight: 20 }}
                        >
                          <div className="item">
                            <div className="fcrse_1 mb-20">
                              <div className="tutor_img">
                                <a href="instructor_profile_view.html">
                                  <img src="/theme/images/left-imgs/img-3.jpg" alt="" />
                                </a>
                              </div>
                              <div className="tutor_content_dt">
                                <div className="tutor150">
                                  <a
                                    href="instructor_profile_view.html"
                                    className="tutor_name"
                                  >
                                    Jose Portilla
                                  </a>
                                  <div className="mef78" title="Verify">
                                    <i className="uil uil-check-circle" />
                                  </div>
                                </div>
                                <div className="tutor_cate">
                                  Head of Data Science, Pierian Data Inc.
                                </div>
                                <ul className="tutor_social_links">
                                  <li>
                                    <a href="#" className="fb">
                                      <i className="fab fa-facebook-f" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" className="tw">
                                      <i className="fab fa-twitter" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" className="ln">
                                      <i className="fab fa-linkedin-in" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" className="yu">
                                      <i className="fab fa-youtube" />
                                    </a>
                                  </li>
                                </ul>
                                <div className="tut1250">
                                  <span className="vdt15">1M Students</span>
                                  <span className="vdt15">25 Courses</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item"
                          style={{ width: "271.367px", marginRight: 20 }}
                        >
                          <div className="item">
                            <div className="fcrse_1 mb-20">
                              <div className="tutor_img">
                                <a href="instructor_profile_view.html">
                                  <img src="/theme/images/left-imgs/img-4.jpg" alt="" />
                                </a>
                              </div>
                              <div className="tutor_content_dt">
                                <div className="tutor150">
                                  <a
                                    href="instructor_profile_view.html"
                                    className="tutor_name"
                                  >
                                    Farhat Amin
                                  </a>
                                  <div className="mef78" title="Verify">
                                    <i className="uil uil-check-circle" />
                                  </div>
                                </div>
                                <div className="tutor_cate">Cookery Coach</div>
                                <ul className="tutor_social_links">
                                  <li>
                                    <a href="#" className="fb">
                                      <i className="fab fa-facebook-f" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" className="tw">
                                      <i className="fab fa-twitter" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" className="ln">
                                      <i className="fab fa-linkedin-in" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" className="yu">
                                      <i className="fab fa-youtube" />
                                    </a>
                                  </li>
                                </ul>
                                <div className="tut1250">
                                  <span className="vdt15">1.5K Students</span>
                                  <span className="vdt15">9 Courses</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item"
                          style={{ width: "271.367px", marginRight: 20 }}
                        >
                          <div className="item">
                            <div className="fcrse_1 mb-20">
                              <div className="tutor_img">
                                <a href="instructor_profile_view.html">
                                  <img src="/theme/images/left-imgs/img-5.jpg" alt="" />
                                </a>
                              </div>
                              <div className="tutor_content_dt">
                                <div className="tutor150">
                                  <a
                                    href="instructor_profile_view.html"
                                    className="tutor_name"
                                  >
                                    Kyle Pew
                                  </a>
                                  <div className="mef78" title="Verify">
                                    <i className="uil uil-check-circle" />
                                  </div>
                                </div>
                                <div className="tutor_cate">
                                  Microsoft Certified Trainer - 380,000+ Udemy
                                  Students
                                </div>
                                <ul className="tutor_social_links">
                                  <li>
                                    <a href="#" className="fb">
                                      <i className="fab fa-facebook-f" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" className="tw">
                                      <i className="fab fa-twitter" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" className="ln">
                                      <i className="fab fa-linkedin-in" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" className="yu">
                                      <i className="fab fa-youtube" />
                                    </a>
                                  </li>
                                </ul>
                                <div className="tut1250">
                                  <span className="vdt15">300K Students</span>
                                  <span className="vdt15">18 Courses</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item"
                          style={{ width: "271.367px", marginRight: 20 }}
                        >
                          <div className="item">
                            <div className="fcrse_1 mb-20">
                              <div className="tutor_img">
                                <a href="instructor_profile_view.html">
                                  <img src="/theme/images/left-imgs/img-7.jpg" alt="" />
                                </a>
                              </div>
                              <div className="tutor_content_dt">
                                <div className="tutor150">
                                  <a
                                    href="instructor_profile_view.html"
                                    className="tutor_name"
                                  >
                                    Jaysen Batchelor
                                  </a>
                                  <div className="mef78" title="Verify">
                                    <i className="uil uil-check-circle" />
                                  </div>
                                </div>
                                <div className="tutor_cate">
                                  Illustrator &amp; Designer
                                </div>
                                <ul className="tutor_social_links">
                                  <li>
                                    <a href="#" className="fb">
                                      <i className="fab fa-facebook-f" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" className="tw">
                                      <i className="fab fa-twitter" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" className="ln">
                                      <i className="fab fa-linkedin-in" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" className="yu">
                                      <i className="fab fa-youtube" />
                                    </a>
                                  </li>
                                </ul>
                                <div className="tut1250">
                                  <span className="vdt15">491K Students</span>
                                  <span className="vdt15">13 Courses</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item"
                          style={{ width: "271.367px", marginRight: 20 }}
                        >
                          <div className="item">
                            <div className="fcrse_1 mb-20">
                              <div className="tutor_img">
                                <a href="instructor_profile_view.html">
                                  <img src="/theme/images/left-imgs/img-8.jpg" alt="" />
                                </a>
                              </div>
                              <div className="tutor_content_dt">
                                <div className="tutor150">
                                  <a
                                    href="instructor_profile_view.html"
                                    className="tutor_name"
                                  >
                                    Quinton Batchelor
                                  </a>
                                  <div className="mef78" title="Verify">
                                    <i className="uil uil-check-circle" />
                                  </div>
                                </div>
                                <div className="tutor_cate">
                                  Photographer &amp; Instructor
                                </div>
                                <ul className="tutor_social_links">
                                  <li>
                                    <a href="#" className="fb">
                                      <i className="fab fa-facebook-f" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" className="tw">
                                      <i className="fab fa-twitter" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" className="ln">
                                      <i className="fab fa-linkedin-in" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" className="yu">
                                      <i className="fab fa-youtube" />
                                    </a>
                                  </li>
                                </ul>
                                <div className="tut1250">
                                  <span className="vdt15">364K Students</span>
                                  <span className="vdt15">6 Courses</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="owl-item"
                          style={{ width: "271.367px", marginRight: 20 }}
                        >
                          <div className="item">
                            <div className="fcrse_1 mb-20">
                              <div className="tutor_img">
                                <a href="instructor_profile_view.html">
                                  <img src="/theme/images/left-imgs/img-6.jpg" alt="" />
                                </a>
                              </div>
                              <div className="tutor_content_dt">
                                <div className="tutor150">
                                  <a
                                    href="instructor_profile_view.html"
                                    className="tutor_name"
                                  >
                                    Eli Natoli
                                  </a>
                                  <div className="mef78" title="Verify">
                                    <i className="uil uil-check-circle" />
                                  </div>
                                </div>
                                <div className="tutor_cate">
                                  Entrepreneur - Passionate Teacher
                                </div>
                                <ul className="tutor_social_links">
                                  <li>
                                    <a href="#" className="fb">
                                      <i className="fab fa-facebook-f" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" className="tw">
                                      <i className="fab fa-twitter" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" className="ln">
                                      <i className="fab fa-linkedin-in" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" className="yu">
                                      <i className="fab fa-youtube" />
                                    </a>
                                  </li>
                                </ul>
                                <div className="tut1250">
                                  <span className="vdt15">615K Students</span>
                                  <span className="vdt15">12 Courses</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="owl-nav">
                      <button
                        type="button"
                        role="presentation"
                        className="owl-prev disabled"
                      >
                        <i className="uil uil-angle-left" />
                      </button>
                      <button
                        type="button"
                        role="presentation"
                        className="owl-next"
                      >
                        <i className="uil uil-angle-right" />
                      </button>
                    </div>
                    <div className="owl-dots disabled" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4">
              <div className="right_side">
                <div className="fcrse_2 mb-30">
                  <div className="tutor_img">
                    <a href="my_instructor_profile_view.html">
                      <img src="/theme/images/left-imgs/img-10.jpg" alt="" />
                    </a>
                  </div>
                  <div className="tutor_content_dt">
                    <div className="tutor150">
                      <a
                        href="my_instructor_profile_view.html"
                        className="tutor_name"
                      >
                        Joginder Singh
                      </a>
                      <div className="mef78" title="Verify">
                        <i className="uil uil-check-circle" />
                      </div>
                    </div>
                    <div className="tutor_cate">
                      Web Developer, Designer, and Teacher
                    </div>
                    <ul className="tutor_social_links">
                      <li>
                        <a href="#" className="fb">
                          <i className="fab fa-facebook-f" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="tw">
                          <i className="fab fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="ln">
                          <i className="fab fa-linkedin-in" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="yu">
                          <i className="fab fa-youtube" />
                        </a>
                      </li>
                    </ul>
                    <div className="tut1250">
                      <span className="vdt15">615K Students</span>
                      <span className="vdt15">12 Courses</span>
                    </div>
                    <a
                      href="my_instructor_profile_view.html"
                      className="prfle12link"
                    >
                      Go To Profile
                    </a>
                  </div>
                </div>
                <div className="fcrse_3">
                  <div className="cater_ttle">
                    <h4>Live Streaming</h4>
                  </div>
                  <div className="live_text">
                    <div className="live_icon">
                      <i className="uil uil-kayak" />
                    </div>
                    <div className="live-content">
                      <p>Set up your channel and stream live to your students</p>
                      <button
                        className="live_link"
                        // onClick={()=>{window.location.href = 'add_streaming.html'}}
                      >
                        Get Started
                      </button>
                      <span className="livinfo">
                        Info : This feature only for 'Instructors'.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="get1452">
                  <h4>Get personalized recommendations</h4>
                  <p>Answer a few questions for your top picks</p>
                  <button
                    className="Get_btn"
                    // onClick="window.location.href = '#';"
                  >
                    Get Started
                  </button>
                </div>
                <div className="fcrse_3">
                  <div className="cater_ttle">
                    <h4>Top Categories</h4>
                  </div>
                  <ul className="allcate15">
                    <li>
                      <a href="#" className="ct_item">
                        <i className="uil uil-arrow" />
                        Development
                      </a>
                    </li>
                    <li>
                      <a href="#" className="ct_item">
                        <i className="uil uil-graph-bar" />
                        Business
                      </a>
                    </li>
                    <li>
                      <a href="#" className="ct_item">
                        <i className="uil uil-monitor" />
                        IT and Software
                      </a>
                    </li>
                    <li>
                      <a href="#" className="ct_item">
                        <i className="uil uil-ruler" />
                        Design
                      </a>
                    </li>
                    <li>
                      <a href="#" className="ct_item">
                        <i className="uil uil-chart-line" />
                        Marketing
                      </a>
                    </li>
                    <li>
                      <a href="#" className="ct_item">
                        <i className="uil uil-book-open" />
                        Personal Development
                      </a>
                    </li>
                    <li>
                      <a href="#" className="ct_item">
                        <i className="uil uil-camera" />
                        Photography
                      </a>
                    </li>
                    <li>
                      <a href="#" className="ct_item">
                        <i className="uil uil-music" />
                        Music
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="strttech120">
                  <h4>Become an Instructor</h4>
                  <p>
                    Top instructors from around the world teach millions of
                    students on Cursus. We provide the tools and skills to teach
                    what you love.
                  </p>
                  <button
                    className="Get_btn"
                    // onClick="window.location.href = '#';"
                  >
                    Start Teaching
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="col-xl-12 col-lg-12">
              <div className="section3125 mt-30">
                <h4 className="item_title">Captures</h4>
                <ContentDisplay contentToView="portrait-images"/>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    {/* Body End */}
  </>
  
  )
}
