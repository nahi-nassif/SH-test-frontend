import './App.css';

import RouterConfig from './router/routerConfig';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
          <RouterConfig />
          <Toaster position="top-center" />
    </QueryClientProvider>
  );
}

export default App;
