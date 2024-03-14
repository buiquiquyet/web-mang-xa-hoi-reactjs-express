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
import UserFriend from "../Page/User/UserFriend"
import IntroducePage from "../Page/User/UserPage/IntroducePage"
import UserSearch from "../Page/User/UserSearch"
import UserFeed from "../Page/User/UserFeed"
import UserViewFeed from "../Page/User/UserViewFeed"
const publicRouter = [
    {path: '/', component: Main, layout: DefaultLayout, type: 'homeUser'},
    {path: '/login', component: LoginUser, type: 'homeUser'},
    {path: '/friendPage',  component: UserFriend, layout: DefaultLayoutWithHeader, type: 'friendPage'},
    {path: '/feedPage',  component: UserFeed, layout: DefaultLayoutWithHeader, type: 'feedPage'},
    {path: '/viewFeedPage/:idFeed',  component: UserViewFeed, layout: DefaultLayoutWithHeader, type: 'viewFeedPage'},
    {path: '/searchPage/:nameUser',  component: UserSearch, layout: DefaultLayoutWithHeader, type: 'searchPage'},
    {path: '/userPost/:userId', children: PostUserPage, component: UserPage, layout: DefaultLayoutWithHeader, type: 'userPost'},
    {path: '/userFriend/:userId', children: FriendPage, component: UserPage, layout: DefaultLayoutWithHeader, type: 'userFriend'},
    {path: '/userIntroduce/:userId', children: IntroducePage, component: UserPage, layout: DefaultLayoutWithHeader, type: 'userIntroduce'},
    {path: '/userImage/:userId', children: ImagePage, component: UserPage, layout: DefaultLayoutWithHeader, type: 'userImage'},
    {path: '/userVideo', children: VideoPage, component: UserPage, layout: DefaultLayoutWithHeader, type: 'userVideo'},
    {path: '/pageNotFound',  component: PageNotFound, type: 'pageNotFound'},

 

]


export  { publicRouter }