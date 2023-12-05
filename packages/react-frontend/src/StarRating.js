import React, { useState } from 'react'

const StarRating = ({ onStarClick, roomId }) => {
    const [rating, setRating] = useState(0)

    const handleStarClick = (value) => {
        setRating(value)
        onStarClick(value, roomId)
    }

    return (
        <div>
            <p>Current Rating: {rating}</p>
            {[1, 2, 3, 4, 5].map((value) => (
                <Star
                    key={value}
                    filled={value <= rating}
                    onClick={() => handleStarClick(value)}
                />
            ))}
        </div>
    )
}

const Star = ({ filled, onClick }) => (
    <span
        style={{
            color: filled ? 'orange' : 'gray',
            cursor: 'pointer',
            fontSize: '1.3em',
        }}
        onClick={onClick}
    >
        ★
    </span>
)

export default StarRating
