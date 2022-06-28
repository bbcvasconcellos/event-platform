import { Routes, Route, Navigate } from "react-router-dom"
import { Event } from "../pages/Event"
import { Login } from "../pages/Login"

export const Router = () => {
  return(
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/event" element={<Event />}/>
      <Route path="/event/lesson/:slug" element={<Event />}/>
      <Route path="*" element={<Navigate to="/"/>} />
    </Routes>
  )
}