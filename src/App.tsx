import { BrowserRouter, Routes, Route } from "react-router"
import Layout from "@/components/Layout"
import HomePage from "@/pages/HomePage"
import TypographyPage from "@/pages/TypographyPage"
import ButtonsPage from "@/pages/ButtonsPage"
import FormsPage from "@/pages/FormsPage"
import CardsPage from "@/pages/CardsPage"
import DialogsPage from "@/pages/DialogsPage"
import FeedbackPage from "@/pages/FeedbackPage"
import NavigationPage from "@/pages/NavigationPage"
import DataPage from "@/pages/DataPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout wraps all pages — Outlet renders the matched child */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/typography" element={<TypographyPage />} />
          <Route path="/buttons" element={<ButtonsPage />} />
          <Route path="/forms" element={<FormsPage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/dialogs" element={<DialogsPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/navigation" element={<NavigationPage />} />
          <Route path="/data" element={<DataPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
