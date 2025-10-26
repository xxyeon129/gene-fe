import { Suspense } from "react";
import { AppRouter } from "./router/AppRouter";
import "./styles";
import { GlobalStyle } from "./styles";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GlobalStyle />
      <AppRouter />
    </Suspense>
  );
}

export default App;
