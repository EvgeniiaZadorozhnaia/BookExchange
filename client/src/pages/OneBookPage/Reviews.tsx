import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { useAppSelector } from "../../redux/hooks";
import {
  Alert,
  AlertIcon,
  Avatar,
  Badge,
  Button,
  CloseButton,
  Icon,
  IconButton,
  Text,
  Textarea,
} from "@chakra-ui/react";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineDelete,
} from "react-icons/ai";

const { VITE_API, VITE_BASE_URL } = import.meta.env;

function Reviews({ book, reviews, setReviews }) {
  const { user } = useAppSelector((state) => state.authSlice);
  const [reviewContent, setReviewContent] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    let timeout;
    if (showSuccessAlert) {
      timeout = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 1500);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [showSuccessAlert]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
  };

  async function handleSubmitReview(event) {
    event.preventDefault();
    if (reviewContent.trim() === "") {
      alert("Отзыв не может быть пустым!");
      return;
    }
    try {
      const response = await axiosInstance.post(
        `${VITE_BASE_URL}${VITE_API}/reviews/${user.id}/${book.id}`,
        {
          content: reviewContent,
        }
      );
      const newReview = response.data;

      console.log('rev', reviews);
      console.log('newrev', newReview);

      setReviews((prev) => [...prev, newReview]);
      setReviewContent("");
      setShowSuccessAlert(true);
    } catch (error) {
      console.error("Ошибка при создании отзыва:", error);
    }
  }

  async function handleLike(id) {
    try {
      const like = { userId: user.id, reviewId: id };
      const { data } = await axiosInstance.post(
        `${VITE_BASE_URL}${VITE_API}/likes`,
        like
      );
      if (data) {
        await axiosInstance.put(
          `${VITE_BASE_URL}${VITE_API}/reviews/like/${id}`
        );
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === id
              ? { ...review, likes: (review.likes || 0) + 1 }
              : review
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDislike(id) {
    try {
      const dislike = { userId: user.id, reviewId: id };
      const { data } = await axiosInstance.post(
        `${VITE_BASE_URL}${VITE_API}/dislikes`,
        dislike
      );
      if (data) {
        await axiosInstance.put(
          `${VITE_BASE_URL}${VITE_API}/reviews/dislike/${id}`
        );
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === id
              ? { ...review, dislikes: (review.dislikes || 0) + 1 }
              : review
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleReviewDelete(id) {
    try {
      await axiosInstance.delete(`${VITE_BASE_URL}${VITE_API}/reviews/${id}`);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== id)
      );
    } catch (error) {
      console.error("Ошибка при удалении отзыва:", error);
    }
  }

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        maxHeight: "522px",
        overflow: "hidden",
      }}
    >
      <div style={{ overflowY: "auto" }}>
        <h4 style={{ marginBottom: "15px" }}>Отзывы</h4>
        {reviews?.length > 0 ? (
          reviews.map((review) => (
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
                      {review.User?.username}
                      <Badge ml="1" colorScheme="green">
                        {formatDate(review.createdAt)}
                      </Badge>
                    </Text>
                    <Text fontSize="sm">{review.content}</Text>
                  </div>
                  <div
                    style={{
                      marginLeft: "15px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
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
                    {review.User?.id === user?.id && (
                      <IconButton
                        aria-label="Удалить"
                        icon={<Icon as={AiOutlineDelete} />}
                        onClick={() => handleReviewDelete(review.id)}
                        colorScheme="red"
                        ml={2}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h6>Отзывов на данную книгу пока нет</h6>
        )}
      </div>

      {showSuccessAlert && (
        <Alert status="success" mb={4}>
          <AlertIcon />
          Отзыв успешно отправлен!
          <CloseButton
            onClick={() => setShowSuccessAlert(false)}
            position="absolute"
            right="8px"
            top="8px"
          />
        </Alert>
      )}

      <form
        style={{
          border: "1px solid black",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px #b9b5e1",
          backgroundColor: "#f7f7f7",
        }}
        onSubmit={handleSubmitReview}
      >
        <h4 style={{ marginBottom: "5px" }}>Оставить отзыв</h4>
        {book?.Owner?.id !== user?.id ? (
          <Textarea
            rows="3"
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "4px",
              borderColor: "#b9b5e1",
              borderWidth: "1px",
              outline: "none",
              boxShadow: "0 0 0 2px rgba(185, 181, 225, 0.5)",
              cursor: "pointer",
            }}
            placeholder="Введите ваш отзыв здесь..."
            onChange={(e) => setReviewContent(e.target.value)}
            value={reviewContent}
            required
          />
        ) : (
          <Textarea
            rows="3"
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "4px",
              borderColor: "#b9b5e1",
              borderWidth: "1px",
              outline: "none",
              boxShadow: "0 0 0 2px rgba(185, 181, 225, 0.5)",
              cursor: "not-allowed",
            }}
            placeholder="Введите ваш отзыв здесь..."
            onChange={(e) => setReviewContent(e.target.value)}
            value={reviewContent}
            required
            disabled
          />
        )}
        <Button
          type="submit"
          ml={2}
          minWidth="100px"
          variant="outline"
          colorScheme="purple"
          opacity="0.8"
          _hover={{ bg: "purple.100" }}
          disabled={reviewContent.trim() === ""}
        >
          Отправить
        </Button>
      </form>
    </div>
  );
}

export default Reviews;
