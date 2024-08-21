
import MainHeader from "@/components/Parts/Header/MainHeader";
import MainMenu from "@/components/Parts/Menus/MainMenu";

export default function UserProfileDisplay(props) {
  return (
    <>
    {/* Header Start */}
    <MainHeader {...props}/>
    {/* Header End */}
    {/* Left Sidebar Start */}
    <MainMenu {...props}/>
    {/* Left Sidebar End */}
    {/* Body Start */}
    <div className="wrapper _bg4586">
  <div className="_216b01">
    <div className="container-fluid">
      <div className="row justify-content-md-center">
        <div className="col-md-10">
          <div className="section3125 rpt145">
            <div className="row">
              <div className="col-lg-7">
                <a href="#" className="_216b22">
                  <span>
                    <i className="uil uil-cog" />
                  </span>
                  Setting
                </a>
                <div className="dp_dt150">
                  <div className="img148">
                    <img src="images/hd_dp.jpg" alt="" />
                  </div>
                  <div className="prfledt1">
                    <h2>Joginder Singh</h2>
                    <span>UI / UX Designer and Web Developer</span>
                  </div>
                </div>
                <ul className="_ttl120">
                  <li>
                    <div className="_ttl121">
                      <div className="_ttl122">Enroll Students</div>
                      <div className="_ttl123">612K</div>
                    </div>
                  </li>
                  <li>
                    <div className="_ttl121">
                      <div className="_ttl122">Courses</div>
                      <div className="_ttl123">8</div>
                    </div>
                  </li>
                  <li>
                    <div className="_ttl121">
                      <div className="_ttl122">Reviews</div>
                      <div className="_ttl123">11K</div>
                    </div>
                  </li>
                  <li>
                    <div className="_ttl121">
                      <div className="_ttl122">Subscriptions</div>
                      <div className="_ttl123">452K</div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-lg-5">
                <a href="setting.html" className="_216b12">
                  <span>
                    <i className="uil uil-cog" />
                  </span>
                  Setting
                </a>
                <div className="rgt-145">
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
                </div>
                <ul className="_bty149">
                  <li>
                    <button
                      className="studio-link-btn btn500"
                      onclick="window.location.href = 'instructor_dashboard.html';"
                    >
                      Cursus Studio
                    </button>
                  </li>
                  <li>
                    <button
                      className="msg125 btn500"
                      onclick="window.location.href = 'setting.html';"
                    >
                      Edit
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="_215b15">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="course_tabs">
            <nav>
              <div
                className="nav nav-tabs tab_crse"
                id="nav-tab"
                role="tablist"
              >
                <a
                  className="nav-item nav-link"
                  id="nav-about-tab"
                  data-toggle="tab"
                  href="#nav-about"
                  role="tab"
                  aria-selected="false"
                >
                  About
                </a>
                <a
                  className="nav-item nav-link"
                  id="nav-courses-tab"
                  data-toggle="tab"
                  href="#nav-courses"
                  role="tab"
                  aria-selected="false"
                >
                  Courses
                </a>
                <a
                  className="nav-item nav-link"
                  id="nav-purchased-tab"
                  data-toggle="tab"
                  href="#nav-purchased"
                  role="tab"
                  aria-selected="false"
                >
                  Purchased
                </a>
                <a
                  className="nav-item nav-link"
                  id="nav-reviews-tab"
                  data-toggle="tab"
                  href="#nav-reviews"
                  role="tab"
                  aria-selected="false"
                >
                  Discussion
                </a>
                <a
                  className="nav-item nav-link active"
                  id="nav-subscriptions-tab"
                  data-toggle="tab"
                  href="#nav-subscriptions"
                  role="tab"
                  aria-selected="true"
                >
                  Subscriptions
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="_215b17">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="course_tab_content">
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade" id="nav-about" role="tabpanel">
                <div className="_htg451">
                  <div className="_htg452">
                    <h3>About Me</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vestibulum scelerisque nibh sed ligula blandit, quis
                      faucibus lorem pellentesque. Suspendisse pulvinar dictum
                      pellentesque. Vestibulum at sagittis lectus, sit amet
                      aliquam turpis. In quis elit tempus, semper justo vitae,
                      lacinia massa. Etiam sagittis quam quis fermentum lacinia.
                      Curabitur blandit sapien et risus congue viverra. Mauris
                      auctor risus sit amet cursus sollicitudin. Lorem ipsum
                      dolor sit amet, consectetur adipiscing elit. Nulla feugiat
                      sodales massa, in viverra dolor condimentum ut. In
                      imperdiet, justo nec volutpat blandit, tellus justo tempor
                      quam, sed pretium nibh nunc nec mauris. Mauris vel
                      malesuada magna. Quisque iaculis molestie purus, non
                      luctus mauris porta id. Maecenas imperdiet tincidunt
                      mauris vestibulum vulputate. Aenean sollicitudin pretium
                      nibh, et sagittis risus tincidunt ac. Phasellus
                      scelerisque rhoncus massa, ac euismod massa pharetra non.
                      Phasellus dignissim, urna in iaculis varius, turpis libero
                      mollis velit, sit amet euismod arcu mi ac nibh. Praesent
                      tincidunt eros at ligula pellentesque elementum. Fusce
                      condimentum enim a tellus egestas, sit amet rutrum elit
                      gravida. Pellentesque in porta sapien. Fusce tristique
                      maximus ipsum et mollis. Sed at massa ac est dapibus
                      vulputate at eu nibh.
                    </p>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="nav-courses" role="tabpanel">
                <div className="crse_content">
                  <h3>My courses (8)</h3>
                  <div className="_14d25">
                    <div className="row">
                      <div className="col-lg-3 col-md-4">
                        <div className="fcrse_1 mt-30">
                          <a
                            href="course_detail_view.html"
                            className="fcrse_img"
                          >
                            <img src="images/courses/img-1.jpg" alt="" />
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
                                  <i className="uil uil-edit-alt" />
                                  Edit
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
                              Complete Python Bootcamp: Go from zero to hero in
                              Python 3
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
                      <div className="col-lg-3 col-md-4">
                        <div className="fcrse_1 mt-30">
                          <a
                            href="course_detail_view.html"
                            className="fcrse_img"
                          >
                            <img src="images/courses/img-2.jpg" alt="" />
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
                                  <i className="uil uil-edit-alt" />
                                  Edit
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
                                By <a href="#">John Doe</a>
                              </p>
                              <div className="prce142">$5</div>
                              <button className="shrt-cart-btn" title="cart">
                                <i className="uil uil-shopping-cart-alt" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-4">
                        <div className="fcrse_1 mt-30">
                          <a
                            href="course_detail_view.html"
                            className="fcrse_img"
                          >
                            <img src="images/courses/img-20.jpg" alt="" />
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
                                  <i className="uil uil-edit-alt" />
                                  Edit
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
                                By <a href="#">John Doe</a>
                              </p>
                              <div className="prce142">$14</div>
                              <button className="shrt-cart-btn" title="cart">
                                <i className="uil uil-shopping-cart-alt" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-4">
                        <div className="fcrse_1 mt-30">
                          <a
                            href="course_detail_view.html"
                            className="fcrse_img"
                          >
                            <img src="images/courses/img-4.jpg" alt="" />
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
                                  <i className="uil uil-edit-alt" />
                                  Edit
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
                              The Complete Digital Marketing Course - 12 Courses
                              in 1
                            </a>
                            <a href="#" className="crse-cate">
                              Digital Marketing | Marketing
                            </a>
                            <div className="auth1lnkprce">
                              <p className="cr1fot">
                                By <a href="#">John Doe</a>
                              </p>
                              <div className="prce142">$12</div>
                              <button className="shrt-cart-btn" title="cart">
                                <i className="uil uil-shopping-cart-alt" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-4">
                        <div className="fcrse_1 mt-30">
                          <a
                            href="course_detail_view.html"
                            className="fcrse_img"
                          >
                            <img src="images/courses/img-13.jpg" alt="" />
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
                                  <i className="uil uil-edit-alt" />
                                  Edit
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
                      <div className="col-lg-3 col-md-4">
                        <div className="fcrse_1 mt-30">
                          <a
                            href="course_detail_view.html"
                            className="fcrse_img"
                          >
                            <img src="images/courses/img-7.jpg" alt="" />
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
                                  <i className="uil uil-edit-alt" />
                                  Edit
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
                              WordPress for Beginners: Create a Website Step by
                              Step
                            </a>
                            <a href="#" className="crse-cate">
                              Design | Wordpress
                            </a>
                            <div className="auth1lnkprce">
                              <p className="cr1fot">
                                By <a href="#">John Doe</a>
                              </p>
                              <div className="prce142">$18</div>
                              <button className="shrt-cart-btn" title="cart">
                                <i className="uil uil-shopping-cart-alt" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-4">
                        <div className="fcrse_1 mt-30">
                          <a
                            href="course_detail_view.html"
                            className="fcrse_img"
                          >
                            <img src="images/courses/img-8.jpg" alt="" />
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
                                  <i className="uil uil-edit-alt" />
                                  Edit
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
                              CSS - The Complete Guide 2020 (incl. Flexbox, Grid
                              &amp; Sass)
                            </a>
                            <a href="#" className="crse-cate">
                              Design | CSS
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
                      <div className="col-lg-3 col-md-4">
                        <div className="fcrse_1 mt-30">
                          <a
                            href="course_detail_view.html"
                            className="fcrse_img"
                          >
                            <img src="images/courses/img-16.jpg" alt="" />
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
                                  <i className="uil uil-edit-alt" />
                                  Edit
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
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="nav-purchased" role="tabpanel">
                <div className="_htg451">
                  <div className="_htg452">
                    <h3>Purchased Courses</h3>
                    <div className="row">
                      <div className="col-md-9">
                        <div className="fcrse_1 mt-20">
                          <a href="course_detail_view.html" className="hf_img">
                            <img src="images/courses/img-1.jpg" alt="" />
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
                          <div className="hs_content">
                            <div className="eps_dots eps_dots10 more_dropdown">
                              <a href="#">
                                <i className="uil uil-ellipsis-v" />
                              </a>
                              <div className="dropdown-content">
                                <span>
                                  <i className="uil uil-download-alt" />
                                  Download
                                </span>
                                <span>
                                  <i className="uil uil-trash-alt" />
                                  Delete
                                </span>
                              </div>
                            </div>
                            <div className="vdtodt">
                              <span className="vdt14">109k views</span>
                              <span className="vdt14">15 days ago</span>
                            </div>
                            <a
                              href="course_detail_view.html"
                              className="crse14s title900"
                            >
                              Complete Python Bootcamp: Go from zero to hero in
                              Python 3
                            </a>
                            <a href="#" className="crse-cate">
                              Web Development | Python
                            </a>
                            <div className="purchased_badge">Purchased</div>
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
                        <div className="fcrse_1 mt-30">
                          <a href="course_detail_view.html" className="hf_img">
                            <img src="images/courses/img-2.jpg" alt="" />
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
                          <div className="hs_content">
                            <div className="eps_dots eps_dots10 more_dropdown">
                              <a href="#">
                                <i className="uil uil-ellipsis-v" />
                              </a>
                              <div className="dropdown-content">
                                <span>
                                  <i className="uil uil-download-alt" />
                                  Download
                                </span>
                                <span>
                                  <i className="uil uil-trash-alt" />
                                  Delete
                                </span>
                              </div>
                            </div>
                            <div className="vdtodt">
                              <span className="vdt14">5M views</span>
                              <span className="vdt14">15 days ago</span>
                            </div>
                            <a
                              href="course_detail_view.html"
                              className="crse14s title900"
                            >
                              The Complete JavaScript Course 2020: Build Real
                              Projects!
                            </a>
                            <a href="#" className="crse-cate">
                              Development | JavaScript
                            </a>
                            <div className="purchased_badge">Purchased</div>
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
                        <div className="fcrse_1 mt-30">
                          <a href="course_detail_view.html" className="hf_img">
                            <img src="images/courses/img-3.jpg" alt="" />
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
                          <div className="hs_content">
                            <div className="eps_dots eps_dots10 more_dropdown">
                              <a href="#">
                                <i className="uil uil-ellipsis-v" />
                              </a>
                              <div className="dropdown-content">
                                <span>
                                  <i className="uil uil-download-alt" />
                                  Download
                                </span>
                                <span>
                                  <i className="uil uil-trash-alt" />
                                  Delete
                                </span>
                              </div>
                            </div>
                            <div className="vdtodt">
                              <span className="vdt14">1M views</span>
                              <span className="vdt14">18 days ago</span>
                            </div>
                            <a
                              href="course_detail_view.html"
                              className="crse14s title900"
                            >
                              Beginning C++ Programming - From Beginner to
                              Beyond
                            </a>
                            <a href="#" className="crse-cate">
                              Development | C++
                            </a>
                            <div className="purchased_badge">Purchased</div>
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
                        <div className="fcrse_1 mt-30">
                          <a href="course_detail_view.html" className="hf_img">
                            <img src="images/courses/img-4.jpg" alt="" />
                            <div className="course-overlay">
                              <div className="badge_seller">Bestseller</div>
                              <div className="crse_reviews">
                                <i className="uil uil-star" />
                                5.0
                              </div>
                              <span className="play_btn1">
                                <i className="uil uil-play" />
                              </span>
                              <div className="crse_timer">1 hours</div>
                            </div>
                          </a>
                          <div className="hs_content">
                            <div className="eps_dots eps_dots10 more_dropdown">
                              <a href="#">
                                <i className="uil uil-ellipsis-v" />
                              </a>
                              <div className="dropdown-content">
                                <span>
                                  <i className="uil uil-download-alt" />
                                  Download
                                </span>
                                <span>
                                  <i className="uil uil-trash-alt" />
                                  Delete
                                </span>
                              </div>
                            </div>
                            <div className="vdtodt">
                              <span className="vdt14">153k views</span>
                              <span className="vdt14">3 months ago</span>
                            </div>
                            <a
                              href="course_detail_view.html"
                              className="crse14s title900"
                            >
                              The Complete Digital Marketing Course - 12 Courses
                              in 1
                            </a>
                            <a href="#" className="crse-cate">
                              Digital Marketing | Marketing
                            </a>
                            <div className="purchased_badge">Purchased</div>
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
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="nav-reviews" role="tabpanel">
                <div className="student_reviews">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="review_right">
                        <div className="review_right_heading">
                          <h3>Discussions</h3>
                        </div>
                      </div>
                      <div className="cmmnt_1526">
                        <div className="cmnt_group">
                          <div className="img160">
                            <img src="images/hd_dp.jpg" alt="" />
                          </div>
                          <textarea
                            className="_cmnt001"
                            placeholder="Add a public comment"
                            defaultValue={""}
                          />
                        </div>
                        <button className="cmnt-btn" type="submit">
                          Comment
                        </button>
                      </div>
                      <div className="review_all120">
                        <div className="review_item">
                          <div className="review_usr_dt">
                            <img src="images/left-imgs/img-1.jpg" alt="" />
                            <div className="rv1458">
                              <h4 className="tutor_name1">John Doe</h4>
                              <span className="time_145">2 hour ago</span>
                            </div>
                            <div className="eps_dots more_dropdown">
                              <a href="#">
                                <i className="uil uil-ellipsis-v" />
                              </a>
                              <div className="dropdown-content">
                                <span>
                                  <i className="uil uil-comment-alt-edit" />
                                  Edit
                                </span>
                                <span>
                                  <i className="uil uil-trash-alt" />
                                  Delete
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="rvds10">
                            Nam gravida elit a velit rutrum, eget dapibus ex
                            elementum. Interdum et malesuada fames ac ante ipsum
                            primis in faucibus. Fusce lacinia, nunc sit amet
                            tincidunt venenatis.
                          </p>
                          <div className="rpt101">
                            <a href="#" className="report155">
                              <i className="uil uil-thumbs-up" /> 10
                            </a>
                            <a href="#" className="report155">
                              <i className="uil uil-thumbs-down" /> 1
                            </a>
                            <a href="#" className="report155">
                              <i className="uil uil-heart" />
                            </a>
                            <a href="#" className="report155 ml-3">
                              Reply
                            </a>
                          </div>
                        </div>
                        <div className="review_reply">
                          <div className="review_item">
                            <div className="review_usr_dt">
                              <img src="images/left-imgs/img-3.jpg" alt="" />
                              <div className="rv1458">
                                <h4 className="tutor_name1">Rock Doe</h4>
                                <span className="time_145">1 hour ago</span>
                              </div>
                              <div className="eps_dots more_dropdown">
                                <a href="#">
                                  <i className="uil uil-ellipsis-v" />
                                </a>
                                <div className="dropdown-content">
                                  <span>
                                    <i className="uil uil-trash-alt" />
                                    Delete
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="rvds10">
                              Fusce lacinia, nunc sit amet tincidunt venenatis.
                            </p>
                            <div className="rpt101">
                              <a href="#" className="report155">
                                <i className="uil uil-thumbs-up" /> 4
                              </a>
                              <a href="#" className="report155">
                                <i className="uil uil-thumbs-down" /> 2
                              </a>
                              <a href="#" className="report155">
                                <i className="uil uil-heart" />
                              </a>
                              <a href="#" className="report155 ml-3">
                                Reply
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade show active"
                id="nav-subscriptions"
                role="tabpanel"
              >
                <div className="_htg451">
                  <div className="_htg452">
                    <h3>Subscriptions</h3>
                    <div className="row">
                      <div className="col-lg-3 col-md-4">
                        <div className="fcrse_1 mt-30">
                          <div className="tutor_img">
                            <a href="#">
                              <img src="images/left-imgs/img-1.jpg" alt="" />
                            </a>
                          </div>
                          <div className="tutor_content_dt">
                            <div className="tutor150">
                              <a href="#" className="tutor_name">
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
                                <button className="sbbc145">Subscribed</button>
                              </li>
                              <li>
                                <button className="sbbc146">
                                  <i className="uil uil-bell" />
                                </button>
                              </li>
                            </ul>
                            <div className="tut1250">
                              <span className="vdt15">100K Students</span>
                              <span className="vdt15">15 Courses</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-4">
                        <div className="fcrse_1 mt-30">
                          <div className="tutor_img">
                            <a href="#">
                              <img src="images/left-imgs/img-2.jpg" alt="" />
                            </a>
                          </div>
                          <div className="tutor_content_dt">
                            <div className="tutor150">
                              <a href="#" className="tutor_name">
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
                                <button className="sbbc145">Subscribed</button>
                              </li>
                              <li>
                                <button className="sbbc146">
                                  <i className="uil uil-bell" />
                                </button>
                              </li>
                            </ul>
                            <div className="tut1250">
                              <span className="vdt15">14K Students</span>
                              <span className="vdt15">11 Courses</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-4">
                        <div className="fcrse_1 mt-30">
                          <div className="tutor_img">
                            <a href="#">
                              <img src="images/left-imgs/img-3.jpg" alt="" />
                            </a>
                          </div>
                          <div className="tutor_content_dt">
                            <div className="tutor150">
                              <a href="#" className="tutor_name">
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
                                <button className="sbbc145">Subscribed</button>
                              </li>
                              <li>
                                <button className="sbbc146">
                                  <i className="uil uil-bell" />
                                </button>
                              </li>
                            </ul>
                            <div className="tut1250">
                              <span className="vdt15">1M Students</span>
                              <span className="vdt15">25 Courses</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-4">
                        <div className="fcrse_1 mt-30">
                          <div className="tutor_img">
                            <a href="#">
                              <img src="images/left-imgs/img-3.jpg" alt="" />
                            </a>
                          </div>
                          <div className="tutor_content_dt">
                            <div className="tutor150">
                              <a href="#" className="tutor_name">
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
                                <button className="sbbc145">Subscribed</button>
                              </li>
                              <li>
                                <button className="sbbc146">
                                  <i className="uil uil-bell" />
                                </button>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <MainFooter />
</div>


    {/* Body End */}
  </>
  
  );
}
