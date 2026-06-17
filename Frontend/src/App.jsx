import BooksProvider from "./context/BooksContext";
import MembersProvider from "./context/MembersContext";
import AppRoutes from "./routes/AppRoutes";
import Layout from "./components/Layout/Layout";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
<AuthProvider>
  <BooksProvider>
    <MembersProvider>
      <AppRoutes />
    </MembersProvider>
  </BooksProvider>
</AuthProvider>
  );
}

export default App;