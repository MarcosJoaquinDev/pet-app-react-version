import React from "react";
import { petsNearMeAtom } from "hooks/PetsNearMe";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router";
const URL_API = "https://app-pet.onrender.com";

const petsNearMe = async (lat, lng) => {
  const resp = await fetch(`${URL_API}/pets?lat=${lat}&lng=${lng}`, {
    method: "GET",
  });
  const pets = await resp.json();
  return pets;
};

const HomePage: React.FC = () => {
  const [pets, setPets] = useRecoilState(petsNearMeAtom);
  const navigate = useNavigate();

  const handleLatLng = () => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    function success(pos) {
      var crd = pos.coords;
      petsNearMe(crd.latitude, crd.longitude).then((r) => {
        const resultPets = r;
        if (resultPets.response) {
          setPets(resultPets.response);
          navigate("/search");
        } else {
          setPets([]);
          navigate("/search");
        }
      });
    }
    function error(err) {
      console.warn("ERROR(" + err.code + "): " + err.message);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
    <main
      style={{
        width: "100%",
        height: "60vh",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 className="title is-1">Mascotas perdidas cerca tuyo</h1>
      <div
        className="box"
        style={{
          width: "600px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3
          className="title is-5"
          style={{ textAlign: "center", fontWeight: "500" }}
        >
          Para ver las mascotas reportadas cerca tuyo necesitamos permiso para
          conocer tu ubicación.
        </h3>
        <button
          onClick={handleLatLng}
          className="button is-large is-link"
          style={{ width: "100%" }}
        >
          Dar mi ubicacion
        </button>
      </div>
    </main>
  );
};

export default HomePage;
