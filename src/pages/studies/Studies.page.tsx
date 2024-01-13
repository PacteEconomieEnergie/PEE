import { Studies } from "../../modules/studies/Studies.module";
import React from "react";
export default function StudiesPage (){
return (

<div className="flex-1 mt-4 px-4 sm:px-28">
<h1 className="mb-6 text-xl font-bold">Tableau Des études</h1>
<Studies/> 
</div>)
}