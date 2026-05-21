type MotivationLetterFormProps = {
    jobTitle: string;
    company: string;
};

export function MotivationLetterForm({
    jobTitle,
    company,
}: MotivationLetterFormProps) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-xl font-semibold">Lettre de motivation</h2>

            <p className="mt-1 text-sm text-gray-400">
                Génère une lettre personnalisée pour {company}.
            </p>

            <div className="mt-6 space-y-4">
                <input
                    className="w-full rounded-xl border border-white/10 bg-black/30 p-3"
                    placeholder="Nom de l’entreprise"
                    defaultValue={company}
                />

                <input
                    className="w-full rounded-xl border border-white/10 bg-black/30 p-3"
                    placeholder="Poste"
                    defaultValue={jobTitle}
                />

                <textarea
                    className="min-h-28 w-full rounded-xl border border-white/10 bg-black/30 p-3"
                    placeholder="Pourquoi ce poste t’intéresse ?"
                />

                <textarea
                    className="min-h-28 w-full rounded-xl border border-white/10 bg-black/30 p-3"
                    placeholder="Tes compétences à mettre en avant"
                />

                <button className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-medium text-black">
                    Générer la lettre
                </button>
            </div>
        </div>
    );
}