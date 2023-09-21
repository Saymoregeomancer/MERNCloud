import { MainLayout, SideBarLayout, NavigationsLayout } from "../../layouts";
import { Skeleton, Button } from "../../ui";

import { useNavigate } from "react-router-dom";
const Page404 = ({}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <>
      <NavigationsLayout>
        <Skeleton size={2} />
        <Skeleton size={2} />
        <Skeleton size={2} />
      </NavigationsLayout>
      <MainLayout>
        <div className="w-full h-full flex flex-col items-center justify-start mt-3">
          <p>Page not found</p>
          <div className="w-4/12 h-10 mt-2 ">
            <Button onClick={handleClick}>Back to login</Button>
          </div>
        </div>
      </MainLayout>
      <SideBarLayout>
        <Skeleton size={14} />
        <Skeleton size={15} />
        <Skeleton size={14} />
      </SideBarLayout>
    </>
  );
};

export default Page404;
