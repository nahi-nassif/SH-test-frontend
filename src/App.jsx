import './App.css';

import RouterConfig from './router/routerConfig';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
          <RouterConfig />
    </QueryClientProvider>
  );
}

export default App;
