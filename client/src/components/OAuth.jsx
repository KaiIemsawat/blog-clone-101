import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";

const OAuth = () => {
    return (
        <Button type="button" gradientDuoTone="pinkToOrange" outline>
            <AiFillGoogleCircle className="w-5 h-5  mr-2" />
            Continue with Google
        </Button>
    );
};
export default OAuth;
