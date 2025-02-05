import { memo } from 'react';

export const CardStars = memo(function CardStars() {
    return (
        <div className="stars-container">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="star"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `star-twinkle 0.6s ease-out ${i * 0.1}s forwards`
                    }}
                />
            ))}
        </div>
    );
});

