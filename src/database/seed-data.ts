
interface SeedTodos{
    title: string;
    status: boolean;
    createdAt: number;
}

export const initialData:SeedTodos[] = [
    {
        title: 'Hacer el curso de Python',
        status: false,
        createdAt: Date.now()
    },
    {
        title: 'Estudiar Java',
        status: false,
        createdAt: Date.now()
    },
    {
        title: 'Mejorar en Next JS',
        status: false,
        createdAt: Date.now()
    },
    {
        title: 'Aprender Parallax',
        status: false,
        createdAt: Date.now()
    },
]