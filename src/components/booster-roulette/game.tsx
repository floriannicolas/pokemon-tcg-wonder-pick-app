/* eslint-disable @next/next/no-img-element */
"use client";

import "@/app/styles/booster-roulette.css";

export default function Game() {
    return (
        <>
            <div className="text-center mx-auto max-w-7xl p-8">
                <div className="absolute top-0 left-0 w-full h-[25vh] bg-[#e0eaf5] [clip-path:polygon(0_0,100%_0,100%_80%,0%_100%)]" />
                <div className="absolute bottom-0 left-0 w-full h-[25vh] bg-[#dde7f3] [clip-path:polygon(0_20%,100%_0,100%_100%,0%_100%)]" />

                <div className='content-cards'>
                    <div className='relative top-0 left-0 z-[1]'>
                        <img
                            src="/game-mask.webp"
                            alt=""
                            className="relative block w-full m-0"
                        />
                    </div>
                    <div className="content-roulette">
                        <div className="inner">
                            <div className="banner">
                                {[...Array(15)].map((e, i) => (
                                    <div className="panel" key={i}>
                                        <div className="booster-container">
                                            <img
                                                src="/booster-mask.webp"
                                                alt=""
                                                className="invisible relative block w-full m-0"
                                            />
                                            <div className="booster">
                                                <div className="booster-face front"></div>
                                                <div className="booster-face back"></div>
                                                <div className="booster-face right"></div>
                                                <div className="booster-face left"></div>
                                                <div className="booster-face top"></div>
                                                <div className="booster-face bottom"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
