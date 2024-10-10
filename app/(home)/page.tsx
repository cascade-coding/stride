import React from "react";
import Sidebar from "./_components/Sidebar";
import EmptyContent from "./_components/content/EmptyContent";

const Home = async () => {
  return (
    <>
      <div className="min-h-dvh flex flex-col lg:flex-row 2xl:container 2xl:mx-auto">
        <Sidebar sheet={false} />
        <div className="hidden lg:block flex-1">
          <EmptyContent />
        </div>
      </div>
    </>
  );
};

export default Home;
