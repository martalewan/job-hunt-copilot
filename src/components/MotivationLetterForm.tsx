type MotivationLetterFormProps = {
    jobTitle: string;
    company: string;
};

export function MotivationLetterForm({
    jobTitle,
    company,
}: MotivationLetterFormProps) {
    return (
        <div className="glass-panel rounded-md p-6">
            <h2 className="text-xl font-semibold">Lettre de motivation</h2>

            <p className="muted mt-1 text-sm">
                Génère une lettre personnalisée pour {company}.
            </p>

            <div className="mt-6 space-y-4">
                <input
                    className="glass-control w-full rounded-md p-3"
                    placeholder="Nom de l’entreprise"
                    defaultValue={company}
                />

                <input
                    className="glass-control w-full rounded-md p-3"
                    placeholder="Poste"
                    defaultValue={jobTitle}
                />

                <textarea
                    className="glass-control min-h-28 w-full rounded-md p-3"
                    placeholder="Pourquoi ce poste t’intéresse ?"
                />

                <textarea
                    className="glass-control min-h-28 w-full rounded-md p-3"
                    placeholder="Tes compétences à mettre en avant"
                />

                <button className="accent-control w-full rounded-md px-4 py-3 font-medium">
                    Générer la lettre
                </button>
            </div>
        </div>
    );
}
