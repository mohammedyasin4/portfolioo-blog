import Link from "next/link";

export default function About() { 
    return (
        <div className="max-w-2xl mx-auto mt-12 bg-white rounded-lg shadow p-8 text-black">
            <h2 className="text-2xl font-bold mb-4">Om projektet</h2>
            <p>
                I denna examination utvecklas en webbapplikation med hjälp av ett headless CMS 
                med namnet Sanity och en frontend ramverk vid namnet React. Projektet genomförs i tre sprintar 
                där ni successivt bygger upp funktionalitet i form av tydligt definierade features. 
                För detta arbete används Git där feature branches för varje ny funktion skapas.
            </p>
            <div className="mt-8">
                <Link href="/" className="text-blue-600 hover:underline">
                    Tillbaka till startsidan
                </Link>
            </div>
        </div>
    );
}