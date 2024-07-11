import { Avatar, Badge, Icon, IconButton, Text } from "@chakra-ui/react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import axiosInstance from "../../axiosInstance";
const { VITE_API, VITE_BASE_URL }: ImportMeta["env"] = import.meta.env;

function Reviews({ book, reviews, setReviews }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
  };

  async function handleLike(id) {
    try {
      await axiosInstance.put(`${VITE_BASE_URL}${VITE_API}/reviews/like/${id}`);
      const updatedReviews = reviews.map((review) => {
        if (review.id === id) {
          return { ...review, likes: (review.likes || 0) + 1 };
        }
        return review;
      });
      setReviews(updatedReviews);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDislike(id) {
    try {
      await axiosInstance.put(
        `${VITE_BASE_URL}${VITE_API}/reviews/dislike/${id}`
      );
      const updatedReviews = reviews.map((review) => {
        if (review.id === id) {
          return { ...review, dislikes: (review.dislikes || 0) + 1 };
        }
        return review;
      });
      setReviews(updatedReviews);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h4 style={{ marginBottom: "15px" }}>Отзывы</h4>
      {reviews?.length > 0 ? (
        reviews?.map((review) => (
          <div
            key={review.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              padding: "10px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              backgroundColor: "#f7f7f7",
            }}
          >
            <Avatar src="https://bit.ly/sage-adebayo" />
            <div style={{ marginLeft: "15px", flexGrow: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Text fontWeight="bold">
                    {review.User.username}
                    <Badge ml="1" colorScheme="green">
                      {formatDate(review.createdAt)}
                    </Badge>
                  </Text>
                  <Text fontSize="sm">{review.content}</Text>
                </div>
                <div style={{ marginLeft: "15px" }}>
                  <IconButton
                    aria-label="Лайк"
                    icon={<Icon as={AiOutlineLike} />}
                    onClick={() => handleLike(review.id)}
                  />
                  {review.likes !== undefined && (
                    <Badge colorScheme="green">{review.likes}</Badge>
                  )}
                  <IconButton
                    aria-label="Дизлайк"
                    icon={<Icon as={AiOutlineDislike} />}
                    onClick={() => handleDislike(review.id)}
                  />
                  {review.dislikes !== undefined && (
                    <Badge colorScheme="red">{review.dislikes}</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1>Отзывов на данную книгу пока нет</h1>
      )}

      <form
        style={{
          marginTop: "20px",
          border: "1px solid black",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          backgroundColor: "#f7f7f7",
        }}
      >
        <h4 style={{ marginBottom: "10px" }}>Оставить отзыв</h4>
        <textarea
          rows="3"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
          placeholder="Введите ваш отзыв здесь..."
          // onChange={(e) => setReviewContent(e.target.value)}
          // value={reviewContent}
          required
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          // onClick={handleSubmitReview}
        >
          Отправить
        </button>
      </form>
    </div>
  );
}

export default Reviews;
