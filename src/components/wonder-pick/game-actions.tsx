export default function GameActions({
    gameState,
    start,
    reset,
}: {
    gameState: string,
    start: () => void,
    reset: () => void,
}) {
    return (
        <div className='mt-8 relative flex gap-4 items-center justify-center'>
            {gameState === '' && (
                <>
                    <button
                        onClick={start}
                        className="px-10 py-2.5 h-12 box-border font-medium border-none bg-linear-to-t from-[#37e6d5] to-[#1decb5] text-white rounded-full transition-all duration-300 ease-in-out shadow-md select-none text-base cursor-pointer hover:from-[#51F7CB] hover:to-[#1decb5] active:shadow-xl"
                    >
                        Start
                    </button>
                    <button
                        onClick={() => { reset(); }}
                        className="relative px-10 py-2.5 h-12 box-border font-medium border-none bg-linear-to-t from-[#fff] to-[#fff] rounded-full transition-all duration-300 ease-in-out select-none shadow-md text-[#3A4452] cursor-pointer hover:from-[#f4f4f4] hover:to-[#f4f4f4] active:shadow-xl"
                    >
                        <span className="absolute top-[3px] bottom-[3px] left-[3px] right-[3px] border-2 rounded-full border-[#55DBE8]" />
                        Reload
                    </button>
                </>
            )}
            {gameState === 'end' && (
                <button
                    onClick={() => { reset(); }}
                    className="relative px-10 py-2.5 h-12 box-border font-medium border-none bg-linear-to-t from-[#fff] to-[#fff] rounded-full transition-all duration-300 ease-in-out select-none shadow-md text-[#3A4452] cursor-pointer hover:from-[#f4f4f4] hover:to-[#f4f4f4] active:shadow-xl"
                >
                    <span className="absolute top-[3px] bottom-[3px] left-[3px] right-[3px] border-2 rounded-full border-[#55DBE8]" />
                    New Pick
                </button>
            )}
        </div>
    );
}
