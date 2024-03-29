import { motion } from "framer-motion";

interface Props {
  message: string;
}

export const SystemMessage = ({ message }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(-100px)" }}
      animate={{ opacity: 255, transform: "translateY(0)" }}
      exit={{ opacity: 0, transform: "translateY(-100px)" }}
      layout
      className="fixed top-0 right-0 z-50 w-full p-4 text-2xl font-bold text-center text-white bg-black/50"
      style={{
        boxShadow: "0 10px 15px rgb(0 0 0 / 30%)",
        backdropFilter: "blur(33px)",
      }}
    >
      {message}
    </motion.div>
  );
};
