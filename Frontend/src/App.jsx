import BooksProvider from "./context/BooksContext";
import MembersProvider from "./context/MembersContext";
import AppRoutes from "./routes/AppRoutes";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <BooksProvider>
      <MembersProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </MembersProvider>
    </BooksProvider>
  );
}

export default App;