import { createBrowserRouter } from "react-router";
import { AddHabit } from "./pages/AddHabit";
import { HabitList } from "./pages/HabitList";
import { Settings } from "./pages/Settings";
import { HabitDetail } from "./pages/HabitDetail";
import { ErrorPage } from "./pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HabitList,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/add",
    Component: AddHabit,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/settings",
    Component: Settings,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/habit/:id",
    Component: HabitDetail,
    ErrorBoundary: ErrorPage,
  },
  // 他の画面は後で追加
  // {
  //   path: "/habit/:id/settings",
  //   Component: HabitSettings,
  // },
  // {
  //   path: "/habit/:id/edit",
  //   Component: EditHabit,
  // },
]);