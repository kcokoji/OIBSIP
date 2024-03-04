import { HashLoader } from "react-spinners";

interface LoaderProps {
  size: number;
  color: string;
}

export default function Loader({ size, color }: LoaderProps) {
  return (
    <div className="flex justify-center items-center">
      <HashLoader size={size} aria-label="Loading Spinner" color={color} />
    </div>
  );
}
