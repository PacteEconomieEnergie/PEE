import React, { CSSProperties } from "react";
import AnalyticSummaryCard from "./Components/AnalyticsSummaryCard";
import MyChart from "../../components/Charts/ChartDoughnut";
import ChartBar from "../../components/Charts/ChartBar";
import ClientStudyChart from "../../components/Charts/ChartLine";

export const DashBoard: React.FC = () => {

    const cardsData = [
        {
            title: "Total Étude",
            tagColor: "green",
            prefix: "Ce Mois",
            tagContent: 2500,
        },
        {
            title: "Total Ingenieur",
            tagColor: "red",
            prefix: "Ce Mois",
            tagContent: 2500,
        },
        {
            title: "Total Client",
            tagColor: "purple",
            prefix: "Ce Mois",
            tagContent: 2500,
        },
        {
            title: "Total Assitante",
            tagColor: "blue",
            prefix: "Ce Mois",
            tagContent: 2500,
        },
        // Add more objects with different data for additional cards
        // { title: "...", tagColor: "...", prefix: "...", tagContent: ... },
    ];
    const progressValue = 100;
    const additionalData = {
        title: "Weekly Performance",
        content: (
            <div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm flex items-center">
                            Étude En Cours:{" "}
                            <span className="font-semibold ml-auto">35</span>
                        </p>
                        <div className="bg-gray-200 h-2 rounded-full">
                            <div className="bg-blue-500 h-full rounded-full w-3/5"></div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm flex items-center">
                            Étude Terminer: <span className="font-semibold ml-auto">50</span>
                        </p>
                        <div className="bg-gray-200 h-2 rounded-full">
                            <div className="bg-green-500 h-full rounded-full w-3/5"></div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm flex items-center">
                            Étude Affecté: <span className="font-semibold ml-auto">12</span>
                        </p>
                        <div className="bg-gray-200 h-2 rounded-full">
                            <div className="bg-red-500 h-full rounded-full w-2/5"></div>
                        </div>
                    </div>
                </div>
            </div>
        ),

    };
    const cards = cardsData.map((data, index) => (
        <div key={index} className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 px-4 mb-4">
            <div className="bg-white rounded-lg shadow-md p-4 ">
                <AnalyticSummaryCard
                    key={index}
                    title={data.title}
                    tagColor={data.tagColor}
                    prefix={data.prefix}
                    tagContent={data.tagContent}
                />
            </div>
        </div>
    ));
    return (

        <div className="flex flex-col">
        {/* Cards layout */}
        <div className="flex justify-between gap-4 p-6 m-6 flex-col sm:flex-row  ">
          {cards}
        </div>
  
        {/* Charts and content */}
        <div className="flex flex-col mt-6 sm:flex-row ">
          <div className="m-8 pr-2 flex-shrink-0 w-full sm:w-auto">
            <MyChart />
          </div>
          <div className="flex-1 m-2 p-4 left-18 flex flex-col sm:flex-row sm:justify-around items-centre">
            <div className="flex gap-4 flex-col sm:flex-row sm:gap-4">
              <div className="gap-4">
                <ChartBar />
             <div className="mt-6">   <ClientStudyChart /></div>
              </div>
              
                
              
            </div>
          </div>
        </div>
  
        {/* Remaining content */}
        <div className="relative mt-6 sm:flex-row flex-col">
          <div className="absolute top-[-2rem] sm:top-[-30rem] sm:right-[-10rem] right-[12rem] w-48 sm:w-auto h-96 sm:h-96 rounded-lg shadow-md p-4 ">
            <h2 className="text-lg font-semibold mb-4">{additionalData.title}</h2>
            {additionalData.content}
          </div>
          <div className="absolute top-[-2rem] sm:top-[-44rem] sm:right-[-10rem] right-[-1rem] w-auto sm:w-48 h-48 sm:h-48 rounded-lg shadow-md p-4 flex justify-center items-center ">
            <div className="text-l font-semibold text-black text-center">
              <span className="font-bold ">Études hebdomadaires <br />Terminer ...</span>
              <div className="radial-progress relative inset-y-1 text-sky-500" style={{ "--value": progressValue } as React.CSSProperties} role="progressbar">
                <span className="text-lg font-semibold text-black ">{progressValue}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
}