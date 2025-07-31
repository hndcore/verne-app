import BookTable from "@/features/books/components/BookTable";
import Header from "@/components/Header";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background" data-testid="home-page">
      <Header />
      <main className="container mx-auto px-6 py-8" data-testid="home-main">
        <BookTable />
      </main>
    </div>
  );
};

export default Home;
