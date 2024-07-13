import { Button } from "@chakra-ui/react";
import styles from "./NotFoundPage.module.css";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage(): JSX.Element {
  const navigate = useNavigate();

  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 Not Found</h1>
      <p className={styles.message}>
        The page you are looking for does not exist. Go to Home Page!
      </p>
      <Button
        onClick={() => navigate("/")}
        mr={2}
        mb={2}
        variant="outline"
        colorScheme="purple"
        opacity="0.8"
        _hover={{ bg: "purple.100" }}
        w="100px"
      >
        На главную
      </Button>
    </div>
  );
}
