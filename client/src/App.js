import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { AxiosInterceptor } from "./api/AxiosInterceptor";

import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/Global.styles";
import { MainContainer } from "./styles/App.styles";

import Navbar from "./components/Navbar";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { Auth, Dashboard, Edit, Home, NotFound } from "./pages";
import { useGlobalContext } from "./context/appContext";

const App = () => {
  const { user } = useGlobalContext();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <AxiosInterceptor>
          <MainContainer>
            <Navbar />
            <Routes>
              <Route
                element={
                  <ProtectedRoutes isAllowed={!user} redirect="/dashboard" />
                }
              >
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
              </Route>
              <Route
                element={<ProtectedRoutes isAllowed={user} redirect="/auth" />}
              >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/edit/:id" element={<Edit />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainContainer>
        </AxiosInterceptor>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
