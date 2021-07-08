import React, { useEffect, useState } from "react";
import "./Settings.css";
import Header from "./Header";
import InfoIcon from "@material-ui/icons/Info";
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import FindReplaceIcon from '@material-ui/icons/FindReplace';
import { useStateValue } from "./StateProvider";
import { Button } from "@material-ui/core";
import axios from "axios"
import "./Search.css";
import Post from "./Post";

function Search() {
  const [image, setImage] = useState("");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    console.log("fetchData Function!")
    
  }

  const handleChange = (e) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      localStorage.setItem("file", reader.result);
    });
    
    setImage(reader.readAsDataURL(e.target.files[0]));
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      console.log("Image: ", image);
    }
    console.log("Image: ", image);
  };



  const handleSubmit = (e) => {
    var bodyFormData = new FormData();
    bodyFormData.append('file', image);
     axios({
      method: "POST",
      url: "http://192.168.1.6:8080/api/recognize/image/",
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        //   console.log(response.data)
          var pids = response.data.pids;
          pids.forEach(e => {
              console.log(e);
              axios({
                method: "get",
                url: `http://localhost:3000/posts/${e}`
              })
              .then((response) => {
                console.log(response);
                setPosts([...response.data])
                
              })
              .catch(function (error) {
                // handle error
                console.log(error);
              });
          
          });
        //   console.log(pids)
          alert("Image Recognize sucssfully");
      })
      .catch(function (error, response) {
        console.log(error.message);
        console.log(error.response);
        alert(response.message);
      });
      e.preventDefault();
    //   alert(response.message);
  };

  const Search = () => {
    axios({
        method: "get",
        url: `http://localhost:3000/posts/"60e29487c3c00102b0e5bf06"`
      })
      .then((response) => {
        console.log(response);
        fetchData();
        
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });  
  }

  

  return ( 
    <>
      <Header />
      <div className="setting">
        <div className="setting-left">
          <div className="option">
            <FindReplaceIcon />
            <h3>Searching For Person</h3>
          </div>
        </div>

        <div className="setting-right">
          <div className="setting-right-row">
            <label className="username">Select image to Search</label>
            <input type="file" onChange={handleChange} />
            <Button onClick={(handleSubmit)}type="submit" >Sumbit</Button>
            <br></br>
            <Button onClick={(Search)}type="Search" >Search</Button>
          </div>
          <div>
          {posts.map((post) => (
        <Post
          key={'post.data._id'}
          userName={post.data.owner}
          profilePic={post.data.image}
          message={post.data.description}
          timeStamp={post.data.createdAt}
          image={post.data.image}
        />
      ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
