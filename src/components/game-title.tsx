import { Booster } from "@/lib/definitions";

export default function GameTitle({
    selectedBoosterType,
    gameState,
}: {
    selectedBoosterType?: Booster,
    gameState: string,
}) {
    return (
        <div className={`group relative mx-auto mb-8 transition-all duration-600 ease-in-out text-center min-h-[88px] ${gameState}`}>
            {selectedBoosterType && (
                <div className="inline-block opacity-1 px-8 py-2.5 leading-10 font-light bg-[#F2F8FC] text-[#878D96] rounded-[28px] shadow-[0_0_11px_0_#d7d8dc] relative mb-8 text-base transition-all duration-300 ease-in-out pl-20 data-[visible=true]:inline-block data-[visible=true]:opacity-100 group-[.started]:hidden group-[.end]:hidden max-422:text-[0.78rem]">
                    <div
                        className="absolute top-0 left-5 w-[41px] h-20 bg-[length:41px_80px] bg-no-repeat transform -translate-y-[12%] rotate-[10deg]"
                        style={{ backgroundImage: `url('/boosters/${selectedBoosterType}.webp')` }}
                    />
                    Wonder picking this booster pack!
                </div>
            )}

            <div className="hidden opacity-0 py-2.5 leading-10 font-light bg-[#F2F8FC] text-[#878D96] rounded-[28px] shadow-[0_0_11px_0_#d7d8dc] relative mb-8 text-base transition-all duration-300 ease-in-out px-20 data-[visible=true]:inline-block data-[visible=true]:opacity-100 group-[.selectable]:inline-block group-[.selectable]:opacity-100">
                Pick a card
            </div>

            <div className="hidden opacity-0 py-2.5 leading-10 font-light bg-[#F2F8FC] text-[#878D96] rounded-[28px] shadow-[0_0_11px_0_#d7d8dc] relative mb-8 text-base transition-all duration-300 ease-in-out px-20 data-[visible=true]:inline-block data-[visible=true]:opacity-100 group-[.end]:inline-block group-[.end]:opacity-100">
                Wonder pick result:
            </div>
        </div>
    );
}
