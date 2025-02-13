import Image from "next/image";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-var(--header-height))] ">
      <div>
        <h1 className="text-5xl text-primary mb-4 font-semibold ">
          Processing Your Request
        </h1>
        <Image
          src="/processing.png"
          alt="Processing"
          width={850}
          height={850}
          className="max-w-md animate-float"
        />
      </div>
      <div className="text-center max-w-xl mt-5">
        <p className="text-xl text-gray-700">
          We are currently reviewing your application. You will receive an email
          as soon as your request is approved.
        </p>
      </div>
    </div>
  );
};

export default Page;
