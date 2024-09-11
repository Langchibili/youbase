import LikeButton from "@/components/Parts/EngageMents/LikeButton";
import PostImpressions from "@/components/Parts/EngageMents/PostImpressions";
import ShareButton from "@/components/Parts/EngageMents/ShareButton";
import StreamsDisplay from "@/components/Parts/EngageMents/StreamsDisplay";
import ViewsDisplay from "@/components/Parts/EngageMents/ViewsDisplay";
import MainFooter from "@/components/Parts/Footer/MainFooter";
import MainHeader from "@/components/Parts/Header/MainHeader";
import MediaDisplay from "@/components/Parts/MediaDisplay/MediaDisplay";
import MainMenu from "@/components/Parts/Menus/MainMenu";
import AvatarWithFollowButton from "@/components/Parts/UserDisplay/AvatarWithFollowButton";

export default function SinglePostDisplay(props) {
  return (
    <>
    {/* Header Start */}
    <MainHeader {...props}/>
    {/* Header End */}
    {/* Left Sidebar Start */}
    <MainMenu {...props}/>
    {/* Left Sidebar End */}
    {/* Body Start */}
    <div className="wrapper">
  <div className="sa4d25">
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-8 col-lg-8">
          <div className="section3125">
           <MediaDisplay {...props}/>
            <div className="user_dt5">
              <div className="user_dt_left">
                <div className="live_user_dt">
                  <AvatarWithFollowButton {...props}/>
                </div>
              </div>
              <div className="user_dt_right">
                <ul>
                  {props.post.type === "video"? <ViewsDisplay {...props}/> : <></>}
                  {props.post.type === "music"? <StreamsDisplay {...props}/> : <></>}
                  <LikeButton {...props}/>
                  <ShareButton {...props}/>
                  <PostImpressions {...props}/>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4">
          <div className="right_side">
            <div className="fcrse_3">
              <div className="cater_ttle">
                <h4>Live Chat</h4>
              </div>
              <div className="live_chat">
                <div className="chat1">
                  <p>
                    <a href="#">John Doe</a>Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Donec aliquet molestie leo ac
                    pellentesque
                  </p>
                  <p>
                    <a href="#">Poonam</a>Class aptent taciti sociosqu ad litora
                    torquent per conubia nostra
                  </p>
                  <p>
                    <a href="#">Jass</a>Nulla sollicitudin nec nisi at
                    pellentesque. Cras fringilla est et sem tempor
                  </p>
                  <p>
                    <a href="#">Albert Smith</a>Pellentesque ultricies risus sit
                    amet congue euismod
                  </p>
                  <p>
                    <a href="#">Jassica William</a>Nullam efficitur tristique
                    consequat
                  </p>
                  <p>
                    <a href="#">Joy Dua</a>Proin sed leo eleifend,
                  </p>
                  <p>
                    <a href="#">Zoena Singh</a>Aliquam dignissim elementum sem
                    id rutrum
                  </p>
                  <p>
                    <a href="#">Amritpal Singh</a>Fusce a elit at libero
                    sollicitudin tincidunt
                  </p>
                  <p>
                    <a href="#">Johnson</a>Ut laoreet lobortis ornare
                  </p>
                  <p>
                    <a href="#">Jashan</a>Sed pretium erat eu turpis condimentum
                  </p>
                </div>
              </div>
              <div className="live_comment">
                <input
                  className="live_input"
                  type="text"
                  placeholder="Say Something..."
                />
                <button className="btn_live">
                  <i className="uil uil-message" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="section3125 mb-15 mt-20">
            <h4 className="item_title">Live Streams</h4>
            <a href="live_streams.html" className="see150">
              See all
            </a>
            <div className="la5lo1">
              <div className="owl-carousel live_stream owl-theme owl-loaded owl-drag">
                <div className="owl-stage-outer">
                  <div
                    className="owl-stage"
                    style={{
                      transform: "translate3d(-579px, 0px, 0px)",
                      transition: "all",
                      width: 1739
                    }}
                  >
                    <div
                      className="owl-item"
                      style={{ width: "183.133px", marginRight: 10 }}
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
                      className="owl-item"
                      style={{ width: "183.133px", marginRight: 10 }}
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
                      className="owl-item"
                      style={{ width: "183.133px", marginRight: 10 }}
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
                      style={{ width: "183.133px", marginRight: 10 }}
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
                      style={{ width: "183.133px", marginRight: 10 }}
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
                      style={{ width: "183.133px", marginRight: 10 }}
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
                      className="owl-item active"
                      style={{ width: "183.133px", marginRight: 10 }}
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
                      className="owl-item active"
                      style={{ width: "183.133px", marginRight: 10 }}
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
                      className="owl-item active"
                      style={{ width: "183.133px", marginRight: 10 }}
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
        </div>
      </div>
    </div>
  </div>
  <MainFooter {...props}/>
</div>

    {/* Body End */}
  </>
  
  );
}
