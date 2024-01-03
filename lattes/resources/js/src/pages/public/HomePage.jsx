import React, { Component } from "react";
import { Navigation } from "./home/Navigation";
import Features from "./home/Features";
import { ViewType } from "./home/ViewType";
import { Features1 } from "./home/Features1";
import SpecialItems from "./home/SpecialItems";
import {
    LazyLoadImage,
    LazyLoadComponent,
} from "react-lazy-load-image-component";

export const HomePage = () => {
    return (
        <LazyLoadComponent>
            <div className="bg-white z-0 relative ">
                <Navigation />
                <Features />
                <div className="z-0">
                    <ViewType />
                    <Features1 />
                </div>

                <SpecialItems />
            </div>
        </LazyLoadComponent>
    );
};
