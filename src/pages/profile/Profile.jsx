import "./profile.css";
import { Edit } from "@material-ui/icons";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const username = useParams().username;
  


  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  const handleUploadClick = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    const fileName = Date.now() + file.name;
    formData.append("name", fileName);
    formData.append("profilePicture", file);
    console.log(file.path)
    try {
      console.log('Route start')
      await axios.put(`/users/${user._id}/profilePicture`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log('Reached upload handler')
      window.location.reload();
    } catch (err) {
      console.log('Frontend error')
      console.log(err);
    }
  };

  const handleUploadClick1 = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    const fileName = Date.now() + file.name;
    formData.append("name", fileName);
    formData.append("coverPicture", file);
    console.log(file.path)
    try {
      console.log('Route start')
      await axios.put(`/users/${user._id}/coverPicture`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log('Reached upload handler')
      window.location.reload();
    } catch (err) {
      console.log('Frontend error')
      console.log(err);
    }
  };
  
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "noAvatar.png"
                }
                alt=""
              />
              {user.username == currentUser.username && ( <span>
              <label htmlFor="fileInput1">
                {/* <i className="profileUserIcon far fa-user-circle"></i> */}
                <Edit />Cover Picture
              </label>
              <input
                id="fileInput1"
                type="file"
                style={{ display: "none" }}
                onChange={handleUploadClick1}
              />
              </span>
              )}
             {user.username == currentUser.username && ( <span style={{marginLeft:"47%"}}>
              <label htmlFor="fileInput">
                {/* <i className="profileUserIcon far fa-user-circle"></i> */}
                <Edit />
                Profile Picture
              </label>
              <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                onChange={handleUploadClick}
              />
              </span>
              )}
              
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}