import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutMe from './components/AboutMe';
import Menu from './components/Menu';
import Meals from './components/Meals';
import FavouriteMeals from './components/FavouriteMeals';
import MealGenerator from './components/MealGenerator';
import { FavouritesProvider } from './context/FavouritesContext';
import './styles/GlobalStyles.scss';

const App = () => (
  <FavouritesProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/meals/:category" element={<Meals />} />
        <Route path="/favourites" element={<FavouriteMeals />} />
        <Route path="/random-meal" element={<MealGenerator />} />
      </Routes>
    </Router>
  </FavouritesProvider>
);

export default App;
