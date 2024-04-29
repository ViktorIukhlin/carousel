export interface ISlide {
  id: number;
  backgroundImage: string;
  mainImage: string;
  title: string;
  text: string;
  button: {
    text: string;
    action: () => void;
  };
}
