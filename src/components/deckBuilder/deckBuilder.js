import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useDrop } from "react-dnd";
import CardFinder from "../cardFinder/cardFinder";
import CardContainer from "./cardContainer";
import { useSelector, useDispatch } from "react-redux";

import { setActiveDeck } from "../../actions/deck";

function DeckBuilder({ onSave }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { decks, activeDeck } = useSelector((state) => state.deck);
  const [differenceDetected, setDifferenceDetected] = useState(false);

  const activeDeckRef = React.useRef(activeDeck);

  const {
    register,
    formState: { isDirty, errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    if (activeDeck._id) {
      const originalDeck = decks.find((d) => d._id === activeDeck._id);
      if (JSON.stringify(originalDeck) !== JSON.stringify(activeDeck) || isDirty) {
        return setDifferenceDetected(true);
      }
      setDifferenceDetected(false);
    }
  }, [activeDeck, decks, isDirty]);

  useEffect(() => {
    if (activeDeck._id) {
      reset();
      activeDeckRef.current = activeDeck;
      setValue("deckname", activeDeck.deckname);
      setValue("tag1", activeDeck.tags[0]);
      setValue("tag2", activeDeck.tags[1]);
      setValue("tag3", activeDeck.tags[2]);
    }
  }, [activeDeck, setValue, reset]);

  const [, mainDeckDrop] = useDrop(() => ({
    accept: "CARD",
    drop: (draggedItem) => {
      onDrop(draggedItem.subDeck, "mainDeck", draggedItem.id);
    },
  }));

  const [, extraDeckDrop] = useDrop(() => ({
    accept: "CARD",
    drop: (draggedItem) => {
      onDrop(draggedItem.subDeck, "extraDeck", draggedItem.id);
    },
  }));

  const [, sideDeckDrop] = useDrop(() => ({
    accept: "CARD",
    drop: (draggedItem) => {
      onDrop(draggedItem.subDeck, "sideDeck", draggedItem.id);
    },
  }));

  const onDrop = (source, destination, cardId) => {
    if (source === destination) return;

    // Check maximum number of cards
    if (destination === "mainDeck" && activeDeckRef.current.mainDeck.length >= 60)
      return alert("Deck can't exceed 60 cards");
    if (destination === "extraDeck" && activeDeckRef.current.extraDeck.length >= 15)
      return alert("Extra deck can't exceed 15 cards");
    if (destination === "sideDeck" && activeDeckRef.current.sideDeck.length >= 15)
      return alert("Side deck can't exceed 15 cards");

    // Check if the same card has 3 instances deck
    if (
      !source &&
      [
        ...activeDeckRef.current.mainDeck,
        ...activeDeckRef.current.extraDeck,
        ...activeDeckRef.current.sideDeck,
      ].filter((v) => v === cardId).length >= 3
    )
      return alert("Can't have the same card more than 3 times");

    const destinationSubDeckCopy = Array.from(activeDeckRef.current[destination]);

    if (source) {
      const sourceSubDeckCopy = Array.from(activeDeckRef.current[source]);
      const cardToMove = sourceSubDeckCopy.find((v) => v === cardId);
      const indexToRemove = sourceSubDeckCopy.indexOf(cardToMove);
      sourceSubDeckCopy.splice(indexToRemove, 1);
      destinationSubDeckCopy.push(cardToMove);
      activeDeckRef.current[source] = sourceSubDeckCopy;
      activeDeckRef.current[destination] = destinationSubDeckCopy;
      return dispatch(
        setActiveDeck({
          ...activeDeckRef.current,
          [source]: sourceSubDeckCopy,
          [destination]: destinationSubDeckCopy,
        }),
      );
    } else {
      destinationSubDeckCopy.push(cardId);
      activeDeckRef.current[destination] = destinationSubDeckCopy;
      return dispatch(
        setActiveDeck({
          ...activeDeckRef.current,
          [destination]: destinationSubDeckCopy,
        }),
      );
    }
  };

  const onSubmit = (data) => {
    const tags = [];
    if (data.tag1) tags.push(data.tag1);
    if (data.tag2) tags.push(data.tag2);
    if (data.tag3) tags.push(data.tag3);
    const deckCopy = {
      deckname: data.deckname,
      createdByUser: user._id,
      mainDeck: activeDeck.mainDeck,
      extraDeck: activeDeck.extraDeck,
      sideDeck: activeDeck.sideDeck,
      tags: tags,
      flow: {
        nodes: [],
        edges: [],
      },
      likes: [],
      dislikes: [],
    };

    if (activeDeck._id) deckCopy._id = activeDeck._id;
    onSave(deckCopy);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row justify-between items-center mt-4">
            <div>
              <label htmlFor="deckName" className="label">
                <span className="label-text font-semibold">Deck name</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                {...register("deckname", { required: true })}
              />
              {errors.deckName?.type === "required" && (
                <p role="alert" className="text-error mt-1 text-xs">
                  A deck name is required
                </p>
              )}
            </div>

            <div className="flex flex-col ">
              <button
                type="submit"
                className={`btn ${differenceDetected ? "btn-warning" : "btn-primary"}`}>
                Save deck
              </button>
              {differenceDetected && (
                <p role="alert" className="text-warning mt-1 text-xs">
                  A change on the deck was made.
                  <br />
                  Remember to save.
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row flex-wrap justify-between lg:items-end md:items-start mt-4">
            <div>
              <label htmlFor="tags" className="label">
                <span className="label-text font-semibold">Tag 1</span>
              </label>
              <input
                type="text"
                name="tags"
                className="input input-bordered"
                {...register("tag1", { required: true })}
              />
              {errors.tag1?.type === "required" && (
                <p role="alert" className="text-error mt-1 text-xs">
                  At least 1 tag is required
                </p>
              )}
            </div>
            <div>
              <label htmlFor="tags" className="label">
                <span className="label-text font-semibold">Tag 2</span>
              </label>
              <input
                type="text"
                name="tags"
                className="input input-bordered"
                {...register("tag2")}
              />
            </div>
            <div>
              <label htmlFor="tags" className="label">
                <span className="label-text font-semibold">Tag 3</span>
              </label>
              <input
                type="text"
                name="tags"
                className="input input-bordered"
                {...register("tag3")}
              />
            </div>
          </div>
          <div ref={mainDeckDrop} className="rounded-box border px-4 py-2 min-w-fit">
            <span className="label-text font-semibold block">Main deck</span>
            <span className="label-text text-xs">{`(${activeDeck?.mainDeck?.length} cards)`}</span>
            <div className="min-h-[200px] grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4 grid-cols-2 gap-2 my-2">
              {activeDeck?.mainDeck &&
                activeDeck.mainDeck.map((cardId, index) => (
                  <CardContainer key={index} cardId={cardId} subDeck="mainDeck" />
                ))}
            </div>
          </div>
          <div ref={extraDeckDrop} className="rounded-box w-full border px-4 py-2">
            <span className="label-text font-semibold block">Extra deck</span>
            <span className="label-text text-xs">{`(${activeDeck?.extraDeck?.length} cards)`}</span>
            <div className="min-h-[100px] grid xl:grid-cols-8 lg:grid-cols-6 sm:grid-cols-4 grid-cols-2 gap-4 my-2">
              {activeDeck?.extraDeck &&
                activeDeck.extraDeck.map((cardId, index) => (
                  <CardContainer key={index} cardId={cardId} subDeck="extraDeck" />
                ))}
            </div>
          </div>
          <div ref={sideDeckDrop} className="rounded-box w-full border px-4 py-2">
            <span className="label-text font-semibold block">Side deck</span>
            <span className="label-text text-xs">{`(${activeDeck?.sideDeck?.length} cards)`}</span>
            <div className="min-h-[100px] grid xl:grid-cols-8 lg:grid-cols-6 sm:grid-cols-4 grid-cols-2 gap-4 my-2">
              {activeDeck?.sideDeck &&
                activeDeck.sideDeck.map((cardId, index) => (
                  <CardContainer key={index} cardId={cardId} subDeck="sideDeck" />
                ))}
            </div>
          </div>
        </form>
      </div>
      <CardFinder />
    </div>
  );
}

DeckBuilder.propTypes = {
  pdeck: PropTypes.object,
  onSave: PropTypes.func,
};

export default DeckBuilder;
