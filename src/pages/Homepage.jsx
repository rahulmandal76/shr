import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import Hero from "../components/Hero/Hero";
import MainEvents from "../components/MainEvents/MainEvents";
import SingleEventPage from "../components/SingleEventPage/SingleEventPage";
import OrganizerCards from "../components/OrganizerCards/OrganizerCards";
import ReactGA from "react-ga";

const Homepage = () => {
  const { eventId } = useParams();

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <>
      <Hero />
      <About />
      <div id="events">
        <MainEvents />
      </div>
      <Contact />
      <OrganizerCards />
      {eventId && <SingleEventPage />}
    </>
  );
};

export default Homepage;
