import { Button } from "@/components/ui/button";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      page
      <hr />
      <Button variant="outline" size="s">
        Button
      </Button>
    </div>
  );
};

export default page;
