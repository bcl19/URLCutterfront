import { RoutesApp } from "@/routes/RoutesApp";
import { LoadingProvider } from "@/hooks/useLoading";

const App = () => {
  return (
    <LoadingProvider>
      <RoutesApp />
    </LoadingProvider>
  );
};

export default App;