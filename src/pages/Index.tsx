import Header from '@/components/Header';
import MapSection from '@/components/MapSection';
import ChatSection from '@/components/ChatSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="h-[calc(100vh-4rem)]">
        <div className="h-full max-w-7xl mx-auto p-4">
          <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Map Section */}
            <div className="h-full min-h-[50vh] lg:min-h-full">
              <MapSection />
            </div>
            
            {/* Chat Section */}
            <div className="h-full min-h-[50vh] lg:min-h-full">
              <ChatSection />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
