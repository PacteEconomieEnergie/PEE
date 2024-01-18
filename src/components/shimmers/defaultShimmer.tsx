import React from 'react';

interface ShimmerProps {
    className?: string,

}
export const DefaultShimmer: React.FC<ShimmerProps> = ({className = ""}) => {


    return (
        <>
            <div className={`shimmer-card ${className}`}>
    <div className="space-y-5 not-table">
    <div className="h-3 w-2/5 rounded-lg bg-rose-100/20"></div>
        <div className="h-36 rounded-lg bg-rose-100/10"></div>
        <div className="space-y-3">
    <div className="h-3 w-3/5 rounded-lg bg-rose-100/10"></div>
        <div className="h-3 w-4/5 rounded-lg bg-rose-100/20"></div>
        <div className="h-3 w-4/5 rounded-lg bg-rose-100/20"></div>
        <div className="h-3 w-4/5 rounded-lg bg-rose-100/10"></div>
        <div className="h-3 w-4/5 rounded-lg bg-rose-100/20"></div>
        <div className="h-3 w-2/5 rounded-lg bg-rose-100/20"></div>
        </div>
        </div>
        <div className={`grid grid-cols-4 gap-4 is-table `} >
    <div className="h-8  rounded-lg bg-rose-100/10 col-span-4"></div>


        <div className="h-4  rounded-lg bg-rose-100/10"></div>
        <div className="h-4  rounded-lg bg-rose-100/20"></div>
        <div className="h-4  rounded-lg bg-rose-100/10"></div>
        <div className="h-4  rounded-lg bg-rose-100/20"></div>

        <div className="h-4  rounded-lg bg-rose-100/20"></div>
        <div className="h-4  rounded-lg bg-rose-100/10"></div>
        <div className="h-4  rounded-lg bg-rose-100/20"></div>
        <div className="h-4  rounded-lg bg-rose-100/10"></div>

        <div className="h-4  rounded-lg bg-rose-100/10"></div>
        <div className="h-4  rounded-lg bg-rose-100/20"></div>
        <div className="h-4  rounded-lg bg-rose-100/10"></div>
        <div className="h-4  rounded-lg bg-rose-100/20"></div>

        <div className="h-4  rounded-lg bg-rose-100/20"></div>
        <div className="h-4  rounded-lg bg-rose-100/10"></div>
        <div className="h-4  rounded-lg bg-rose-100/20"></div>
        <div className="h-4  rounded-lg bg-rose-100/10"></div>


        </div>

        </div>
        </>
    )
}
