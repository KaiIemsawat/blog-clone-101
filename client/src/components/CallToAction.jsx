import { Button } from "flowbite-react";

const CallToAction = () => {
    return (
        <div className="flex flex-col sm:flex-row border border-stone-500 justify-center items-center rounded-tl-3xl rounded-br-3xl p-3 text-center">
            <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-2xl">Javascript....</h2>
                <p className="text-slate-500 my-2">some short comments here</p>
                <Button
                    gradientDuoTone="purpleToPink"
                    outline
                    // className="rounded-bl-none rounded-tr-none" just for example css on flowbite
                >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        Learn more
                    </a>
                </Button>
            </div>
            <div className="p-7 flex-1">
                <img
                    src="https://www.datocms-assets.com/48401/1628644950-javascript.png"
                    alt="javascript"
                />
            </div>
        </div>
    );
};
export default CallToAction;
