import {  Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { publicRouter } from "./router";
import  {createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as ServiceUserProfileApi from './apiServices/userAPI'
import { MyContextSocket } from ".";

export const MyContext = createContext();

function App() {
  const navigate = useNavigate()
  const [dataUser, setDataUser] = useState(null)
  const {socket} = useContext(MyContextSocket)
  const ImageUrlPath = useMemo(() => {
    return 'http://localhost:3001/uploads/'
  },[])
  useEffect(() => {
      const fecthApi = async (token) => {
          const rs = await ServiceUserProfileApi.getProfileUser(token)
          if(rs.error) {
              navigate('/login')
              return
          }
          setDataUser(rs)
      }
      fecthApi(localStorage.getItem('tokenFb'))
  }, [navigate])
  useEffect(() => {
    if(dataUser) {
        socket.emit('login', dataUser._id)
    }
  }, [dataUser, socket])
  return ( 
    
      <div className="App">
        <Routes>
          {
            publicRouter.map((route, index) => {
              const Page = route.component
              const Layout = route.layout
              const ChildrenPage = route.children
              const typePage = route.type
              return (
                <Route key={index}
                      path={route.path}
                      element={
                        Layout ? 
                        <MyContext.Provider value={{typePage, dataUser, ImageUrlPath}}>
                          <Layout>
                            <Page>
                              {ChildrenPage ? <ChildrenPage/> : null}
                            </Page>
                          </Layout> 
                        </MyContext.Provider>
                        : 
                        <MyContext.Provider value={{typePage, dataUser, ImageUrlPath}}>
                          <Page>
                            {ChildrenPage ? <ChildrenPage/> : null}
                          </Page>
                        </MyContext.Provider>
                      }
                />   
              )
            })
            
          }
          {
            dataUser && 
            <Route
              path="*"
              element={<Navigate to="/pageNotFound" replace />} // Navigate to="/" để chuyển hướng, replace để thay thế lịch sử
            />
          }
        </Routes>
      </div>
    
   );
}

export default App;