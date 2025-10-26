import { Suspense } from "react";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppRouter />
    </Suspense>
  );
}

export default App;
