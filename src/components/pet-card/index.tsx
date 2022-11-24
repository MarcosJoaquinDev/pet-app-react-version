import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { FormInformation } from "components/FormInfo";
type petProps = {
  id: number;
  name: string;
  location: string;
  description: string;
  url_picture: string;
  not_user?: boolean;
  date: string;
};

const PetCard: React.FC = (pet: petProps) => {
  const navigate = useNavigate();
  const [form, setForm] = useState(false);
  const handleInformation = (e) => {
    e.preventDefault();
    setForm(true);
  };
  const handleChange = (e) => {
    e.preventDefault();
    navigate("/report/modify/" + pet.id);
  };
  let date = new Date(pet.date);
  const petDate = date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="card"
      style={{ maxWidth: "400px", backgroundColor: "rgb(54 54 54 / 13%)" }}
    >
      <div>
        <figure className="card-image">
          <img
            className="image is-4by2"
            style={{ objectFit: "cover" }}
            src={pet.url_picture}
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src={pet.url_picture} alt="Placeholder image" />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">{pet.name}</p>
            <p className="subtitle is-6">{pet.location}</p>
          </div>
        </div>

        <div className="content">
          <p>{pet.description}</p>
          <br />
          <footer>{petDate}</footer>
          <div>
            {pet.not_user ? (
              <a href="" onClick={handleInformation}>
                Notificar al dueño
              </a>
            ) : (
              <a href="" onClick={handleChange}>
                Reportar cambios
              </a>
            )}
            {form ? (
              <FormInformation
                handle={setForm}
                petId={pet.id}
                petName={pet.name}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export { PetCard };
