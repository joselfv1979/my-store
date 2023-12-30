import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  stars: number
}

// Component for displaying the product rating 
const Rating = ({ stars }: Props) => {
  const totalStars = [1,2,3,4,5];
 
  return (
    <>
      {totalStars.map((star) => (
        <FontAwesomeIcon key={star} icon={faStar} color={`${stars >= star ? '#f2b01e' : '#666'}`} />
      ))}
    </>
  );
};

export default Rating;
