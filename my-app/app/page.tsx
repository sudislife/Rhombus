import { title } from "@/components/primitives";
import FileUpload from "./file_upload/page";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Dynamic Data Inference&nbsp;</span>
      </div>

      <FileUpload />
    </section>
  );
}
