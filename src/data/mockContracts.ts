export interface Contract {
    id: string;
    title: string;
    supplier: string;
    sum: number;
    date: string;
    category: string;
}

export const mockContracts: Contract[] = [
    {
        id: "CRZ-2023-001",
        title: "Nákup IT techniky pre školy",
        supplier: "TechCorp s.r.o.",
        sum: 1250000,
        date: "2023-11-15",
        category: "Školstvo"
    },
    {
        id: "CRZ-2023-002",
        title: "Oprava ciest 1. triedy - úsek A",
        supplier: "Stavba a Cesty a.s.",
        sum: 8450000,
        date: "2023-10-02",
        category: "Doprava"
    },
    {
        id: "CRZ-2023-003",
        title: "Licencie pre kybernetickú bezpečnosť",
        supplier: "CyberSec Solutions",
        sum: 450000,
        date: "2023-12-01",
        category: "Bezpečnosť"
    },
    {
        id: "CRZ-2023-004",
        title: "Zdravotnícky materiál pre FN",
        supplier: "MedTech Slovakia",
        sum: 2100000,
        date: "2023-09-20",
        category: "Zdravotníctvo"
    },
    {
        id: "CRZ-2023-005",
        title: "Poradenské služby pre optimalizáciu procesov",
        supplier: "Consulting Group",
        sum: 320000,
        date: "2024-01-10",
        category: "Financie"
    }
];
