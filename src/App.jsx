import './App.scss';
import Sidebar from '/src/components/Sidebar/Sidebar';
import MainEdit from '/src/components/MainEdit/MainEdit';
import bgImage from '/src/assets/bg-image.jpg';
function App() {
  return (
    <>
      <main>
        <img src={bgImage} alt="background image" className="bg-image" />
        <Sidebar />
        <MainEdit />
      </main>
    </>
  );
}

export default App;
