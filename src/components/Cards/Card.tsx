import React from "react";
import {DefaultShimmer} from "../shimmers/defaultShimmer";

interface CardProps {
    className?: string,
    children: React.ReactNode;
    isLoading?: boolean;
}

export const Card: React.FC<CardProps> = ({className = "", children, isLoading = false}) => {
    return (
        <>
            {isLoading && (<DefaultShimmer className={className} />)}

            {!isLoading && (<>
                <div className={`card  shadow-lg ${className} `}>
                    {children}
                </div>
            </>)}


        </>
    );
};
