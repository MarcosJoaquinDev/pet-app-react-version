import React from "react";
import { petsNearMeAtom } from "hooks/PetsNearMe";
import { useRecoilState } from "recoil";
import { PetCard } from "components/pet-card";

type petsNearMeProps = {
  lat: number;
  lng: number;
};
const PetsNearMe: React.FC = (props: petsNearMeProps) => {
  const [pets, setPets] = useRecoilState(petsNearMeAtom);
  const notFindPets = pets.length == 0;
  const sectionStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    justifyContent: "center",
    backgroundColor: "rgb(219 219 219 / 84%)",
  };
  return (
    <>
      <h1 className="title is-2">Mascotas cerca mio</h1>
      {notFindPets ? (
        <h1 className="title is-4">No se encontraron mascotas cerca tuyo</h1>
      ) : (
        <section className="box" style={sectionStyle}>
          {pets.map((p) => {
            return (
              <PetCard
                key={p.id}
                id={p.id}
                name={p.name}
                location={p.location}
                description={p.description}
                url_picture={p.url_picture}
                not_user={true}
                date={p.createdAt}
              />
            );
          })}
        </section>
      )}
    </>
  );
};

export default PetsNearMe;
