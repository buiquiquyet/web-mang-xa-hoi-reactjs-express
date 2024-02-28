import LoginUser from "../LoginUser"
import FriendPage from "../Page/User/UserPage/FriendPage"
import Main from "../Page/User/Main" 
import UserPage from "../Page/User/UserPage"
import PostUserPage from "../Page/User/UserPage/PostUserPage"
import DefaultLayout from "../component/Layout/DefaultLayout"
import DefaultLayoutWithHeader from "../component/Layout/DefaultLayoutWithHeader"
import ImagePage from "../Page/User/UserPage/ImagePage"
import VideoPage from "../Page/User/UserPage/VideoPage"
import PageNotFound from "../PageNotFound"
const publicRouter = [
    {path: '/', component: Main, layout: DefaultLayout, type: 'homeUser'},
    {path: '/login', component: LoginUser, type: 'homeUser'},
    {path: '/userPost', children: PostUserPage, component: UserPage, layout: DefaultLayoutWithHeader, type: 'userPost'},
    {path: '/userFriend', children: FriendPage, component: UserPage, layout: DefaultLayoutWithHeader, type: 'userFriend'},
    {path: '/userImage', children: ImagePage, component: UserPage, layout: DefaultLayoutWithHeader, type: 'userImage'},
    {path: '/userVideo', children: VideoPage, component: UserPage, layout: DefaultLayoutWithHeader, type: 'userVideo'},
    {path: '/pageNotFound',  component: PageNotFound, type: 'pageNotFound'},

 

]


export  { publicRouter }