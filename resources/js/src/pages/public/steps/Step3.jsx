import React from "react";
import LeadText from "@material-tailwind/react/LeadText";

export const Step3 = () => {
    return (
        <div className="h-auto flex flex-col shadow-md items-center px-10 ">
            <label className="lg:text-2xl font-semibold mb-5 text-yellow-400">
                {" "}
                Toutes Nos Remerciements
            </label>
            <LeadText color="gray">
                Nous vous remercions d’avoir effectuer vos achats sur
                Transfo-Vente. Nous vous espérons des nôtres très prochainement
                afin de profiter au max de nos nouvelles offres et arrivages
                exceptionnels ! A très bientôt...
            </LeadText>
        </div>
    );
};
