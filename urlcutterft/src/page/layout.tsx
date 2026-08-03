
import { Footer } from "@/components/atoms/footer/footer";
import { Main } from "@/components/atoms/main/main";
import { Header } from "@/components/atoms/header/header";
export const InitialPage = () => {
  return (
    <div className=" min-h-screen flex-col bg-gray-800">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};