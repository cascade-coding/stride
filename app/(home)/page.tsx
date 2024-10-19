import React from "react";
import EmptyContent from "./_components/EmptyContent";

const Home = async () => {
  return (
    <>
      <div className="hidden lg:block flex-1">
        <EmptyContent />
      </div>
    </>
  );
};

export default Home;
