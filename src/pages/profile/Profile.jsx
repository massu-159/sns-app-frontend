import React, { useEffect, useState } from 'react'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import TimeLine from '../../components/timeline/TimeLine'
import Topbar from '../../components/topbar/Topbar'
import "./Profile.css";
import axios from "axios";
import { useParams } from 'react-router-dom'

export default function Profile() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => { 
    const fetchUser = async () => {
      const response = await axios.get(`/users?username=${username}`);
      setUser(response.data);
    }
    fetchUser();
  }, []);

  return (
    <>
      <Topbar></Topbar>
      <div className="profile">
        <Sidebar></Sidebar>
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img src={user.coverPicture || PUBLIC_FOLDER + "/post/3.jpeg"} alt="" className="profileCoverImg" />
              <img src={user.profilePicture
                ? `${PUBLIC_FOLDER}${user.profilePicture}`
                : `${PUBLIC_FOLDER}/person/noIconImage.png`}
                alt="" className="profileUserImg" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{ user.username }</h4>
              <span className="profileInfoDesc">{ user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <TimeLine username={ username }></TimeLine>
            <Rightbar user={user}></Rightbar>
          </div>
        </div>
      </div>
    </>
  )
}
