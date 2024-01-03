import React from "react";
import StarRating from "react-svg-star-rating";

export const Rating = ({ value }) => {
    return (
        <StarRating
            initialRating={value}
            size={15}
            count={5}
            containerClassName="flex"
            isReadOnly={true}
        />
    );
};
