"use client"

import { useState }                   from "react";
import { Accordion, AccordionItem }   from "@nextui-org/accordion";
import { Button }                     from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Divider }                    from "@nextui-org/divider";
import { Slider }                     from "@nextui-org/slider";
import { setPriority } from "os";

async function handleOnSubmit(
  event: React.FormEvent<HTMLFormElement>,
  file: File,
  numSensitivity: number,
  catSensitivity: number,
  setProcessedData: any
) {
  console.log("Uploading file", file, numSensitivity, catSensitivity);
  // event.preventDefault();

  if(!file) {
    console.error("No file selected");
    return;
  }

  const formData = new FormData();

  formData.append("file", file);
  formData.append("numSensitivity", numSensitivity);
  formData.append("catSensitivity", catSensitivity);

  try{
    const response = await fetch("http://localhost:8000/api_upload/", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    setProcessedData(data);

    if (response.ok) {
      console.log(data);
    }
  } catch (error) {
    console.log("Error uploading file", error);
  }
}

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [numSensitivity, setNumSensitivity] = useState(0.7);
  const [catSensitivity, setCatSensitivity] = useState(0.7);
  const [processedData, setProcessedData] = useState(null);

  return (
    <Card className="max-w-[400px]">
      
      <CardHeader className="flex gap-3">
        <div className="flex flex-row">
          <p className="text-md">
            To get started upload your file here
          </p>
        </div>
      </CardHeader>

      <Divider />

      <Accordion>
        <AccordionItem title="Advanced Settings">
          <Slider 
            defaultValue={numSensitivity}
            label="Threshold to numeric columns (Threshold after which column is considered numeric)"
            maxValue={1}
            minValue={0}
            step={0.1}
            onChange={(value) =>
              setNumSensitivity(Array.isArray(value) ? value[0] : value)
            }
          />
          <Slider 
            defaultValue={catSensitivity} 
            label="Threshold to categorical columns (Threshold after which column is considered categorical)"
            maxValue={1}
            minValue={0}
            step={0.1}
            onChange={(value) =>
              setCatSensitivity(Array.isArray(value) ? value[0] : value)
            }
          />
        </AccordionItem>
      </Accordion>

      <CardBody>
        <form
          onSubmit={(e) =>
            handleOnSubmit(e, file, numSensitivity, catSensitivity, setProcessedData)
          }
        >
          <input
            name="data"
            type="file"
            onChange={(e) => {
              if (!e.target.files) return;
              console.log("File selected", e.target.files[0]);
              setFile(e.target.files[0])
            }
          }/>
        </form>

        <div style={{ padding:'1em' }}>
          <Button color="primary" variant="bordered" onPress={(e: PressEvent) => {handleOnSubmit(e, file, numSensitivity, catSensitivity, setProcessedData)}}>
            Upload
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
