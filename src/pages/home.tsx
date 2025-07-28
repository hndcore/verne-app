import Header from "@/components/Header";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background" data-testid="home-page">
      <Header />
      <main className="container mx-auto px-6 py-8" data-testid="home-main">
        <h1>Already building</h1>
      </main>
    </div>
  );
};

export default Home;
