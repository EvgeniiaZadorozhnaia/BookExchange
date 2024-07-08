export interface AuthFormProps {
    title: string;
    type: "signin" | "signup";
}

  export interface Question { 
    id: number; 
    question: string; 
    answer: string; 
    price: string; 
  } 

  export interface ErrorModalProps {
    isOpen: boolean;
    onClose: () => void;
    error: string;
  }
  

