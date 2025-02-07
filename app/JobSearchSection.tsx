import Image from "next/image";

const JobSearchSection = () => {
    return (
        <section className="px-20 bg-background min-h-[calc(100vh-105px)] flex items-center justify-between">
            <div className="text-center text-black">
                <h1 className="text-4xl text-primary md:text-5xl font-bold mb-10 max-w-[700px]">
                    Find Your Dream Internship or Perfect Candidate
                </h1>
                <p className="text-xl mb-8">
                    Connect with thousands of employers and internship seekers on our platform
                </p>
            </div>
            <div>
                <Image
                    src="/homepage/job_recretment.png"
                    alt="Recretment"
                    width={680}
                    height={680}
                />
            </div>
        </section>
    );
};

export default JobSearchSection;