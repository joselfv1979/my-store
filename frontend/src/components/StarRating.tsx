import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StarRating = () => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <>
      {stars.map((star) => (
        <FontAwesomeIcon key={star} icon={faStar} color="orange" />
      ))}
    </>
  );
};

export default StarRating;
