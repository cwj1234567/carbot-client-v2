import { Spinner } from "flowbite-react";
import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect, useState } from "react";
import { vehicleService } from "../../pages/api/ServiceInitializer";

const Loader = observer(() => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(vehicleService.isLoading);
  }, [vehicleService.isLoading]);

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full z-9999 bg-white flex justify-center items-center bg-opacity-0">
          <Spinner size="xl" />
        </div>
      )}
    </>
  );
});

export default Loader;




