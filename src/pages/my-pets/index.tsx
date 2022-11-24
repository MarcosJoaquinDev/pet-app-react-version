import React from "react";
import { getPetsData } from "hooks/DataUserAtom";
import { useRecoilValue } from "recoil";
import { PetCard } from "components/pet-card";
type petProps = {
  id: number;
  name: string;
  location: string;
  description: string;
  url_picture: string;
  createdAt?: string;
};
const MyPetsPage: React.FC = () => {
  const pets = useRecoilValue<petProps[]>(getPetsData);
  const sectionStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    justifyContent: "center",
    backgroundColor: "rgb(219 219 219 / 84%)",
  };
  const emptyPets = pets.length == 0;
  return (
    <>
      {emptyPets ? (
        <h1 className="title is-3">
          No se encuentra ninguna mascota reportada
        </h1>
      ) : (
        <section className="box" style={sectionStyle}>
          {pets.map((p) => {
            return (
              <PetCard
                key={p.id}
                id={p.id}
                name={p.name}
                location={p.location}
                url_picture={p.url_picture}
                description={p.description}
                date={p.createdAt}
              />
            );
          })}
        </section>
      )}
    </>
  );
};

export default MyPetsPage;
