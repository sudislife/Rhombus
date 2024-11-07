import { title, subtitle } from "@/components/primitives";

export default function FileUploadPage() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-xl text-center justify-center">
                <span className={title()}>Upload your file here&nbsp;</span>
            </div>
        </section>
    );
}

