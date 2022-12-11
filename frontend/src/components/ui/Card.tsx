import React from 'react';
import CardPropI from '../../types/ui/CardPropI'
import './Card.css'

const Card:React.FC<CardPropI> = (props) => {
    return(
        <div className='card'>{props.children}</div>
    )
}

export default Card;