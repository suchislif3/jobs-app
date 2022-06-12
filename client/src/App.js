import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/Global.styles";
import { MainContainer } from "./styles/App.styles";

import Navbar from "./components/Navbar";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import { Auth, Dashboard, Edit, Home, NotFound } from "./pages";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <MainContainer>
          <Navbar />
          <Routes>
            <Route element={<PublicRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
            </Route>
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/edit/:id" element={<Edit />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainContainer>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
