import { Suspense } from "react";
import { ThemeProvider } from "styled-components";
// app layers
import { AppRouter } from "./router/AppRouter";
import "./styles";
import { GlobalStyle } from "./styles";
// shared layers
import { theme } from "@/shared";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
