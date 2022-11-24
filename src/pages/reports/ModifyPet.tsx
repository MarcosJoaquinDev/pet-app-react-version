import React from "react";
import { FormPet } from "components/FormPet";
import { useParams } from "react-router-dom";
import { getPetsData } from "hooks/DataUserAtom";
import { useRecoilValue } from "recoil";
type petProps = {
  id: number;
  name: string;
  location: string;
  description: string;
  url_picture: string;
  lat?: string;
  lng?: string;
  type?: string;
  race?: string;
};
const ModifyPetPage: React.FC = () => {
  const pets = useRecoilValue<petProps[]>(getPetsData);
  let { petId } = useParams();
  console.log("lo que hay en pets:", pets);
  const pet: any = pets ? pets.find((p) => p.id.toString() == petId) : [];

  return (
    <>
      {pets ? (
        <FormPet
          id={petId}
          name={pet?.name}
          race={pet?.race}
          type={pet?.type}
          description={pet?.description}
          location={pet?.location}
          url_picture={pet?.url_picture}
          lat={pet?.lat}
          lng={pet?.lng}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ModifyPetPage;
