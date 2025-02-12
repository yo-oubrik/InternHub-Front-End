import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

const ReadyToStartSection = () => {
    return (
        <section className="py-[7rem] bg-[#d7dedc]">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <Button size={"lg"} asChild>
                        <Link href={"/findwork"}>Find Work</Link>
                    </Button>
                    <Button size={"lg"} variant={"outline"} asChild>
                        <Link href={"/post"}>Post a Job</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default ReadyToStartSection;