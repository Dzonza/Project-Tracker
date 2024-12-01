import './App.scss';
import Sidebar from '/src/components/Sidebar/Sidebar';
import MainEdit from '/src/components/MainEdit/MainEdit';
function App() {
  return (
    <>
      <main>
        <Sidebar />
        <MainEdit />
      </main>
    </>
  );
}

export default App;
