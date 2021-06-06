import googl from "../assets/GOOGL.png";
import amzn from "../assets/AMZN.svg";
import fb from "../assets/FB.png";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";

const constants = [
  {
    logo: googl,
    name: "GOOGL",
    price: "1515 USD",
  },
  {
    logo: fb,
    name: "FB",
    price: "266 USD",
  },
  {
    logo: amzn,
    name: "AMZN",
    price: "3116 USD",
  },
];

const HeroCards = () => {
  const [heroCards, updateHeroCards] = useState(constants);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(heroCards);
    const [rearrangeableItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, rearrangeableItem);
    updateHeroCards(items);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="HeroCards" direction="horizontal">
        {(provided) => (
          <div
            className="hero-cards"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {heroCards.map((item, index) => (
              <Draggable
                key={index}
                draggableId={`draggable-${index}`}
                index={index}
              >
                {(provided) => (
                  <div
                    className="hero-card"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className="hero-company">
                      <p className="hero-name">{item.name}</p>
                      <img src={item.logo} alt="" />
                    </div>
                    <div className="hero-price">
                      <p>{item.price}</p>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default HeroCards;
