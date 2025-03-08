import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="flex h-full w-full flex-col items-center justify-center gap-2">
            <h2 className="text-xl font-semibold">404 Not Found</h2>
            <p>This page could not be found.</p>
            <Link
                href="/"
                className="mt-4 px-10 py-2.5 h-12 box-border font-light border-none bg-linear-to-t from-[#3AC0B3] to-[#00d4ff] text-white rounded-[23px] transition-all duration-300 ease-in-out shadow-xs select-none text-base cursor-pointer hover:from-[#37e6d5] hover:to-[#00d4ff] focus:outline-hidden"
            >
                Go Back
            </Link>
        </main>
    );
}