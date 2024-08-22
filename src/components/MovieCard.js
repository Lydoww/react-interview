import React, { useState } from "react";

const MovieCard = ({
  id,
  title,
  category,
  likes,
  dislikes,
  onDelete,
  onReact,
}) => {
  const [userReaction, setUserReaction] = useState(null);

  const totalVotes = likes + dislikes;
  const likePercentage = totalVotes === 0 ? 0 : (likes / totalVotes) * 100;

  const handleLike = () => {
    if (userReaction === "like") {
      setUserReaction(null);
      onReact(id, "like", false);
    } else {
      setUserReaction("like");
      onReact(id, "like", true);
      if (userReaction === "dislike") {
        setUserReaction(null);
        onReact(id, "dislike", false);
      }
    }
  };

  const handleDislike = () => {
    if (userReaction === "dislike") {
      setUserReaction(null);
      onReact(id, "dislike", false);
    } else {
      setUserReaction("dislike");
      onReact(id, "dislike", true);
      if (userReaction === "like") {
        setUserReaction(null);
        onReact(id, "like", false);
      }
    }
  };

  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <p>{category}</p>
      <div className="gauge">
        <div className="likes" style={{ width: `${likePercentage}%` }}></div>
      </div>
      <div className="ratio">
        {likes} Likes / {dislikes} Dislikes
      </div>
      <div className="reaction-buttons">
        <button
          className={`like-button ${userReaction === "like" ? "active" : ""}`}
          onClick={handleLike}
        >
          Like
        </button>
        <button
          className={`dislike-button ${
            userReaction === "dislike" ? "active" : ""
          }`}
          onClick={handleDislike}
        >
          Dislike
        </button>
      </div>
      <button className="delete-button" onClick={onDelete}>
        Supprimer
      </button>
    </div>
  );
};

export default MovieCard;
