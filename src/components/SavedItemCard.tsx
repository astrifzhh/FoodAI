import { useState } from "react";
import StarIcon from "./icons/StarIcon";
import TrashIcon from "./icons/TrashIcon";

// --- Type Definitions ---
interface Review {
  place: number;
  taste: number;
  price: number;
}

interface Recommendation {
  id: number;
  name: string;
  description?: string;
  reason?: string;
  ingredients?: string[];
  places?: string[];
  review?: Review;
}

interface SavedItem extends Omit<Recommendation, "review"> {
  review: Review; // required for saved items
}

interface SavedItemCardProps {
  item: SavedItem;
  onUpdateReview: (id: number, review: Review) => void;
  onDelete: (id: number) => void;
}

interface RatingInputProps {
  category: keyof Review;
  label: string;
  value: number;
  onChange: (category: keyof Review, value: number) => void;
}

const SavedItemCard = ({
  item,
  onUpdateReview,
  onDelete,
}: SavedItemCardProps) => {
  const [review, setReview] = useState<Review>(
    item.review || { place: 0, taste: 0, price: 0 }
  );

  const handleRatingChange = (category: keyof Review, value: number) => {
    setReview((prev) => ({ ...prev, [category]: value }));
  };

  const handleSaveReview = () => {
    onUpdateReview(item.id, review);
  };

  const RatingInput = ({ category, label }: RatingInputProps) => (
    <div>
      <span className="font-semibold text-gray-700">{label}:</span>
      <div className="flex items-center mt-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} onClick={() => handleRatingChange(category, star)}>
            <StarIcon filled={star <= review[category]} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-bold text-[#419166] mb-2">
            {item.name}
          </h3>
          <button
            onClick={() => onDelete(item.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <TrashIcon />
          </button>
        </div>
        <p className="text-gray-600 mb-4">{item.description}</p>
        <div className="p-4 bg-gray-50 rounded-lg space-y-3">
          <h4 className="font-bold text-lg text-gray-800">Review Kamu</h4>
          <RatingInput
            category="place"
            label="Tempat"
            value={review.place}
            onChange={handleRatingChange}
          />
          <RatingInput
            category="taste"
            label="Rasa"
            value={review.taste}
            onChange={handleRatingChange}
          />
          <RatingInput
            category="price"
            label="Harga"
            value={review.price}
            onChange={handleRatingChange}
          />
          <button
            onClick={handleSaveReview}
            className="w-full mt-4 bg-[#FE875F] text-white font-bold py-4 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Simpan Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedItemCard;
