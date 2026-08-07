
import { Footer } from "@/components/atoms/footer/footer";
import { Main } from "@/components/atoms/main/main";
import { Header } from "@/components/atoms/header/header";
export const InitialPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0b]">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};