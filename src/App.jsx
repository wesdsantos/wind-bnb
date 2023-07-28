import CardSection from "../components/CardsSection/CardSection";
import Footer from "../components/Footer/Footer";
import Menu from "../components/Menu/Menu";
import Nav from "../components/Nav/Nav";
import Stays from "../components/Stays/Stays";
import "./index.css";
import stays from "../stays.json";

import { useState } from "react";
import NotFount from "../components/NotFound";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [city, setCity] = useState("Whole");

  const [adultGuests, setAdultGuests] = useState(0);
  const [childrenGuests, setChildrenGuests] = useState(0);
  const [filteredStays, setFilteredStays] = useState(stays);

  const handleOpenClose = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchButton = () => {
    if (city === "Whole") {
      return 0;
    }
    const filterLocation = stays.filter((stay) => stay.city.includes(city));
    const filterGuests = filterLocation.filter(
      (stay) => stay.maxGuests >= adultGuests + childrenGuests
    );
    if (filterGuests) {
      setFilteredStays(filterGuests);
    } else {
      setFilteredStays([]);
    }
    handleOpenClose();
  };

  const handlePlusButton = (param) => {
    if (param === "Adult") {
      setAdultGuests((prevAdultGuests) => prevAdultGuests + 1);
    } else if (param === "Children") {
      setChildrenGuests((prevChildrenGuests) => prevChildrenGuests + 1);
    }
  };

  const handleMinusButton = (param) => {
    if (param === "Adult") {
      setAdultGuests((prevAdultGuests) =>
        prevAdultGuests > 0 ? prevAdultGuests - 1 : 0
      );
    } else if (param === "Children") {
      setChildrenGuests((prevChildrenGuests) =>
        prevChildrenGuests > 0 ? prevChildrenGuests - 1 : 0
      );
    }
  };

  const guests = adultGuests + childrenGuests;

  return (
    <div className="app-container">
      <Menu
        menuOpen={menuOpen}
        handleOpenClose={handleOpenClose}
        childrenGuests={childrenGuests}
        adultGuests={adultGuests}
        handlePlusButton={handlePlusButton}
        handleMinusButton={handleMinusButton}
        city={city}
        setCity={setCity}
        handleSearchButton={handleSearchButton}
        guests={guests}
      />

      <div className="container ">
        <Nav handleOpenClose={handleOpenClose} city={city} guests={guests} />
        <Stays stays={filteredStays} />
        <CardSection stays={filteredStays} />
        {filteredStays.length === 0 ? <NotFount /> : " "}
        <Footer />
      </div>
    </div>
  );
}

export default App;
