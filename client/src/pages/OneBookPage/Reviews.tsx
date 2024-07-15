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
import { StarIcon } from "@chakra-ui/icons";
import { reviewsProps } from "../../types/propsTypes";
import { IReviews } from "../../types/stateTypes";

const { VITE_API, VITE_BASE_URL } = import.meta.env;

function Reviews({
  book,
  reviews,
  setReviews,
  setBook,
}: reviewsProps): JSX.Element {
  const { user } = useAppSelector((state) => state.authSlice);
  const [reviewContent, setReviewContent] = useState<string>("");
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [showLikeAlert, setshowLikeAlert] = useState<boolean>(false);
  const [currentRating, setCurrentRating] = useState<number | undefined>();
  const [rateBook, setRateBook] = useState<number>(0);
  const [likes, setLikes] = useState<number[]>([]);
  const [dislikes, setDislikes] = useState<number[]>([]);

  useEffect(() => {
    let timeout: number;
    if (showSuccessAlert) {
      timeout = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 1500);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [showSuccessAlert]);

  useEffect(() => {
    let timeout: number;
    if (showLikeAlert) {
      timeout = setTimeout(() => {
        setshowLikeAlert(false);
      }, 1500);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [showLikeAlert]);

  useEffect(() => {
    async function fetchUserRating() {
      try {
        const { data } = await axiosInstance.get(
          `${VITE_BASE_URL}${VITE_API}/ratingBooks/${user.id}/${book.id}`
        );

        if (data.mark !== 0) {
          setRateBook(data.mark);
        }
      } catch (error) {
        console.error("Ошибка при получении оценки пользователя:", error);
      }
    }
    fetchUserRating();
  }, [book, user.id]);

  useEffect(() => {
    async function getUserLikes() {
      try {
        const { data } = await axiosInstance.get(
          `${VITE_BASE_URL}${VITE_API}/likes/${user.id}`
        );
        setLikes(data);
        console.log(currentRating);
        
      } catch (error) {
        console.error("Ошибка при получении лайков пользователя:", error);
      }
    }
    getUserLikes();
  }, []);

  useEffect(() => {
    async function getUserDislikes() {
      try {
        const { data } = await axiosInstance.get(
          `${VITE_BASE_URL}${VITE_API}/dislikes/${user.id}`
        );
        setDislikes(data);
      } catch (error) {
        console.error("Ошибка при получении лайков пользователя:", error);
      }
    }
    getUserDislikes();
  }, []);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
  };

  async function handleSubmitReview(event: React.FormEvent<HTMLFormElement>) {
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

      setReviews((prev: IReviews) => [...prev, newReview]);
      setReviewContent("");
      setShowSuccessAlert(true);
    } catch (error) {
      console.error("Ошибка при создании отзыва:", error);
    }
  }

  async function handleLike(id: number) {
    try {
      if (!likes.includes(id)) {
        const review = reviews.find((review) => review.id === id);
        if (review && review.User?.id === user?.id) {
          setshowLikeAlert(true);
        } else {
          const like = { userId: user.id, reviewId: id };
          const { data } = await axiosInstance.post(
            `${VITE_BASE_URL}${VITE_API}/likes`,
            like
          );
          if (data) {
            await axiosInstance.put(
              `${VITE_BASE_URL}${VITE_API}/reviews/like/${id}`
            );
            setLikes((prev) => [...prev, id]);
            setReviews((prevReviews) =>
              prevReviews.map((review) =>
                review.id === id
                  ? { ...review, likes: (review.likes || 0) + 1 }
                  : review
              )
            );
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDislike(id: number) {
    try {
      if (!dislikes.includes(id)) {
        const review = reviews.find((review) => review.id === id);
        if (review && review.User?.id === user?.id) {
          setshowLikeAlert(true);
        } else {
          const dislike = { userId: user.id, reviewId: id };
          const { data } = await axiosInstance.post(
            `${VITE_BASE_URL}${VITE_API}/dislikes`,
            dislike
          );
          if (data) {
            await axiosInstance.put(
              `${VITE_BASE_URL}${VITE_API}/reviews/dislike/${id}`
            );
            setDislikes((prev) => [...prev, id]);
            setReviews((prevReviews) =>
              prevReviews.map((review) =>
                review.id === id
                  ? { ...review, dislikes: (review.dislikes || 0) + 1 }
                  : review
              )
            );
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const rateBookHandler = async (currentRating: number) => {
    try {
      const ratingDone = {
        userId: user.id,
        bookId: book.id,
        mark: currentRating,
      };

      const { data } = await axiosInstance.post(
        `${VITE_BASE_URL}${VITE_API}/ratingBooks`,
        ratingDone
      );
      if (data) {
        const currentRate = book?.rating + currentRating;
        let rating = currentRate / 2;
        rating = parseFloat(rating.toFixed(1));

        setCurrentRating(rating);

        const { data } = await axiosInstance.put(
          `${VITE_BASE_URL}${VITE_API}/books/rate/${book?.id}`,
          { rating }
        );

        setBook((prev) => ({
          ...prev,
          rating: data.rating,
        }));
      }
    } catch (error) {
      console.error("Ошибка при обновлении рейтинга:", error);
    }
  };

  async function handleReviewDelete(id: number) {
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
                alignItems: "flex-start",
                marginBottom: "20px",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                backgroundColor: "#f7f7f7",
                maxWidth: "100%",
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
            >
              <Avatar src="https://bit.ly/sage-adebayo" />
              <div style={{ marginLeft: "15px", flexGrow: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ flex: "1 1 auto" }}>
                    <Text fontWeight="bold">
                      {review.User?.username}
                      <Badge ml="1" colorScheme="purple">
                        {formatDate(review.createdAt)}
                      </Badge>
                    </Text>
                    <Text fontSize="sm" style={{ marginTop: "5px" }}>
                      {review.content}
                    </Text>
                  </div>
                  <div
                    style={{
                      marginLeft: "15px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "3px",
                    }}
                  >
                    <IconButton
                      aria-label="Лайк"
                      icon={<Icon as={AiOutlineLike} />}
                      onClick={() => handleLike(review.id)}
                    />
                    {review.likes !== undefined && (
                      <Badge colorScheme="green" ml={1}>
                        {review.likes}
                      </Badge>
                    )}
                    <IconButton
                      aria-label="Дизлайк"
                      icon={<Icon as={AiOutlineDislike} />}
                      onClick={() => handleDislike(review.id)}
                    />
                    {review.dislikes !== undefined && (
                      <Badge colorScheme="red" ml={1}>
                        {review.dislikes}
                      </Badge>
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

      {showLikeAlert ? (
        <Alert status="warning">
          <AlertIcon />
          Вы не можете оценивать собственные комментарии!
        </Alert>
      ) : null}

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

      {book?.Owner?.id !== user?.id ? (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            border: "1px solid black",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px #b9b5e1",
            backgroundColor: "#f7f7f7",
            marginTop: "10px",
          }}
          onSubmit={handleSubmitReview}
        >
          <div style={{ width: "100%", marginBottom: "10px" }}>
            <h4 style={{ marginBottom: "5px" }}>Оставить отзыв</h4>
            {book?.Owner?.id !== user?.id ? (
              <Textarea
                rows={3}
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
                rows={3}
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
              minWidth="100px"
              variant="outline"
              colorScheme="purple"
              opacity="0.8"
              _hover={{ bg: "purple.100" }}
              disabled={reviewContent.trim() === ""}
            >
              Отправить
            </Button>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {book?.Owner?.id !== user?.id && (
              <>
                {rateBook !== 0 ? (
                  <>
                    <Text as="span" fontSize="xl">
                      Ваша оценка {rateBook}
                    </Text>
                    <Text
                      as="span"
                      display="inline-flex"
                      alignItems="center"
                      fontSize="xl"
                      transition="transform 0.2s ease, color 0.2s ease"
                    >
                      <StarIcon color="yellow.400" />
                    </Text>
                  </>
                ) : (
                  <>
                    <Text
                      bg="whitesmoke"
                      borderRadius="30px"
                      padding="5px"
                      as="span"
                      fontSize="xl"
                    >
                      Оцените книгу
                    </Text>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Text
                        key={rating}
                        onClick={() => {
                          rateBookHandler(rating);
                          setRateBook(() => rating);
                        }}
                        as="span"
                        fontSize="xl"
                        _hover={{
                          transform: "scale(1.2)",
                          color: "gold",
                          cursor: "pointer",
                        }}
                        ml={1}
                      >
                        <StarIcon color={"yellow.400"} />
                      </Text>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </form>
      ) : null}
    </div>
  );
}

export default Reviews;
