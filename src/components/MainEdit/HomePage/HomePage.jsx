import './homePage.scss';
import notepad from '/src/assets/notepad.png';
const Home = () => {
  return (
    <section className="home-container">
      <img
        src={notepad}
        alt="image of notepad"
        className="home-container__img"
      />
      <article className="home-container__text-container">
        <h1 className="home-container__title">Welcome to project tracker</h1>
        <p className="home-container__about">
          Keep your tasks organized, track your project progress, and achieve
          your goals efficiently. Lets make productivity effortless!
        </p>
      </article>
    </section>
  );
};

export default Home;
