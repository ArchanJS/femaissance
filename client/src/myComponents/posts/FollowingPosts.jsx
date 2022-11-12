import React, { useState } from 'react';
import axios from 'axios';
import './postTag.css';
import Loader from '../loader/Loader';
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AOS from 'aos';
import "aos/dist/aos.css";
import { makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useStyle = makeStyles(theme => ({
  marg: {
    paddingTop: 80,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 150,
    [theme.breakpoints.between('1000', '1300')]: {
      marginLeft: 30,
      marginRight: 30,
    },
    [theme.breakpoints.between('200', '1000')]: {
      marginLeft: 10,
      marginRight: 10,
    },
  },
  num: {
    marginLeft: -180,
    [theme.breakpoints.between('1000', '1300')]: {
      marginLeft: 30,
      // marginRight:30,
    },
    [theme.breakpoints.between('200', '1000')]: {
      marginLeft: 10,
      // marginRight:10,
    },
  }
}));

export default function App() {
  const classes = useStyle();

  const navigate = useNavigate();

  const [lt, setLt] = useState(6);
  const [sk, setSk] = useState(0);
  const [size, setSize] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState(["61b0603d073dc071c7731f29", "61b06052073dc071c7731f2b", "61b06060073dc071c7731f2d", "61b06071073dc071c7731f2f", "61b06083073dc071c7731f31", "61b5f4146938c4162cb2d2f2"]);

  // useEffect(()=>{
  //   console.log(categories);
  //   const config={
  //     headers:{
  //       "Content-Type":"application/json",
  //       Authorization:`Bearer ${localStorage.getItem("fmToken")}`
  //     }
  //   }
  //   setLoading(true);
  //   console.log("JD");
  //   axios.post("https://femaissance.herokuapp.com/api/posts/followingposts",config).then((data)=>{
  //     setPosts(data.data.posts);
  //     setSize(data.data.size);
  //     setLoading(false);
  //     console.log(data.data.size);
  //   }).catch((err)=>{
  //     console.log(err);
  //     setLoading(false);
  //   });
  // },[categories])

  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    if(!localStorage.getItem("fmToken")){
      navigate("/login");
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("fmToken")}`
      }
    }
    axios.get('https://femaissance.herokuapp.com/api/user/getuser', config).then((data) => {
      setCurrentUserId(data.data._id);
      console.log(data.data._id);
      setLoading(true);
      console.log("JD");
      axios.post("https://femaissance.herokuapp.com/api/posts/followingposts", { following: data.data.following }, config).then((data) => {
        setPosts(data.data);
        setSize(data.data.size);
        setLoading(false);
        console.log(data.data.size);
      }).catch((err) => {
        console.log(err);
        setLoading(false);
      });
    }).catch((error) => console.log(error))
  }, [categories])

  useEffect(() => {
    AOS.init({
      duration : 1000
    });
    }, []);


  //   const showAllBlogs = () => {
  //     return blogs.map((blog, i) => {
  //         // ()
  //         return (
  //             <article key={i}>
  //                 <Card blog={blog} />
  //                 <hr />
  //             </article>
  //         );
  //     });
  // };

  function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      if (elapsed / 1000 < 30) return "Just now";

      return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
      return Math.round(elapsed / msPerYear) + ' years ago';
    }
  }

  const appendOrRemoveEle = (id) => {
    if (categories.includes(id)) setCategories(categories.filter(ele => ele !== id));
    else setCategories([...categories, id]);
  }

  const [cls1, setCls1] = useState("inactiveTag");
  const [cls2, setCls2] = useState("inactiveTag");
  const [cls3, setCls3] = useState("inactiveTag");
  const [cls4, setCls4] = useState("inactiveTag");
  const [cls5, setCls5] = useState("inactiveTag");
  const [cls6, setCls6] = useState("inactiveTag");


  // const loadMore = async() => {
  //   try {
  //     let toSkip = sk + lt;
  // listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
  //     if (data.error) {
  //         console.log(data.error);
  //     } else {
  //         setLoadedBlogs([...loadedBlogs, ...data.blogs]);
  //         setSize(data.size);
  //         setSkip(toSkip);
  //     }
  // });
  //         const config={
  //           headers:{
  //             "Content-Type":"application/json",
  //             Authorization:`Bearer ${localStorage.getItem("fmToken")}`
  //           }
  //         }
  //         const categories=["61b06052073dc071c7731f2b","61b0603d073dc071c7731f29"];
  //         console.log("JD");
  //       const {data}=await axios.post("https://femaissance.herokuapp.com/api/posts/allwithcategories",{lt,sk:toSkip,categories},config);
  //         setLoadedPosts([...loadedPosts,data.posts]);
  //       console.log(data.posts);
  //         setSize(data.size);
  //         setSk(toSkip);
  //         // console.log(data.posts);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const loadMoreButton = () => {
  //   return (
  //        (
  //           <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
  //               Load more
  //           </button>
  //       )
  //   );
  // };

  const likePost = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("fmToken")}`
        }
      }
      await axios.post('https://femaissance.herokuapp.com/api/posts/like', { postid: id }, config);
      setLoading(true);
      axios.get('https://femaissance.herokuapp.com/api/user/getuser', config).then((data) => {
        setCurrentUserId(data.data._id);
        console.log(data.data._id);
        setLoading(true);
        console.log("JD");
        axios.post("https://femaissance.herokuapp.com/api/posts/followingposts", { following: data.data.following }, config).then((data) => {
          setPosts(data.data);
          setSize(data.data.size);
          setLoading(false);
          console.log(data.data.size);
        }).catch((err) => {
          console.log(err);
          setLoading(false);
        });
      }).catch((error) => console.log(error))
    } catch (error) {
      console.log(error);
    }
  }

  return (

    <div style={{minHeight:'90vh',
      backgroundColor: 'white',
      backgroundImage: 'url("https://www.transparenttextures.com/patterns/brick-wall-dark.png")',}}>
    <div className={classes.marg}>
      <h1 className='heading' style={{color:'#125D98'}}>Pregnancy Journal Space</h1>

      <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
        {
          posts.length > 0
            ?
            posts.map((post, ind) => {
              return <>
                <MDBCol key={ind} data-aos={"flip-right"}>
                  <MDBCard style={{height:'450px'}}>
                    {
                      post.photo
                        ?
                        <>
                          <MDBCardImage
                            src={post.photo}
                            alt='...'
                            position='top'
                            style={{height:'250px', minHeight:'250px'}}
                          />
                        </>
                        :
                        null
                    }

                    <MDBCardBody>
                      <MDBCardTitle>{post.title}</MDBCardTitle>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {/* <MDBCardText>
                          {post.excerpt}
                        </MDBCardText> */}
                        <MDBCardText>
                        <small className='text-muted'>Posted {timeDifference(new Date(), new Date(post.createdAt))}</small>
                        <br />
                        <small className='text-muted'>Posted by {post.postedBy.username}</small>
                      </MDBCardText>
                        <img style={{ width: 80, height: 80 }}
                          src={post.postedBy.photo}
                          class="img-fluid rounded-circle"
                          alt=""
                          onClick={() => {
                            navigate(`/dashboard/${post.postedBy._id}`);
                          }}
                        />
                      </div>
                      <MDBCardBody>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <ThumbUpIcon onClick={async () => {
                            likePost(post._id);
                          }} style={{cursor:"pointer"}} />
                          <p className={classes.num}>{post.likes.length}</p>
                          <MDBBtn
                            onClick={
                              () => navigate(`/postcomments/${post._id}`)
                            }
                          >Read More</MDBBtn>
                        </div>
                      </MDBCardBody>

                      
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </>
            })
            :
            (loading ? <Loader /> : <h2>No post to show!</h2>)
        }
     
      </MDBRow>
      {
        // <Button variant="contained" style={{margin: '0 auto',display: "flex",marginTop: '20px'}} onClick={loadMore}>Load More</Button>
      }

    </div>
    </div>
  );
}