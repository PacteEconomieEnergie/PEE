export interface StudyData {
    // Define the structure of your study data
    DateDeReception: Date;
    DateDeSoumission: Date;
    FullName: string;
    Factured: number;
    TypeEtude: "NouvelleEtude" | "Retouche";
    NomberDeRetouche: number | null;
    TypeDeRetouche: "Exterieur" | "Interieur";
    Category: "Classique" | "Precaire" | "GrandPrecaire";
    Nature: "Normale" | "Prioritere";
}

export interface ModificationData {
    // Define the structure of your modification data
    [key: string]: any; // Example property
}